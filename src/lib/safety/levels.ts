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

/** Structured signals (C-SSRS-inspired) shared by the reply and the UI. */
export type SafetySignals = {
  intent: boolean;
  plan: boolean;
  timeframe: boolean;
  means: boolean;
  lossToSuicide: boolean;
  chronic: boolean;
  hasTherapist: boolean;
  declinesNumbers: boolean;
  ambivalence: boolean;
  formal: boolean;
  /** Likely 25 or younger (school, parents, stated age): 147 fits. */
  young: boolean;
  /** Method involves pills, substances or poison: 145 is relevant. */
  ingestion: boolean;
  /** The person is about to leave the chat. */
  leaving: boolean;
  /** The latest message says the acute danger has eased. */
  deescalated: boolean;
};

export const NO_SIGNALS: SafetySignals = {
  intent: false,
  plan: false,
  timeframe: false,
  means: false,
  lossToSuicide: false,
  chronic: false,
  hasTherapist: false,
  declinesNumbers: false,
  ambivalence: false,
  formal: false,
  young: false,
  ingestion: false,
  leaving: false,
  deescalated: false,
};

export type ReplyLanguage = "de" | "fr" | "it" | "en";

export type SafetyAssessment = {
  level: SafetyLevel;
  confidence: number;
  triggers: string[];
  signals: SafetySignals;
  language: ReplyLanguage | null;
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

export function mergeSignals(a: SafetySignals, b: SafetySignals): SafetySignals {
  const out = { ...a };
  for (const key of Object.keys(out) as (keyof SafetySignals)[]) out[key] = a[key] || b[key];
  return out;
}

/**
 * Level rules derived from the signals. Intent with a plan and a time or means
 * is the highest C-SSRS tier and always IMMEDIATE. A loss to suicide keeps the
 * level at least ELEVATED, so a quick "I'm safe" does not lower it.
 */
export function levelFromSignals(signals: SafetySignals): SafetyLevel {
  if (signals.intent && (signals.plan || signals.means) && (signals.timeframe || signals.means)) return "IMMEDIATE";
  if (signals.intent || signals.plan) return "HIGH";
  if (signals.lossToSuicide || signals.chronic) return "ELEVATED";
  return "LOW";
}

const IMMEDIATE_PATTERNS = [
  // de
  "ich habe es getan",
  "ich habe mir etwas angetan",
  "ich habe tabletten genommen",
  "ich blute",
  "ich mache es jetzt",
  "ich mach es jetzt",
  "abschiedsbrief",
  "es ist zu spät",
  // en
  "i took pills",
  "i've taken pills",
  "i took an overdose",
  "i'm bleeding",
  "i am bleeding",
  "i'm doing it now",
  "goodbye letter",
  "suicide note",
  // fr
  "j'ai pris des médicaments",
  "j'ai pris des cachets",
  "je saigne",
  "je le fais maintenant",
  "lettre d'adieu",
  // it
  "ho preso delle pastiglie",
  "ho preso le pastiglie",
  "sto sanguinando",
  "lo faccio adesso",
  "lettera d'addio",
];

const HIGH_PATTERNS = [
  "einen plan",
  "ich will sterben",
  "ich will nicht mehr leben",
  "mich umbringen",
  "ich halte es nicht mehr aus",
  "i want to die",
  "kill myself",
  "end my life",
  "i have a plan",
  "je veux mourir",
  "me suicider",
  "me tuer",
  "en finir",
  "voglio morire",
  "uccidermi",
  "suicidarmi",
  "farla finita",
];

const ELEVATED_PATTERNS = [
  "suizid",
  "selbstmord",
  "suicide",
  "suicidio",
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
  "hopeless",
  "disappear",
  "can't go on",
  "no one would miss me",
  "self-harm",
  "cutting myself",
  "désespéré",
  "disparaître",
  "je n'en peux plus",
  "me scarifier",
  "senza speranza",
  "sparire",
  "non ce la faccio più",
  "farmi del male",
];

const INTENT = [
  "mich umbringen", "mich töten", "mir das leben nehmen",
  "kill myself", "end my life", "take my life",
  "me suicider", "me tuer", "en finir",
  "uccidermi", "suicidarmi", "togliermi la vita", "farla finita",
];
const NOW = [
  "jetzt", "heute nacht", "heute abend", "heute noch", "in einer stunde",
  "tonight", "right now", "in an hour",
  "ce soir", "cette nuit", "maintenant",
  "stasera", "stanotte", "adesso",
];
const MEANS = [
  "tabletten gesammelt", "tabletten gespart", "tabletten zusammen", "strick", "seil", "waffe", "pistole",
  "saved pills", "saved up pills", "stockpiled", "rope", "gun",
  "gardé des médicaments", "des cachets de côté", "corde", "arme",
  "pastiglie da parte", "messo da parte", "corda", "pistola",
];
const LOSS = [
  "bruder hat sich", "schwester hat sich", "vater hat sich", "mutter hat sich", "freund hat sich", "freundin hat sich",
  "das leben genommen hat", "durch suizid verloren", "jahrestag",
  "killed himself", "killed herself", "took his own life", "took her own life", "died by suicide", "lost to suicide", "anniversary",
  "s'est suicidé", "s'est suicidée", "anniversaire de sa mort",
  "si è suicidato", "si è suicidata", "si è tolto la vita", "si è tolta la vita", "anniversario",
];
const DECLINES_NUMBERS = [
  "keine nummern", "keine telefonnummern", "no numbers", "no hotlines", "don't give me numbers",
  "pas de numéros", "niente numeri", "nessun numero",
];

const YOUNG = [
  "schule", "lehrer", "lehrerin", "meine eltern", "mama", "papa", "klasse", "gymi", "lehrstelle", "stifti", "sek ",
  "school", "my parents", "my mom", "my dad", "teacher", "classmates",
  "école", "collège", "mes parents", "prof ",
  "scuola", "i miei genitori", "prof ",
];
const INGESTION = [
  "tablette", "pillen", "medikament", "überdosis", "gift", "schlafmittel", "substanz",
  "pill", "overdose", "poison", "medication",
  "médicament", "cachet", "surdose", "poison",
  "pastiglie", "farmaci", "overdose", "veleno",
];
const LEAVING = [
  "ich geh off", "geh off", "bin off", "muss los", "muss gehen", "tschüss", "bye", "gute nacht", "ciao",
  "gotta go", "i'm off", "have to go", "je dois y aller", "je m'en vais", "devo andare", "vado via",
];
const DEESCALATED = [
  "blutet kaum", "blutet nicht mehr", "aufgehört zu bluten", "sanität ist da", "krankenwagen ist da", "ambulanz ist da",
  "bin im spital", "bin auf dem notfall", "weggelegt", "weggeworfen", "weggegeben", "abgegeben", "ist jetzt bei mir",
  "barely bleeding", "stopped bleeding", "ambulance is here", "threw them away", "gave them away", "is with me now",
  "ne saigne plus", "saigne à peine", "l'ambulance est là", "je les ai jetés",
  "non sanguina più", "sanguina appena", "l'ambulanza è qui", "le ho buttate",
];

/** "Sie" only for a clear direct address; lower-case "sie" usually means other people. */
export function detectFormal(text: string): boolean {
  if (/\b(du|dir|dich|dein|deine)\b/i.test(text)) return false;
  return (
    /\b(Ihnen|Ihre|Ihr|Ihrer|Ihren)\b/.test(text) ||
    /\b(Können|Könnten|Würden|Sind|Haben|Dürfen|Kann ich|Darf ich|danke|Danke) Sie\b/.test(text) ||
    /\b(vous|votre|vos)\b/i.test(text) ||
    /\b(Lei|Le posso|La ringrazio)\b/.test(text)
  );
}

function hits(haystack: string, list: string[]): string[] {
  return list.filter((word) => haystack.includes(word));
}

/**
 * Deterministic fallback used when the classifier call is unavailable, and as a
 * floor that can only raise (never lower) the model's own assessment.
 */
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

  const intent = hits(haystack, INTENT).length > 0;
  const signals: SafetySignals = {
    ...NO_SIGNALS,
    intent,
    timeframe: intent && hits(haystack, NOW).length > 0,
    means: hits(haystack, MEANS).length > 0,
    lossToSuicide: hits(haystack, LOSS).length > 0,
    declinesNumbers: hits(haystack, DECLINES_NUMBERS).length > 0,
    formal: detectFormal(text),
    young: hits(haystack, YOUNG).length > 0 || /\b(ich bin|i'?m|j'ai|ho) (1[0-9]|2[0-5])\b/.test(haystack),
    ingestion: hits(haystack, INGESTION).length > 0,
    leaving: hits(haystack, LEAVING).length > 0,
    deescalated: hits(haystack, DEESCALATED).length > 0,
  };
  // Stated intent with a "now" timeframe, or saved means with a timeframe, is immediate.
  if (intent && signals.timeframe) {
    level = higherLevel(level, "IMMEDIATE");
    triggers.push("intent+timeframe");
  }
  if (signals.means && hits(haystack, NOW).length > 0) {
    level = higherLevel(level, "IMMEDIATE");
    triggers.push("means+timeframe");
  }
  if (signals.lossToSuicide) {
    level = higherLevel(level, "ELEVATED");
    triggers.push("loss-to-suicide");
  }

  return { level, confidence: triggers.length > 0 ? 0.5 : 0.3, triggers, signals, language: null };
}
