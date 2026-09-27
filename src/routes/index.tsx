import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteLayout } from "@/components/SiteLayout";
import { ButtonLink } from "@/components/ui/action-button";
import { useCopy } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StillHere – anonym schreiben, wenn alles zu viel ist" },
      {
        name: "description",
        content:
          "Anonyme, kostenlose Unterstützung in schwierigen Momenten. Schreib ohne Account, erstelle einen Safety Plan oder finde Schweizer Hilfsangebote.",
      },
      { property: "og:title", content: "StillHere – Du musst gerade nicht alles alleine tragen." },
      {
        property: "og:description",
        content: "Anonym schreiben, Safety Plan erstellen, Schweizer Hilfe finden. Ohne Account.",
      },
      { name: "twitter:title", content: "StillHere" },
      {
        name: "twitter:description",
        content: "Anonyme Unterstützung in schwierigen Momenten – rund um die Uhr, ohne Account.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const copy = useCopy();

  return (
    <SiteLayout wide className="px-5 py-10 sm:py-16">
      <section className="fade-in-soft mx-auto max-w-2xl py-12 text-center sm:py-20">
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          {copy.home.heroTitle}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">{copy.home.heroText}</p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <ButtonLink to="/chat" size="lg" className="w-full sm:w-auto">
            {copy.home.primaryCta}
          </ButtonLink>
          <Link
            to="/help"
            className="rounded-md px-3 py-2 text-base text-destructive underline underline-offset-4 hover:opacity-80"
          >
            {copy.home.secondaryCta}
          </Link>
        </div>
        <p className="mx-auto mt-14 max-w-md text-sm text-muted-foreground">{copy.home.disclaimer}</p>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-3">
        {copy.home.cards.map((card) => (
          <article key={card.title} className="card-surface flex flex-col gap-4 p-7">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">{card.title}</h2>
            <p className="text-base text-muted-foreground">{card.text}</p>
            <ButtonLink to={card.to} variant="secondary" size="sm" className="mt-auto self-start">
              {card.cta}
            </ButtonLink>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
