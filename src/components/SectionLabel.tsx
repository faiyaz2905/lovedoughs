import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-caramel">
      {children}
    </span>
  );
}