import { LOCALE_NAMES, LOCALES, isLocale, useCopy, useLocale } from "@/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const copy = useCopy();
  return (
    <select
      aria-label={copy.nav.language}
      value={locale}
      onChange={(event) => {
        if (isLocale(event.target.value)) setLocale(event.target.value);
      }}
      className={cn(
        "min-h-10 rounded-lg border border-input bg-background px-2 text-sm text-foreground",
        className,
      )}
    >
      {LOCALES.map((entry) => (
        <option key={entry} value={entry}>
          {LOCALE_NAMES[entry]}
        </option>
      ))}
    </select>
  );
}
