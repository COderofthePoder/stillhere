import { Link } from "@tanstack/react-router";

import { CRISIS_LINE, EMERGENCY, TOX_INFO, YOUTH_LINE, smsHref, telHref } from "@/config/support-resources";
import { useCopy } from "@/i18n";
import { buttonClasses } from "@/components/ui/action-button";

/** Calm, persistent support card shown at HIGH. The conversation continues. */
export function HighSupportCard({ onDismiss }: { onDismiss: () => void }) {
  const copy = useCopy();
  return (
    <aside className="fade-in-soft card-surface mx-auto mb-4 w-full max-w-2xl p-5">
      <p className="text-base text-foreground">{copy.chat.highTitle}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href={telHref(CRISIS_LINE.phone!)} className={buttonClasses("primary", "sm")}>
          {copy.crisis.crisisCta}
        </a>
        {CRISIS_LINE.chatUrl ? (
          <a href={CRISIS_LINE.chatUrl} target="_blank" rel="noreferrer" className={buttonClasses("secondary", "sm")}>
            {copy.crisis.crisisChatCta}
          </a>
        ) : null}
        {YOUTH_LINE.sms ? (
          <a href={smsHref(YOUTH_LINE.sms)} className={buttonClasses("secondary", "sm")}>
            {copy.crisis.youthSmsCta}
          </a>
        ) : null}
        <Link to="/safety-plan" className={buttonClasses("secondary", "sm")}>
          {copy.chat.openSafetyPlan}
        </Link>
        <Link to="/help" className={buttonClasses("quiet", "sm")}>
          {copy.chat.contactTrusted}
        </Link>
        <button type="button" onClick={onDismiss} className={buttonClasses("quiet", "sm", "ml-auto")}>
          {copy.common.close}
        </button>
      </div>
    </aside>
  );
}

/** Shown for IMMEDIATE. Never locks the chat; collapses to EmergencyBar. */
export function ImmediateSupportCard({ onStay }: { onStay: () => void }) {
  const copy = useCopy();
  return (
    <aside className="fade-in-soft mx-auto mb-4 w-full max-w-2xl rounded-xl border border-destructive/30 bg-destructive-soft p-6">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{copy.chat.immediateTitle}</h2>
      <p className="mt-3 text-base text-foreground">{copy.chat.immediateText}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={telHref(EMERGENCY.phone!)} className={buttonClasses("urgent", "lg")}>
          {copy.crisis.emergencyCta}
        </a>
        <a href={telHref(TOX_INFO.phone!)} className={buttonClasses("secondary", "lg")}>
          {copy.crisis.toxCta}
        </a>
        <a href={telHref(CRISIS_LINE.phone!)} className={buttonClasses("secondary", "lg")}>
          {copy.crisis.crisisCta}
        </a>
        <a href={telHref(YOUTH_LINE.phone!)} className={buttonClasses("secondary", "lg")}>
          {copy.crisis.youthCta}
        </a>
      </div>
      <button type="button" onClick={onStay} className={buttonClasses("quiet", "sm", "mt-4")}>
        {copy.chat.stayInChat}
      </button>
    </aside>
  );
}

/** Slim, always-visible 144 bar after the IMMEDIATE card was collapsed. */
export function EmergencyBar() {
  const copy = useCopy();
  return (
    <div className="mx-auto mb-3 flex w-full max-w-2xl flex-wrap items-center gap-3 rounded-lg border border-destructive/30 bg-destructive-soft px-4 py-2">
      <span className="text-sm text-foreground">{copy.chat.emergencyBar}</span>
      <a href={telHref(EMERGENCY.phone!)} className={buttonClasses("urgent", "sm")}>
        {copy.crisis.emergencyCta}
      </a>
      <a href={telHref(TOX_INFO.phone!)} className={buttonClasses("quiet", "sm")}>
        {copy.crisis.toxCta}
      </a>
    </div>
  );
}

/** Quiet, optional invitation at ELEVATED. */
export function SafetyPlanNudge() {
  const copy = useCopy();
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link to="/safety-plan" className={buttonClasses("secondary", "sm")}>
        {copy.chat.openSafetyPlan}
      </Link>
    </div>
  );
}
