import { CRISIS_LINE, EMERGENCY, YOUTH_LINE, type SupportResource } from "@/config/support-resources";
import { useCopy } from "@/i18n";
import { cn } from "@/lib/utils";

import { PhoneLink } from "./ui/action-button";

type Option = { resource: SupportResource; title: string; cta: string; urgent: boolean };

/**
 * Reusable Swiss crisis contact block. Numbers and links come from the shared
 * configuration, never from this component.
 */
export function CrisisSupport({
  include = ["144", "143", "147"],
  compact = false,
  className,
}: {
  include?: string[];
  compact?: boolean;
  className?: string;
}) {
  const copy = useCopy();

  const options: Option[] = [
    { resource: EMERGENCY, title: copy.crisis.emergencyTitle, cta: copy.crisis.emergencyCta, urgent: true },
    { resource: CRISIS_LINE, title: copy.crisis.crisisTitle, cta: copy.crisis.crisisCta, urgent: false },
    { resource: YOUTH_LINE, title: copy.crisis.youthTitle, cta: copy.crisis.youthCta, urgent: false },
  ].filter((option) => include.includes(option.resource.id));

  return (
    <ul className={cn("grid gap-4", compact ? "sm:grid-cols-3" : "", className)}>
      {options.map(({ resource, title, cta, urgent }) => (
        <li key={resource.id} className="card-surface flex flex-col gap-4 p-6">
          <div>
            <p className="text-base text-muted-foreground">{title}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{resource.phone}</p>
            {!compact && (copy.resources[resource.id] ?? resource.description) ? (
              <p className="mt-3 text-base text-muted-foreground">{copy.resources[resource.id] ?? resource.description}</p>
            ) : null}
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-3">
            <PhoneLink phone={resource.phone!} variant={urgent ? "urgent" : "primary"}>
              {cta}
            </PhoneLink>
            {resource.url ? (
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-md text-base text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                {resource.url.replace("https://", "")}
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
