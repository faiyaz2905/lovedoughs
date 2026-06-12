import { useEffect, useState } from "react";
import { LinkBtn } from "./Button";
import { HeartDoodle, Sparkle } from "./Doodles";

export function HeroDrizzle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      <svg aria-hidden="true" viewBox="0 0 1440 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="drizzle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#471A14" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B46D37" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d="M340 -40 Q 380 160 320 280 T 380 520 Q 410 620 360 720"
          stroke="url(#drizzle)" strokeWidth="14" strokeLinecap="round" fill="none"
          style={{ strokeDasharray: 1400, strokeDashoffset: mounted ? 0 : 1400, transition: "stroke-dashoffset 2200ms cubic-bezier(.6,.02,.3,1) 200ms" }}
        />
        <circle cx="360" cy="720" r={mounted ? 22 : 0} fill="#471A14" style={{ transition: "r 600ms ease-out 2200ms" }} />
        <path
          d="M1180 -40 Q 1140 120 1200 240 T 1140 460"
          stroke="url(#drizzle)" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.55"
          style={{ strokeDasharray: 900, strokeDashoffset: mounted ? 0 : 900, transition: "stroke-dashoffset 2400ms cubic-bezier(.6,.02,.3,1) 600ms" }}
        />
      </svg>

      <HeartDoodle className="animate-float absolute left-[12%] top-[28%] h-6 w-6 text-velvet" />
      <Sparkle className="animate-float absolute right-[16%] top-[22%] h-7 w-7 text-gold [animation-delay:1s]" />
      <HeartDoodle className="animate-float absolute right-[10%] bottom-[18%] h-4 w-4 text-caramel [animation-delay:2s]" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-12">
        <span className="animate-fade-up font-body text-xs font-semibold uppercase tracking-[0.32em] text-caramel">
          ✦ Tinned in Dhaka ✦
        </span>
        <h1 className="animate-fade-up mt-6 max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tight text-chocolate md:text-7xl lg:text-[clamp(4rem,9vw,8rem)]" style={{ animationDelay: "200ms" }}>
          made with love.
          <br />
          <span className="italic font-light">baked with</span>{" "}
          <span className="doodle-underline">dough.</span>
        </h1>
        <p className="animate-fade-up mt-8 max-w-xl font-body text-lg leading-relaxed text-chocolate/80 md:text-xl" style={{ animationDelay: "500ms" }}>
          Edible cookie dough in a ribbon-tied tin. Two flavours. Tiny batches.
          The kind of gift you'll want to keep for yourself.
        </p>
        <div className="animate-fade-up mt-10 flex flex-col items-center gap-4 sm:flex-row" style={{ animationDelay: "750ms" }}>
          <LinkBtn to="/flavors">Meet the tins</LinkBtn>
          <LinkBtn to="/gift" variant="secondary">Send one as a gift</LinkBtn>
        </div>
        <div className="animate-fade-up mt-16 flex items-center gap-3 font-body text-xs uppercase tracking-[0.28em] text-chocolate/60" style={{ animationDelay: "1000ms" }}>
          <span className="h-px w-10 bg-chocolate/30" />
          scroll for a scoop
          <span className="h-px w-10 bg-chocolate/30" />
        </div>
      </div>
    </section>
  );
}