/**
 * Single source of truth for support contacts in the app. Components must read
 * from here (or from the database table seeded with the same data) instead of
 * hardcoding numbers or links.
 */
export type SupportCategory = "emergency" | "crisis_line" | "youth" | "regional" | "other";

export type SupportResource = {
  id: string;
  name: string;
  category: SupportCategory;
  phone: string | null;
  url: string | null;
  sms: string | null;
  chatUrl: string | null;
  description: string;
  canton: string | null;
  ageMin: number | null;
  ageMax: number | null;
  available247: boolean;
  language: string;
};

export const SUPPORT_RESOURCES: SupportResource[] = [
  {
    id: "144",
    name: "Sanitätsnotruf",
    category: "emergency",
    phone: "144",
    url: null,
    sms: null,
    chatUrl: null,
    description: "Bei unmittelbarer Gefahr oder wenn du dir bereits etwas angetan hast.",
    canton: null,
    ageMin: null,
    ageMax: null,
    available247: true,
    language: "de",
  },
  {
    id: "143",
    name: "Die Dargebotene Hand",
    category: "crisis_line",
    phone: "143",
    url: "https://www.143.ch",
    sms: null,
    chatUrl: "https://www.143.ch",
    description: "Anonyme Unterstützung rund um die Uhr. Telefon und Chat.",
    canton: null,
    ageMin: null,
    ageMax: null,
    available247: true,
    language: "de",
  },
  {
    id: "147",
    name: "147 – Pro Juventute",
    category: "youth",
    phone: "147",
    url: "https://www.147.ch",
    sms: "147",
    chatUrl: "https://www.147.ch",
    description: "Für Kinder und Jugendliche bis 25. Anonym, kostenlos, jederzeit.",
    canton: null,
    ageMin: 0,
    ageMax: 25,
    available247: true,
    language: "de",
  },
  {
    id: "145",
    name: "Tox Info Suisse",
    category: "emergency",
    phone: "145",
    url: "https://www.toxinfo.ch",
    sms: null,
    chatUrl: null,
    description: "Bei Vergiftung, Überdosis oder Einnahme von Medikamenten, Alkohol oder Drogen. Rund um die Uhr.",
    canton: null,
    ageMin: null,
    ageMax: null,
    available247: true,
    language: "de",
  },
  {
    id: "117",
    name: "Polizei",
    category: "emergency",
    phone: "117",
    url: null,
    sms: null,
    chatUrl: null,
    description: "Wenn du oder jemand anderes durch eine andere Person bedroht wird.",
    canton: null,
    ageMin: null,
    ageMax: null,
    available247: true,
    language: "de",
  },
];

export function resourceById(id: string): SupportResource | undefined {
  return SUPPORT_RESOURCES.find((resource) => resource.id === id);
}

export const EMERGENCY = resourceById("144")!;
export const CRISIS_LINE = resourceById("143")!;
export const YOUTH_LINE = resourceById("147")!;
export const TOX_INFO = resourceById("145")!;
export const POLICE = resourceById("117")!;

export function smsHref(number: string): string {
  return `sms:${number.replace(/\s+/g, "")}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
