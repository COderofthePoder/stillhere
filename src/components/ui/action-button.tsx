import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet" | "urgent" | "urgentQuiet";
type Size = "lg" | "md" | "sm";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-card text-foreground border border-border hover:bg-muted",
  quiet: "text-foreground hover:bg-muted",
  urgent: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  urgentQuiet: "bg-destructive-soft text-destructive border border-destructive/25 hover:bg-destructive/10",
};

const SIZES: Record<Size, string> = {
  lg: "min-h-14 px-7 text-lg",
  md: "min-h-12 px-5 text-base",
  sm: "min-h-11 px-4 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

export function PhoneLink({
  phone,
  variant = "urgent",
  size = "md",
  className,
  children,
}: {
  phone: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={`tel:${phone.replace(/\s+/g, "")}`} className={buttonClasses(variant, size, className)}>
      {children}
    </a>
  );
}
