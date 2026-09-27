import { readLocal, removeLocal, STORAGE_KEYS, writeLocal } from "./local-storage";

export type PlanPerson = { id: string; name: string; relation: string; phone: string };

export type SafetyPlan = {
  warningSigns: string[];
  soothing: string[];
  people: PlanPerson[];
  professional: PlanPerson[];
  safePlaces: string;
  environment: string;
  handover: string;
  reason: string;
  updatedAt: string | null;
};

export const EMPTY_PLAN: SafetyPlan = {
  warningSigns: [],
  soothing: [],
  people: [],
  professional: [],
  safePlaces: "",
  environment: "",
  handover: "",
  reason: "",
  updatedAt: null,
};

export function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function loadPlan(): SafetyPlan | null {
  const stored = readLocal<Partial<SafetyPlan>>(STORAGE_KEYS.safetyPlan);
  if (!stored) return null;
  return { ...EMPTY_PLAN, ...stored };
}

export function savePlan(plan: SafetyPlan): SafetyPlan {
  const next = { ...plan, updatedAt: new Date().toISOString() };
  writeLocal(STORAGE_KEYS.safetyPlan, next);
  return next;
}

export function clearPlan(): void {
  removeLocal(STORAGE_KEYS.safetyPlan);
}
