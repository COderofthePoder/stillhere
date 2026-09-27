/**
 * Single place where anything is written to the user's device. Nothing here
 * ever leaves the browser.
 */
const PREFIX = "stillhere:";

export const STORAGE_KEYS = {
  safetyPlan: `${PREFIX}safety-plan`,
  chat: `${PREFIX}chat`,
  chatOptIn: `${PREFIX}chat-opt-in`,
} as const;

export function readLocal<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeLocal(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be unavailable (private mode) – the app keeps working */
  }
}

export function removeLocal(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}
