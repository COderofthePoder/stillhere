import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import { PageIntro, SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/action-button";
import { SUPPORT_RESOURCES } from "@/config/support-resources";
import { useCopy } from "@/i18n";
import {
  clearPlan,
  EMPTY_PLAN,
  loadPlan,
  newId,
  savePlan,
  type PlanPerson,
  type SafetyPlan,
} from "@/lib/safety-plan";

export const Route = createFileRoute("/safety-plan")({
  head: () => ({
    meta: [
      { title: "Safety Plan – StillHere" },
      {
        name: "description",
        content:
          "Halte fest, was dir in schwierigen Momenten hilft: Warnzeichen, beruhigende Dinge, Menschen und Nummern. Nur auf deinem Gerät gespeichert.",
      },
      { property: "og:title", content: "Safety Plan – StillHere" },
      {
        property: "og:description",
        content: "Dein persönlicher Plan für schwierige Momente – bleibt auf deinem Gerät.",
      },
      { name: "twitter:title", content: "Safety Plan – StillHere" },
      { name: "twitter:description", content: "Dein persönlicher Plan für schwierige Momente." },
    ],
  }),
  component: SafetyPlanPage,
});

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="card-surface p-6">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      {hint ? <p className="mt-2 text-base text-muted-foreground">{hint}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function TagList({
  values,
  examples,
  addLabel,
  removeLabel,
  onChange,
}: {
  values: string[];
  examples?: readonly string[];
  addLabel: string;
  removeLabel: string;
  onChange: (values: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || values.includes(trimmed)) return;
    onChange([...values, trimmed]);
  };

  return (
    <div>
      {values.length > 0 ? (
        <ul className="mb-4 flex flex-wrap gap-2">
          {values.map((value) => (
            <li key={value}>
              <button
                type="button"
                onClick={() => onChange(values.filter((entry) => entry !== value))}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-soft px-4 text-base text-primary"
                aria-label={`${value} – ${removeLabel}`}
              >
                {value}
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add(draft);
              setDraft("");
            }
          }}
          className="min-h-12 flex-1 rounded-lg border border-input bg-background px-4 text-base"
          aria-label={addLabel}
        />
        <Button
          variant="secondary"
          onClick={() => {
            add(draft);
            setDraft("");
          }}
        >
          {addLabel}
        </Button>
      </div>

      {examples && examples.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {examples
            .filter((example) => !values.includes(example))
            .map((example) => (
              <li key={example}>
                <button
                  type="button"
                  onClick={() => add(example)}
                  className="min-h-11 rounded-lg border border-border px-4 text-base text-muted-foreground hover:bg-muted"
                >
                  + {example}
                </button>
              </li>
            ))}
        </ul>
      ) : null}
    </div>
  );
}

function PeopleList({
  people,
  labels,
  addLabel,
  onChange,
}: {
  people: PlanPerson[];
  labels: { name: string; relation: string; phone: string; remove: string };
  addLabel: string;
  onChange: (people: PlanPerson[]) => void;
}) {
  const update = (id: string, patch: Partial<PlanPerson>) =>
    onChange(people.map((person) => (person.id === id ? { ...person, ...patch } : person)));

  return (
    <div className="space-y-4">
      {people.map((person) => (
        <div key={person.id} className="grid gap-3 rounded-lg border border-border p-4 sm:grid-cols-3">
          <label className="text-sm text-muted-foreground">
            {labels.name}
            <input
              value={person.name}
              onChange={(event) => update(person.id, { name: event.target.value })}
              className="mt-1 min-h-12 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground"
            />
          </label>
          <label className="text-sm text-muted-foreground">
            {labels.relation}
            <input
              value={person.relation}
              onChange={(event) => update(person.id, { relation: event.target.value })}
              className="mt-1 min-h-12 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground"
            />
          </label>
          <label className="text-sm text-muted-foreground">
            {labels.phone}
            <input
              value={person.phone}
              inputMode="tel"
              onChange={(event) => update(person.id, { phone: event.target.value })}
              className="mt-1 min-h-12 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground"
            />
          </label>
          <div className="sm:col-span-3 sm:text-right">
            <button
              type="button"
              onClick={() => onChange(people.filter((entry) => entry.id !== person.id))}
              className="min-h-11 rounded-md px-2 text-base text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {labels.remove}
            </button>
          </div>
        </div>
      ))}
      <Button
        variant="secondary"
        onClick={() => onChange([...people, { id: newId(), name: "", relation: "", phone: "" }])}
      >
        {addLabel}
      </Button>
    </div>
  );
}

function SafetyPlanPage() {
  const copy = useCopy();
  const sections = copy.safetyPlan.sections;
  const [plan, setPlan] = useState<SafetyPlan>(EMPTY_PLAN);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadPlan();
    if (stored) {
      setPlan(stored);
      setSaved(true);
    }
    setHydrated(true);
  }, []);

  const patch = (next: Partial<SafetyPlan>) => {
    setPlan((current) => ({ ...current, ...next }));
    setSaved(false);
  };

  const labels = {
    name: copy.safetyPlan.name,
    relation: copy.safetyPlan.relation,
    phone: copy.safetyPlan.phone,
    remove: copy.safetyPlan.remove,
  };

  const textarea =
    "w-full rounded-lg border border-input bg-background p-4 text-base leading-relaxed text-foreground";

  return (
    <SiteLayout>
      <PageIntro title={copy.safetyPlan.title} text={copy.safetyPlan.intro} />
      <p className="mt-4 text-sm text-muted-foreground">{copy.safetyPlan.savedNote}</p>

      <div className="mt-8 space-y-5">
        <Section title={sections.warningSigns.title} hint={sections.warningSigns.hint}>
          <TagList
            values={plan.warningSigns}
            examples={sections.warningSigns.examples}
            addLabel={copy.safetyPlan.addTag}
            removeLabel={copy.safetyPlan.remove}
            onChange={(warningSigns) => patch({ warningSigns })}
          />
        </Section>

        <Section title={sections.soothing.title} hint={sections.soothing.hint}>
          <TagList
            values={plan.soothing}
            examples={sections.soothing.examples}
            addLabel={copy.safetyPlan.addTag}
            removeLabel={copy.safetyPlan.remove}
            onChange={(soothing) => patch({ soothing })}
          />
        </Section>

        <Section title={sections.people.title} hint={sections.people.hint}>
          <PeopleList
            people={plan.people}
            labels={labels}
            addLabel={copy.safetyPlan.addPerson}
            onChange={(people) => patch({ people })}
          />
        </Section>

        <Section title={sections.professional.title} hint={sections.professional.hint}>
          <ul className="mb-5 space-y-2">
            {SUPPORT_RESOURCES.map((resource) => (
              <li key={resource.id} className="flex items-baseline gap-3 text-base">
                <span className="w-12 shrink-0 font-semibold text-foreground">{resource.phone}</span>
                <span className="text-muted-foreground">{resource.name}</span>
              </li>
            ))}
          </ul>
          <PeopleList
            people={plan.professional}
            labels={labels}
            addLabel={copy.safetyPlan.addContact}
            onChange={(professional) => patch({ professional })}
          />
        </Section>

        <Section title={sections.safePlaces.title} hint={sections.safePlaces.hint}>
          <textarea
            value={plan.safePlaces}
            onChange={(event) => patch({ safePlaces: event.target.value })}
            rows={3}
            className={textarea}
          />
        </Section>

        <Section title={sections.environment.title} hint={sections.environment.hint}>
          <textarea
            value={plan.environment}
            onChange={(event) => patch({ environment: event.target.value })}
            rows={3}
            className={textarea}
          />
          <label className="mt-4 block text-base text-muted-foreground">
            {sections.environment.handoverLabel}
            <input
              value={plan.handover}
              onChange={(event) => patch({ handover: event.target.value })}
              className="mt-2 min-h-12 w-full rounded-lg border border-input bg-background px-4 text-base text-foreground"
            />
          </label>
        </Section>

        <Section title={sections.reason.title} hint={sections.reason.hint}>
          <textarea
            value={plan.reason}
            onChange={(event) => patch({ reason: event.target.value })}
            rows={3}
            className={textarea}
          />
        </Section>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button
          onClick={() => {
            setPlan(savePlan(plan));
            setSaved(true);
          }}
          disabled={!hydrated}
        >
          {copy.safetyPlan.saveCta}
        </Button>
        <Button variant="secondary" onClick={() => window.print()}>
          {copy.safetyPlan.printCta}
        </Button>
        {saved ? <span className="text-base text-muted-foreground">{copy.safetyPlan.saved}</span> : null}
        <button
          type="button"
          onClick={() => {
            clearPlan();
            setPlan(EMPTY_PLAN);
            setSaved(false);
          }}
          className="ml-auto min-h-11 rounded-md px-2 text-base text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {copy.safetyPlan.clearCta}
        </button>
      </div>
    </SiteLayout>
  );
}
