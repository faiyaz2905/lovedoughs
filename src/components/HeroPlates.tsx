import { useNavigate } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Full (food visible) layers
import tinCcFull from "@/assets/tin-cc-full.svg";
import tinRvFull from "@/assets/tin-rv-full.svg";
import spoonCcFull from "@/assets/spoon-cc-full.svg";
import spoonRvFull from "@/assets/spoon-rv-full.svg";

// Empty (food gone, text visible) layers
import tinCcEmpty from "@/assets/tin-cc-empty.svg";
import tinRvEmpty from "@/assets/tin-rv-empty.svg";
import spoonCcEmpty from "@/assets/spoon-cc-empty.svg";
import spoonRvEmpty from "@/assets/spoon-rv-empty.svg";

type PlateItem = {
  id: string;
  fullSrc: string;
  emptySrc: string;
  label: string;
  to: string;
  alt: string;
};

const items: PlateItem[] = [
  {
    id: "tin-cc",
    fullSrc: tinCcFull,
    emptySrc: tinCcEmpty,
    label: "Our Story",
    to: "/story",
    alt: "Chocolate chip cookie dough tin, overhead view",
  },
  {
    id: "spoon-cc",
    fullSrc: spoonCcFull,
    emptySrc: spoonCcEmpty,
    label: "Flavors",
    to: "/flavors",
    alt: "Spoonful of chocolate chip cookie dough",
  },
  {
    id: "spoon-rv",
    fullSrc: spoonRvFull,
    emptySrc: spoonRvEmpty,
    label: "Order",
    to: "/order",
    alt: "Spoonful of red velvet cookie dough",
  },
  {
    id: "tin-rv",
    fullSrc: tinRvFull,
    emptySrc: tinRvEmpty,
    label: "Gift This",
    to: "/gift",
    alt: "Red velvet cookie dough tin, overhead view",
  },
];

export function HeroPlates() {
  return (
    <section className="relative w-full overflow-hidden bg-blush">
      {/* Subtle tablecloth grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #B46D37 1px, transparent 1px), linear-gradient(to bottom, #B46D37 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Tiny scattered dots for warmth */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #471A14 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "14px 14px",
        }}
      />

      {/* Hero container — full viewport height */}
      <div className="relative h-[100svh] min-h-[600px] max-h-[1100px] w-full">
        {/* Tin CC: top-left, partially off-screen, large */}
        <PlateLink
          item={items[0]}
          className="absolute -left-[10%] top-[5%] w-[80%] md:-left-[6%] md:top-[6%] md:w-[38%] lg:w-[50%] lg:top-[-10%] lg:left-[-10%]"
          imageRotationClass="-rotate-[5deg]"
          textPositionClass="inset-0"
          textRotationClass="rotate-[5deg]"
          textSizeClass="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          staggerIndex={0}
        />

        {/* Spoon RV: nestled beside Tin CC on mobile (top-right/middle-right), and next to Tin RV on desktop (bottom-right area) */}
        <PlateLink
          item={items[2]}
          className="absolute -right-[30%] top-[25%] w-[80%] md:right-[16%] md:bottom-[36%] md:top-auto md:w-[32%] lg:right-[5%] lg:bottom-[35%] lg:w-[40%]"
          imageRotationClass="rotate-[-15deg] md:rotate-[-15deg] lg:rotate-[-30deg]"
          textPositionClass="top-[15%] left-[17%] w-[40%] h-[40%]"
          textRotationClass="rotate-[15deg] lg:rotate-[30deg]"
          textSizeClass="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          staggerIndex={1}
        />

        {/* Spoon CC: nestled beside Tin RV on mobile (bottom-left/middle-left), and next to Tin CC on desktop (top-left/center-left area) */}
        <PlateLink
          item={items[1]}
          className="absolute -left-[30%] top-[30%] w-[80%] md:left-[16%] md:top-[38%] md:w-[34%] lg:left-[17%] lg:top-[30%] lg:w-[40%]"
          imageRotationClass="rotate-[165deg] md:rotate-[140deg] lg:rotate-[90deg]"
          textPositionClass="top-[18%] left-[15%] w-[40%] h-[40%]"
          textRotationClass="rotate-[-165deg] md:rotate-[-140deg] lg:rotate-[-90deg]"
          textSizeClass="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          staggerIndex={2}
        />

        {/* Tin RV: bottom-right, large, partially off-screen */}
        <PlateLink
          item={items[3]}
          className="absolute -right-[10%] top-[50%] w-[80%] md:-right-[8%] md:bottom-[-2%] md:top-auto md:w-[40%] lg:w-[50%] lg:bottom-[-30%]"
          imageRotationClass="rotate-[6deg]"
          textPositionClass="inset-0"
          textRotationClass="rotate-[-6deg]"
          textSizeClass="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          staggerIndex={3}
        />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 font-body text-xs uppercase tracking-[0.28em] text-chocolate/40"
      >
        <span className="h-px w-8 bg-chocolate/20" />
        tap to explore
        <span className="h-px w-8 bg-chocolate/20" />
      </motion.div>
    </section>
  );
}

