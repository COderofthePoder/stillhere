import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { useCopy } from "@/i18n";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { ButtonLink } from "./ui/action-button";

const NAV_LINK = "rounded-md px-2 py-2 text-base text-muted-foreground transition-colors hover:text-foreground";
const NAV_LINK_ACTIVE = "text-foreground";

export function SiteHeader() {
  const copy = useCopy();
  return (
    <header className="border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-6 px-5 py-4">
        <Link to="/" className="rounded-md text-lg font-semibold tracking-tight text-foreground">
          {copy.meta.name}
        </Link>
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 md:flex">
          <Link to="/chat" className={NAV_LINK} activeProps={{ className: cn(NAV_LINK, NAV_LINK_ACTIVE) }}>
            {copy.nav.chat}
          </Link>
          <Link
            to="/safety-plan"
            className={NAV_LINK}
            activeProps={{ className: cn(NAV_LINK, NAV_LINK_ACTIVE) }}
          >
            {copy.nav.safetyPlan}
          </Link>
          <Link
            to="/help-someone"
            className={NAV_LINK}
            activeProps={{ className: cn(NAV_LINK, NAV_LINK_ACTIVE) }}
          >
            {copy.nav.helpSomeone}
          </Link>
          <Link to="/help" className={NAV_LINK} activeProps={{ className: cn(NAV_LINK, NAV_LINK_ACTIVE) }}>
            {copy.nav.help}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <ButtonLink
            to="/help"
            variant="urgentQuiet"
            size="sm"
            className="md:hidden"
            aria-label={copy.nav.help}
          >
            {copy.nav.mobileHelp}
          </ButtonLink>
          <ButtonLink to="/chat" size="sm" className="hidden sm:inline-flex">
            {copy.nav.cta}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

export function MobileTabBar() {
  const copy = useCopy();
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-3 text-sm text-muted-foreground";
  const active = "text-foreground";
  return (
    <nav
      aria-label="Schnellzugriff"
      className="sticky bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex w-full max-w-5xl">
        <Link to="/chat" className={item} activeProps={{ className: cn(item, active) }}>
          {copy.nav.chat}
        </Link>
        <Link to="/safety-plan" className={item} activeProps={{ className: cn(item, active) }}>
          {copy.nav.mobilePlan}
        </Link>
        <Link
          to="/help"
          className={cn(item, "font-medium text-destructive")}
          activeProps={{ className: cn(item, "font-semibold text-destructive") }}
        >
          {copy.nav.mobileHelp}
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  const copy = useCopy();
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-8 text-base text-muted-foreground">
        <Link to="/about" className="rounded-md hover:text-foreground">
          {copy.nav.about}
        </Link>
        <Link to="/privacy" className="rounded-md hover:text-foreground">
          {copy.privacy.title}
        </Link>
        <Link to="/help" className="rounded-md hover:text-foreground">
          {copy.nav.help}
        </Link>
      </div>
    </footer>
  );
}

export function SiteLayout({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className={cn("flex-1 px-5 py-12 sm:py-16", className)}>
        <div className={cn("mx-auto w-full", wide ? "max-w-5xl" : "max-w-2xl")}>{children}</div>
      </main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}

export function PageIntro({ title, text }: { title: string; text?: string }) {
  return (
    <div className="fade-in-soft">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      {text ? <p className="mt-4 text-lg text-muted-foreground">{text}</p> : null}
    </div>
  );
}
