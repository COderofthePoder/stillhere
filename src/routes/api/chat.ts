import { createFileRoute } from "@tanstack/react-router";
import { streamText, type ModelMessage } from "ai";

import { atLeast, type SafetyLevel, type SafetySignals } from "@/lib/safety/levels";

type IncomingMessage = { role: "user" | "assistant"; content: string };

function suggestedActionsFor(level: SafetyLevel, s: SafetySignals): string[] {
  const line = s.young ? ["call_147", "sms_147", "call_143"] : ["call_143", "chat_143"];
  if (level === "IMMEDIATE") return ["call_144", ...(s.ingestion ? ["call_145"] : []), ...line, "stay_in_chat"];
  if (level === "HIGH") return [...(s.hasTherapist ? ["own_plan"] : []), ...line, "trusted_person", "safety_plan"];
  if (level === "ELEVATED") return ["safety_plan"];
  return [];
}

/**
 * Conversational endpoint: { messages, sessionId, locale } in, a streamed
 * assistant reply out. The internal safety level and suggested actions travel
 * in response headers so the UI can react before the text finishes.
 * No conversation content is stored server-side.
 */
export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: unknown; locale?: unknown; preferences?: unknown };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const incoming = Array.isArray(body.messages) ? body.messages : [];
        const messages: IncomingMessage[] = incoming
          .filter(
            (entry): entry is IncomingMessage =>
              !!entry &&
              typeof entry === "object" &&
              (entry as IncomingMessage).role !== undefined &&
              typeof (entry as IncomingMessage).content === "string",
          )
          .map<IncomingMessage>((entry) => ({
            role: entry.role === "assistant" ? "assistant" : "user",
            content: entry.content.slice(0, 4000),
          }))
          .slice(-24);

        const latest = [...messages].reverse().find((message) => message.role === "user");
        if (!latest) {
          return Response.json({ error: "messages must contain a user message" }, { status: 400 });
        }

        const { analyzeSafety } = await import("@/lib/safety/analyze.server");
        const { createGateway, CHAT_MODEL, responsesProviderOptions } = await import(
          "@/lib/ai/gateway.server"
        );
        const { SYSTEM_PROMPT, safetyDirective } = await import("@/lib/ai/prompts");
        const { getLovableAiGatewayRunId } = await import("@/lib/ai/run-id");

        const assessment = await analyzeSafety(
          latest.content,
          messages.slice(0, -1).map((message) => `${message.role}: ${message.content}`),
        );
        const prefs = (body.preferences ?? {}) as { noNumbers?: unknown };
        if (prefs.noNumbers === true) assessment.signals.declinesNumbers = true;
        const uiLocale = ["de", "fr", "it", "en"].includes(body.locale as string)
          ? (body.locale as "de" | "fr" | "it" | "en")
          : null;
        const replyLanguage = assessment.language ?? uiLocale;

        try {
          const { provider } = createGateway(getLovableAiGatewayRunId(request));
          const modelMessages: ModelMessage[] = messages.map((message) => ({
            role: message.role,
            content: message.content,
          }));

          const result = streamText({
            model: provider.responses(CHAT_MODEL),
            instructions: `${SYSTEM_PROMPT}\n\n${safetyDirective(assessment.level, assessment.signals, replyLanguage)}`,
            messages: modelMessages,
            abortSignal: request.signal,
            providerOptions: responsesProviderOptions,
          });

          const response = result.toTextStreamResponse();
          const headers = new Headers(response.headers);
          headers.set("Cache-Control", "no-store");
          headers.set("X-Safety-Level", assessment.level);
          headers.set("X-Suggested-Actions", suggestedActionsFor(assessment.level, assessment.signals).join(","));
          if (assessment.language) headers.set("X-Reply-Language", assessment.language);
          headers.set("X-Declines-Numbers", assessment.signals.declinesNumbers ? "1" : "0");
          const flag = (value: boolean) => (value ? "1" : "0");
          headers.set("X-Formal", flag(assessment.signals.formal));
          headers.set("X-Young", flag(assessment.signals.young));
          headers.set("X-Ingestion", flag(assessment.signals.ingestion));
          headers.set("X-Deescalated", flag(assessment.signals.deescalated));
          headers.set("X-Has-Plan", flag(assessment.signals.hasTherapist));
          headers.set(
            "Access-Control-Expose-Headers",
            "X-Safety-Level, X-Suggested-Actions, X-Reply-Language, X-Declines-Numbers, X-Formal, X-Young, X-Ingestion, X-Deescalated, X-Has-Plan",
          );
          return new Response(response.body, { status: response.status, headers });
        } catch (error) {
          console.error("chat generation failed", error);
          // Even when the model is unavailable the safety signal must reach the UI.
          return Response.json(
            {
              error: "generation_failed",
              safetyState: assessment.level,
              urgent: atLeast(assessment.level, "HIGH"),
            },
            { status: 502, headers: { "X-Safety-Level": assessment.level } },
          );
        }
      },
    },
  },
});
