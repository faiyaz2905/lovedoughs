import { useMemo, useState } from "react";
import { ALL_GUIDES, getBrowserGuide, type BrowserGuide } from "@/lib/tradecookies/browserGuide";
import { SectionLabel } from "@/components/SectionLabel";

export function BrowserCookieGuide() {
  const detected = useMemo(() => getBrowserGuide(), []);
  const [guide, setGuide] = useState<BrowserGuide>(detected);

  return (
    <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-[0_8px_24px_rgba(71,26,20,0.08)] md:p-8">
      <SectionLabel>Find your count</SectionLabel>
      <h2 className="mt-3 font-display text-2xl font-semibold text-chocolate md:text-3xl">
        Last <span className="italic">24 hours</span> only.
      </h2>
      <p className="mt-2 font-body text-sm text-chocolate/75">
        We detected <span className="font-semibold text-chocolate">{detected.label}</span>.
        Switch below if that&apos;s wrong. Screenshot the past-day site count — hour or week windows get rejected.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {ALL_GUIDES.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setGuide(g)}
            className={`rounded-full px-3 py-1.5 font-body text-xs font-semibold transition-colors ${
              guide.id === g.id
                ? "bg-chocolate text-white"
                : "bg-blush text-chocolate hover:bg-border-subtle"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <ol className="mt-6 list-decimal space-y-3 pl-5 font-body text-base leading-relaxed text-chocolate/85">
        {guide.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
