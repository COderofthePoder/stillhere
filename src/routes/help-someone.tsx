import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CrisisSupport } from "@/components/CrisisSupport";
import { PageIntro, SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/action-button";
import { useCopy } from "@/i18n";

type Answer = "yes" | "maybe" | "no";

export const Route = createFileRoute("/help-someone")({
  head: () => ({
    meta: [
      { title: "Du machst dir Sorgen um jemanden? – StillHere" },
      {
        name: "description",
        content:
          "Wie du eine Person ansprichst, die Suizidgedanken geäussert hat: direkt fragen, zuhören, dableiben und Hilfe holen.",
      },
      { property: "og:title", content: "Du machst dir Sorgen um jemanden?" },
      { property: "og:description", content: "Konkrete Schritte und Sätze, die helfen können." },
      { name: "twitter:title", content: "Du machst dir Sorgen um jemanden?" },
      { name: "twitter:description", content: "Konkrete Schritte, wenn du dir Sorgen machst." },
    ],
  }),
  component: HelpSomeone,
});

function HelpSomeone() {
  const copy = useCopy();
  const [answer, setAnswer] = useState<Answer | null>(null);
  const branch = answer ? copy.helpSomeone.branches[answer] : null;

  return (
    <SiteLayout>
      <PageIntro title={copy.helpSomeone.title} text={copy.helpSomeone.intro} />

      <section className="card-surface mt-10 p-6">
        <h2 className="text-lg font-medium text-foreground">{copy.helpSomeone.question}</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {(["yes", "maybe", "no"] as Answer[]).map((option) => (
            <Button
              key={option}
              variant={answer === option ? "primary" : "secondary"}
              onClick={() => setAnswer(option)}
              aria-pressed={answer === option}
            >
              {copy.helpSomeone.answers[option]}
            </Button>
          ))}
        </div>

        {branch ? (
          <div className="fade-in-soft mt-7 border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground">{branch.title}</h3>
            <ol className="mt-4 space-y-3">
              {branch.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-base text-muted-foreground">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-medium text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setAnswer(null)}
              className="mt-5 rounded-md text-base text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {copy.helpSomeone.restart}
            </button>
          </div>
        ) : null}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {copy.helpSomeone.phrasesTitle}
        </h2>
        <ul className="mt-4 space-y-3">
          {copy.helpSomeone.phrases.map((phrase) => (
            <li key={phrase} className="rounded-lg border border-border bg-card px-5 py-4 text-lg text-foreground">
              {phrase}
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-lg border border-destructive/25 bg-destructive-soft p-5 text-base text-foreground">
          {copy.helpSomeone.secrecy}
        </p>
      </section>

      <section className="mt-10">
        <CrisisSupport />
      </section>
    </SiteLayout>
  );
}
