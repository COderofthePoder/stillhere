import { createFileRoute } from "@tanstack/react-router";

import { PageIntro, SiteLayout } from "@/components/SiteLayout";
import { useCopy } from "@/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Deine Privatsphäre – StillHere" },
      {
        name: "description",
        content:
          "Kein Account, kein Tracking, keine dauerhafte Speicherung von Gesprächen. So geht StillHere mit deinen Daten um.",
      },
      { property: "og:title", content: "Deine Privatsphäre – StillHere" },
      {
        property: "og:description",
        content: "Kein Account, kein Tracking, keine dauerhafte Speicherung von Gesprächen.",
      },
      { name: "twitter:title", content: "Deine Privatsphäre – StillHere" },
      { name: "twitter:description", content: "Wie StillHere mit deinen Daten umgeht." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const copy = useCopy();
  return (
    <SiteLayout>
      <PageIntro title={copy.privacy.title} />
      <div className="mt-10 space-y-6">
        {copy.privacy.sections.map((section) => (
          <section key={section.title} className="card-surface p-6">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">{section.title}</h2>
            <p className="mt-3 text-base text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>
    </SiteLayout>
  );
}
