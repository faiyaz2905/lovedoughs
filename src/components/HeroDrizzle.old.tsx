import { LinkBtn } from "./Button";
import { HeartDoodle, Sparkle, HappyCookieDoodle, HappyCupDoodle, SpeechBubbleDoodle } from "./Doodles";
import { motion } from "framer-motion";

export function HeroDrizzle() {
  return (
    <section className="relative isolate overflow-hidden">
      <svg aria-hidden="true" viewBox="0 0 1440 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="drizzle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#471A14" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B46D37" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <motion.path
          d="M340 -40 Q 380 160 320 280 T 380 520 Q 410 620 360 720"
          stroke="url(#drizzle)" strokeWidth="14" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.2, ease: [0.6, 0.02, 0.3, 1] }}
        />
        <motion.circle 
          cx="360" cy="720" fill="#471A14"
          initial={{ r: 0 }}
          animate={{ r: 22 }}
          transition={{ duration: 0.6, delay: 2.2, ease: "easeOut" }} 
        />
        <motion.path
          d="M1180 -40 Q 1140 120 1200 240 T 1140 460"
          stroke="url(#drizzle)" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.55"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.6, ease: [0.6, 0.02, 0.3, 1] }}
        />
      </svg>

      {/* Cute wiggling brand doodles */}
      <HappyCookieDoodle className="absolute left-[6%] top-[38%] h-24 w-24 hidden md:block" />
      <SpeechBubbleDoodle className="absolute left-[11%] top-[28%] h-14 w-24 hidden md:block" text="fresh! 🍪" />
      <HappyCupDoodle className="absolute right-[8%] top-[32%] h-24 w-24 hidden md:block" />

      <HeartDoodle className="animate-float absolute left-[12%] top-[20%] h-6 w-6 text-velvet" />
      <Sparkle className="animate-float absolute right-[16%] top-[18%] h-7 w-7 text-gold [animation-delay:1s]" />
      <HeartDoodle className="animate-float absolute right-[10%] bottom-[18%] h-4 w-4 text-caramel [animation-delay:2s]" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-12">
        <motion.span 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0 }}
          className="font-body text-xs font-semibold uppercase tracking-[0.32em] text-caramel"
        >
          ✦ Tinned in Dhaka ✦
        </motion.span>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tight text-chocolate md:text-7xl lg:text-[clamp(4rem,9vw,8rem)]"
        >
          made with love.
          <br />
          <span className="italic font-light">baked with</span>{" "}
          <span className="doodle-underline">dough.</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-xl font-body text-lg leading-relaxed text-chocolate/80 md:text-xl"
        >
          Edible cookie dough in a ribbon-tied tin. Two flavours. Tiny batches.
          The kind of gift you'll want to keep for yourself.
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <LinkBtn to="/flavors">Meet the tins</LinkBtn>
          <LinkBtn to="/gift" variant="secondary">Send one as a gift</LinkBtn>
        </motion.div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 flex items-center gap-3 font-body text-xs uppercase tracking-[0.28em] text-chocolate/60"
        >
          <span className="h-px w-10 bg-chocolate/30" />
          scroll for a scoop
          <span className="h-px w-10 bg-chocolate/30" />
        </motion.div>
      </div>
    </section>
  );
}