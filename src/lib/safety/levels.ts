/**
 * Safety layer types. The level is internal: it steers the UI and the tone of
 * the assistant, and is never labelled to the user.
 *
 * This module is intentionally free of any model logic so the classifier behind
 * `analyzeSafety` can later be replaced by a specialised safety model without
 * touching the UI.
 */
export const SAFETY_LEVELS = ["LOW", "ELEVATED", "HIGH", "IMMEDIATE"] as const;

export type SafetyLevel = (typeof SAFETY_LEVELS)[number];

export type SafetyAssessment = {
  level: SafetyLevel;
  confidence: number;
  triggers: string[];
};

const LEVEL_RANK: Record<SafetyLevel, number> = {
  LOW: 0,
  ELEVATED: 1,
  HIGH: 2,
  IMMEDIATE: 3,
};

export function isSafetyLevel(value: unknown): value is SafetyLevel {
  return typeof value === "string" && (SAFETY_LEVELS as readonly string[]).includes(value);
}

export function higherLevel(a: SafetyLevel, b: SafetyLevel): SafetyLevel {
  return LEVEL_RANK[a] >= LEVEL_RANK[b] ? a : b;
}

export function atLeast(level: SafetyLevel, minimum: SafetyLevel): boolean {
  return LEVEL_RANK[level] >= LEVEL_RANK[minimum];
}

/**
 * Deterministic fallback used when the classifier call is unavailable, and as a
 * floor that can only raise (never lower) the model's own assessment.
 */
const IMMEDIATE_PATTERNS = [
  "ich habe es getan",
  "ich habe mir etwas angetan",
  "ich habe tabletten genommen",
  "ich blute",
  "jetzt sofort",
  "ich mache es jetzt",
  "ich mach es jetzt",
  "abschiedsbrief",
  "ich stehe hier",
  "es ist zu spät",
];

const HIGH_PATTERNS = [
  "plan",
  "heute nacht",
  "heute abend",
  "morgen ist es vorbei",
  "ich will sterben",
  "ich will nicht mehr leben",
  "mich umbringen",
  "suizid",
  "selbstmord",
  "ich halte es nicht mehr aus",
];

const ELEVATED_PATTERNS = [
  "suizidgedanken",
  "nicht mehr da sein",
  "verschwinden",
  "sinnlos",
  "hoffnungslos",
  "keine kraft",
  "ich kann nicht mehr",
  "alles zu viel",
  "niemand würde mich vermissen",
  "ritzen",
  "selbstverletzung",
];

export function heuristicSafety(text: string): SafetyAssessment {
  const haystack = text.toLowerCase();
  const triggers: string[] = [];
  let level: SafetyLevel = "LOW";

  for (const [patterns, candidate] of [
    [ELEVATED_PATTERNS, "ELEVATED"],
    [HIGH_PATTERNS, "HIGH"],
    [IMMEDIATE_PATTERNS, "IMMEDIATE"],
  ] as const) {
    for (const pattern of patterns) {
      if (haystack.includes(pattern)) {
        triggers.push(pattern);
        level = higherLevel(level, candidate);
      }
    }
  }

  return { level, confidence: triggers.length > 0 ? 0.5 : 0.3, triggers };
}
