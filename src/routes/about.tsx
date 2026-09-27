import { createFileRoute } from "@tanstack/react-router";

import { PageIntro, SiteLayout } from "@/components/SiteLayout";
import { ButtonLink } from "@/components/ui/action-button";
import { useCopy } from "@/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Über StillHere" },
      {
        name: "description",
        content:
          "StillHere ist ein anonymes, digitales Unterstützungsangebot für schwierige Momente – keine Therapie und kein Notfalldienst.",
      },
      { property: "og:title", content: "Über StillHere" },
      {
        property: "og:description",
        content: "Was StillHere ist, was es nicht ist, und wo die Grenzen liegen.",
      },
      { name: "twitter:title", content: "Über StillHere" },
      { name: "twitter:description", content: "Was StillHere ist – und was es nicht ist." },
    ],
  }),
  component: About,
});

function About() {
  const copy = useCopy();
  return (
    <SiteLayout>
      <PageIntro title={copy.about.title} />
      <div className="mt-8 space-y-5 text-lg text-muted-foreground">
        {copy.about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="card-surface mt-10 p-6 text-base text-muted-foreground">{copy.about.disclaimer}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/chat">{copy.home.primaryCta}</ButtonLink>
        <ButtonLink to="/help" variant="secondary">
          {copy.nav.help}
        </ButtonLink>
      </div>
    </SiteLayout>
  );
}
