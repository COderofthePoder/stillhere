import { generateText } from "ai";

import { createGateway, CHAT_MODEL } from "../ai/gateway.server";
import { SAFETY_CLASSIFIER_PROMPT } from "../ai/prompts";
import { heuristicSafety, higherLevel, isSafetyLevel, type SafetyAssessment } from "./levels";

/**
 * The safety layer. Deliberately separate from the conversational model so it
 * can be swapped for a specialised safety classifier without touching the UI:
 * keep this signature and return shape.
 */
export async function analyzeSafety(
  latestMessage: string,
  recentContext: string[] = [],
): Promise<SafetyAssessment> {
  const floor = heuristicSafety([...recentContext.slice(-4), latestMessage].join("\n"));

  try {
    const { provider } = createGateway();
    const context = recentContext.slice(-6).join("\n");
    const { text } = await generateText({
      model: provider.responses(CHAT_MODEL),
      providerOptions: {
        openai: { store: false, forceReasoning: true, reasoningEffort: "low" },
      },
      messages: [
        { role: "system", content: SAFETY_CLASSIFIER_PROMPT },
        {
          role: "user",
          content: `Kontext:\n${context || "(kein Kontext)"}\n\nLetzte Nachricht:\n${latestMessage}`,
        },
      ],
    });

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return floor;
    const parsed = JSON.parse(match[0]) as {
      level?: unknown;
      confidence?: unknown;
      triggers?: unknown;
    };
    if (!isSafetyLevel(parsed.level)) return floor;

    const triggers = Array.isArray(parsed.triggers)
      ? parsed.triggers.filter((entry): entry is string => typeof entry === "string").slice(0, 6)
      : [];

    return {
      // The deterministic heuristic can only raise the level, never lower it.
      level: higherLevel(parsed.level, floor.level),
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.6,
      triggers: [...new Set([...triggers, ...floor.triggers])],
    };
  } catch (error) {
    console.error("safety classifier unavailable, using heuristic floor", error);
    return floor;
  }
}
