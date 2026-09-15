import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 font-body font-semibold text-sm tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-blush disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-chocolate text-white px-8 py-3.5 rounded-[10px] shadow-[0_4px_16px_rgba(71,26,20,0.18)] hover:bg-caramel hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(71,26,20,0.22)] active:translate-y-0",
  secondary:
    "border-2 border-chocolate text-chocolate bg-transparent px-8 py-3.5 rounded-[10px] hover:bg-blush hover:-translate-y-0.5",
  ghost:
    "text-caramel hover:text-chocolate underline underline-offset-4 decoration-wavy decoration-caramel/40 hover:decoration-chocolate p-0 h-auto",
};

type BtnProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function Btn({
  variant = "primary",
  className = "",
  children,
  ...rest
}: BtnProps & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function LinkBtn({
  to,
  variant = "primary",
  className = "",
  children,
}: BtnProps & { to: string }) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function ExtBtn({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: BtnProps & ComponentProps<"a">) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
