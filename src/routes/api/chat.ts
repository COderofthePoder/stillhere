import { createFileRoute } from "@tanstack/react-router";
import { streamText, type ModelMessage } from "ai";

import { atLeast, type SafetyLevel } from "@/lib/safety/levels";

type IncomingMessage = { role: "user" | "assistant"; content: string };

function suggestedActionsFor(level: SafetyLevel): string[] {
  if (level === "IMMEDIATE") return ["call_144", "call_143", "call_147", "stay_in_chat"];
  if (level === "HIGH") return ["call_143", "trusted_person", "safety_plan"];
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
        let body: { messages?: unknown; locale?: unknown };
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

        try {
          const { provider } = createGateway(getLovableAiGatewayRunId(request));
          const modelMessages: ModelMessage[] = [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "system", content: safetyDirective(assessment.level) },
            ...messages.map((message) => ({ role: message.role, content: message.content })),
          ];

          const result = streamText({
            model: provider.responses(CHAT_MODEL),
            messages: modelMessages,
            abortSignal: request.signal,
            providerOptions: responsesProviderOptions,
          });

          const response = result.toTextStreamResponse();
          const headers = new Headers(response.headers);
          headers.set("Cache-Control", "no-store");
          headers.set("X-Safety-Level", assessment.level);
          headers.set("X-Suggested-Actions", suggestedActionsFor(assessment.level).join(","));
          headers.set(
            "Access-Control-Expose-Headers",
            "X-Safety-Level, X-Suggested-Actions",
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