function PlateLink({
  item,
  className,
  imageRotationClass,
  textPositionClass,
  textRotationClass = "",
  textSizeClass,
  staggerIndex,
}: {
  item: PlateItem;
  className: string;
  imageRotationClass: string;
  textPositionClass: string;
  textRotationClass?: string;
  textSizeClass: string;
  staggerIndex: number;
}) {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const handleClick = useCallback(() => {
    if (navigating) return;

    if (!revealed) {
      // First click: reveal the text (food vanishes)
      setRevealed(true);
    } else {
      // Second click on revealed plate: navigate immediately
      setNavigating(true);
      navigate({ to: item.to });
    }
  }, [revealed, navigating, navigate, item.to]);

  // Auto-navigate after reveal animation + delay
  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(() => {
      setNavigating(true);
      navigate({ to: item.to });
    }, 1200);
    return () => clearTimeout(timer);
  }, [revealed, navigate, item.to]);

  // Select clipPath based on the item type (circular tin vs CC spoon vs RV spoon)
  let clipPath = "";
  if (item.id.startsWith("tin")) {
    clipPath = "circle(47% at 50% 50%)";
  } else if (item.id === "spoon-cc") {
    // CC spoon is horizontal (scoop left, handle right)
    // Widen the polygon to prevent clipping the handle on different screen sizes
    clipPath = "polygon(0% 5%, 50% 5%, 100% 25%, 100% 85%, 50% 95%, 0% 95%)";
  } else if (item.id === "spoon-rv") {
    // RV spoon is diagonal (scoop top-left, handle bottom-right)
    // Widen the polygon to prevent clipping the handle on different screen sizes
    clipPath = "polygon(0% 0%, 65% 10%, 100% 60%, 100% 100%, 60% 100%, 0% 65%)";
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={`cursor-pointer ${className} ${imageRotationClass}`}
      style={{ clipPath }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 + staggerIndex * 0.12 }}
      whileHover={!revealed ? { scale: 1.06, y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } } : undefined}
      whileTap={!revealed ? { scale: 0.97 } : undefined}
      aria-label={`${item.label} — click to navigate`}
    >
      {/* Aspect-square container for stacking layers */}
      <div className="relative aspect-square w-full">
        {/* Bottom layer: empty plate/spoon (always present) */}
        <img
          src={item.emptySrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain drop-shadow-lg"
          loading="eager"
          draggable={false}
        />

        {/* Text label — springs in when food vanishes */}
        <AnimatePresence>
          {revealed && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
              className={`absolute z-10 flex items-center justify-center font-display font-bold italic text-chocolate select-none pointer-events-none drop-shadow-sm ${textPositionClass} ${textRotationClass} ${textSizeClass}`}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Top layer: food item — fades/lifts out on click */}
        <AnimatePresence>
          {!revealed && (
            <motion.img
              key={`food-${item.id}`}
              src={item.fullSrc}
              alt={item.alt}
              className="absolute inset-0 h-full w-full object-contain drop-shadow-xl"
              loading="eager"
              draggable={false}
              exit={{ opacity: 0, scale: 0.8, y: -30, rotate: -5 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Screen reader text */}
      <span className="sr-only">Go to {item.label}</span>
    </motion.button>
  );
}
