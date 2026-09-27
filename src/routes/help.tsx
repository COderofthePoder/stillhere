import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { PageIntro, SiteLayout } from "@/components/SiteLayout";
import { PhoneLink } from "@/components/ui/action-button";
import { CANTONS } from "@/config/cantons";
import {
  CRISIS_LINE,
  EMERGENCY,
  POLICE,
  TOX_INFO,
  YOUTH_LINE,
  SUPPORT_RESOURCES,
  smsHref,
} from "@/config/support-resources";
import { buttonClasses } from "@/components/ui/action-button";
import { useCopy } from "@/i18n";
import { listSupportResources } from "@/lib/support.functions";

const resourcesQuery = queryOptions({
  queryKey: ["support-resources"],
  queryFn: () => listSupportResources(),
  staleTime: 1000 * 60 * 30,
});

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Hilfe jetzt – Schweizer Notfallnummern" },
      {
        name: "description",
        content:
          "144 bei medizinischen Notfällen, 143 für ein Gespräch rund um die Uhr, 147 für junge Menschen – und regionale psychiatrische Angebote.",
      },
      { property: "og:title", content: "Hilfe jetzt – StillHere" },
      { property: "og:description", content: "144, 143, 147 und regionale Angebote in der Schweiz." },
      { name: "twitter:title", content: "Hilfe jetzt – StillHere" },
      { name: "twitter:description", content: "Schweizer Hilfsangebote, rund um die Uhr erreichbar." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(resourcesQuery),
  component: HelpNow,
});

function HelpNow() {
  const copy = useCopy();
  const { data } = useSuspenseQuery(resourcesQuery);
  const resources = data.length > 0 ? data : SUPPORT_RESOURCES;
  const [canton, setCanton] = useState("");

  const byId = (id: string) => resources.find((resource) => resource.id === id);
  const emergency = byId("144") ?? EMERGENCY;
  const crisis = byId("143") ?? CRISIS_LINE;
  const youth = byId("147") ?? YOUTH_LINE;
  const tox = byId("145") ?? TOX_INFO;
  const police = byId("117") ?? POLICE;
  const regional = resources.filter((resource) => resource.category === "regional" && resource.canton === canton);

  const options = [
    { title: copy.help.emergency.title, resource: emergency, urgent: true },
    { title: copy.help.talk.title, resource: crisis, urgent: false },
    { title: copy.help.youth.title, resource: youth, urgent: false },
    { title: copy.help.tox.title, resource: tox, urgent: false },
    { title: copy.help.police.title, resource: police, urgent: false },
  ];

  return (
    <SiteLayout>
      <PageIntro title={copy.help.title} text={copy.help.intro} />

      <ul className="mt-10 space-y-4">
        {options.map(({ title, resource, urgent }) => (
          <li key={resource.id} className="card-surface flex flex-wrap items-center gap-4 p-6">
            <div className="min-w-40 flex-1">
              <p className="text-base text-muted-foreground">{title}</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{resource.phone}</p>
              <p className="mt-2 text-base text-muted-foreground">
                {copy.resources[resource.id] ?? resource.description}
              </p>
            </div>
            <PhoneLink
              phone={resource.phone!}
              variant={urgent ? "urgent" : "primary"}
              size="lg"
              className="w-full sm:w-auto"
            >
              {resource.phone} {copy.crisis.call}
            </PhoneLink>
            {resource.chatUrl || resource.sms ? (
              <div className="flex w-full flex-wrap items-center gap-3">
                <span className="text-sm text-muted-foreground">{copy.help.written}</span>
                {resource.sms ? (
                  <a href={smsHref(resource.sms)} className={buttonClasses("secondary", "sm")}>
                    SMS {resource.sms}
                  </a>
                ) : null}
                {resource.chatUrl ? (
                  <a
                    href={resource.chatUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonClasses("secondary", "sm")}
                  >
                    {resource.id === "147" ? copy.crisis.youthChatCta : copy.crisis.crisisChatCta}
                  </a>
                ) : null}
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      <p className="card-surface mt-6 p-6 text-base text-foreground">{copy.help.injury}</p>

      <section className="card-surface mt-6 p-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{copy.help.regional.title}</h2>
        <label htmlFor="canton" className="mt-5 block text-base text-muted-foreground">
          {copy.help.regional.cantonLabel} <span className="text-sm">({copy.common.optional})</span>
        </label>
        <select
          id="canton"
          value={canton}
          onChange={(event) => setCanton(event.target.value)}
          className="mt-2 min-h-12 w-full rounded-lg border border-input bg-background px-4 text-base text-foreground"
        >
          <option value="">{copy.help.regional.cantonPlaceholder}</option>
          {CANTONS.map((entry) => (
            <option key={entry.code} value={entry.code}>
              {entry.name}
            </option>
          ))}
        </select>

        <div className="mt-5 space-y-3">
          {regional.length > 0 ? (
            regional.map((resource) => (
              <div key={resource.id} className="rounded-lg border border-border p-4">
                <p className="font-medium text-foreground">{resource.name}</p>
                <p className="mt-1 text-base text-muted-foreground">{resource.description}</p>
                {resource.phone ? (
                  <PhoneLink phone={resource.phone} variant="primary" size="sm" className="mt-3">
                    {resource.phone} {copy.crisis.call}
                  </PhoneLink>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-base text-muted-foreground">{copy.help.regional.placeholder}</p>
          )}
          <p className="text-sm text-muted-foreground">{copy.help.regional.noLocation}</p>
        </div>
      </section>
    </SiteLayout>
  );
}
