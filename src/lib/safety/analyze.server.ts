import { streamText } from "ai";

import { createGateway, CHAT_MODEL } from "../ai/gateway.server";
import { SAFETY_CLASSIFIER_PROMPT } from "../ai/prompts";
import {
  heuristicSafety,
  higherLevel,
  isSafetyLevel,
  levelFromSignals,
  mergeSignals,
  NO_SIGNALS,
  type ReplyLanguage,
  type SafetyAssessment,
  type SafetySignals,
} from "./levels";

const LANGS: ReplyLanguage[] = ["de", "fr", "it", "en"];

function parseSignals(value: unknown): SafetySignals {
  const out = { ...NO_SIGNALS };
  if (!value || typeof value !== "object") return out;
  for (const key of Object.keys(out) as (keyof SafetySignals)[]) {
    out[key] = (value as Record<string, unknown>)[key] === true;
  }
  return out;
}

/**
 * The safety layer. Deliberately separate from the conversational model so it
 * can be swapped for a specialised safety classifier without touching the UI:
 * keep this signature and return shape.
 */
export async function analyzeSafety(
  latestMessage: string,
  recentContext: string[] = [],
): Promise<SafetyAssessment> {
  const floor = heuristicSafety([...recentContext.slice(-6), latestMessage].join("\n"));
  // Formality should reflect how the person writes now, not the whole thread.
  floor.signals.formal = heuristicSafety(latestMessage).signals.formal;
  floor.level = higherLevel(floor.level, levelFromSignals(floor.signals));

  try {
    const { provider } = createGateway();
    const context = recentContext.slice(-10).join("\n");
    const result = streamText({
      model: provider.responses(CHAT_MODEL),
      providerOptions: {
        openai: { store: false, forceReasoning: true, reasoningEffort: "low" },
      },
      instructions: SAFETY_CLASSIFIER_PROMPT,
      messages: [
        {
          role: "user",
          content: `Kontext:\n${context || "(kein Kontext)"}\n\nLetzte Nachricht:\n${latestMessage}`,
        },
      ],
    });
    const text = await result.text;

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return floor;
    const parsed = JSON.parse(match[0]) as {
      level?: unknown;
      confidence?: unknown;
      triggers?: unknown;
      language?: unknown;
      signals?: unknown;
    };
    if (!isSafetyLevel(parsed.level)) return floor;

    const triggers = Array.isArray(parsed.triggers)
      ? parsed.triggers.filter((entry): entry is string => typeof entry === "string").slice(0, 6)
      : [];
    const modelSignals = parseSignals(parsed.signals);
    const signals = mergeSignals(modelSignals, { ...floor.signals, formal: false });
    signals.formal = modelSignals.formal || floor.signals.formal;

    // The deterministic heuristic and signal rules can only raise the level.
    let level = higherLevel(parsed.level, floor.level);
    level = higherLevel(level, levelFromSignals(signals));

    return {
      level,
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.6,
      triggers: [...new Set([...triggers, ...floor.triggers])],
      signals,
      language: LANGS.includes(parsed.language as ReplyLanguage) ? (parsed.language as ReplyLanguage) : null,
    };
  } catch (error) {
    console.error("safety classifier unavailable, using heuristic floor", error);
    return floor;
  }
}
