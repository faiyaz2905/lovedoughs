import { motion } from "framer-motion";

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <motion.path
        d="M20 4 L22 18 L36 20 L22 22 L20 36 L18 22 L4 20 L18 18 Z"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

export function WigglyArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M4 30 Q 25 6 50 30 T 100 30"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.path
        d="M100 30 l-10 -6 M100 30 l-6 10"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
      />
    </svg>
  );
}

export function HeartDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="currentColor">
      <motion.path
        d="M16 28s-11-7.2-11-15a6 6 0 0 1 11-3.3A6 6 0 0 1 27 13c0 7.8-11 15-11 15z"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
}

export function Spoon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <ellipse cx="26" cy="26" rx="16" ry="20" transform="rotate(-30 26 26)" />
      <path d="M40 40 L72 72" />
    </svg>
  );
}

export function CookieLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="34" r="22" fill="#B46D37" />
      <path d="M48 22 a8 8 0 0 0 -10 -6 a6 6 0 0 0 -8 4" fill="#FED2C7" />
      <circle cx="24" cy="32" r="2.4" fill="#471A14" />
      <circle cx="34" cy="40" r="2.4" fill="#471A14" />
      <circle cx="42" cy="32" r="2.2" fill="#471A14" />
      <circle cx="28" cy="44" r="2" fill="#471A14" />
      <path
        d="M42 14 l3 4 l-3 4 l-3-4z M50 18 l2 3 l-2 3 l-2-3z M46 8 l2 3 l-2 3 l-2-3z"
        fill="#B46D37"
      />
    </svg>
  );
}

export function HappyCookieDoodle({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-chocolate"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 50,12 C 72,12 88,28 88,50 C 88,58 84,62 82,66 C 78,74 80,78 78,82 C 72,88 64,88 50,88 C 28,88 12,72 12,50 C 12,28 28,12 50,12 Z"
          fill="#FED2C7"
        />
        <path
          d="M 78,24 C 74,28 74,34 78,38 C 82,42 88,42 92,38"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="28" cy="30" r="4.5" fill="currentColor" stroke="none" />
        <circle cx="72" cy="54" r="5" fill="currentColor" stroke="none" />
        <circle cx="40" cy="74" r="4" fill="currentColor" stroke="none" />
        <circle cx="24" cy="62" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="42" cy="46" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="58" cy="46" r="2.5" fill="currentColor" stroke="none" />
        <ellipse cx="36" cy="52" rx="4" ry="2.5" fill="#B83232" fillOpacity="0.4" stroke="none" />
        <ellipse cx="64" cy="52" rx="4" ry="2.5" fill="#B83232" fillOpacity="0.4" stroke="none" />
        <path d="M 47,52 Q 50,56 53,52" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 42,88 Q 42,94 38,94" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 58,88 Q 58,94 62,94" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    </motion.div>
  );
}

export function HappyCupDoodle({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{ y: [0, -5, 0], rotate: [0, 1, -1, 0] }}
      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
      whileHover={{ scale: 1.15, rotate: [0, -3, 3, 0] }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-chocolate"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 40,20 Q 36,12 40,6" />
        <path d="M 52,20 Q 48,14 52,8" />
        <path
          d="M 28,30 L 72,30 L 68,76 C 68,82 60,86 50,86 C 40,86 32,82 32,76 Z"
          fill="#E8F4E5"
        />
        <path d="M 72,40 C 84,40 84,62 70,62" />
        <circle cx="42" cy="50" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="58" cy="50" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="36" cy="56" r="3" fill="#B83232" fillOpacity="0.4" stroke="none" />
        <circle cx="64" cy="56" r="3" fill="#B83232" fillOpacity="0.4" stroke="none" />
        <path d="M 48,58 Q 50,62 52,58 Z" fill="currentColor" />
        <path d="M 28,54 C 20,54 20,48 24,48" />
      </svg>
    </motion.div>
  );
}

export function HappyStarDoodle({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
      transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
      whileHover={{ scale: 1.2, rotate: 15 }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-chocolate"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 50,10 L 62,38 L 92,38 L 68,56 L 78,86 L 50,68 L 22,86 L 32,56 L 8,38 L 38,38 Z"
          fill="#FFF4D0"
        />
        <circle cx="43" cy="48" r="2" fill="currentColor" stroke="none" />
        <circle cx="57" cy="48" r="2" fill="currentColor" stroke="none" />
        <path d="M 48,54 Q 50,57 52,54" />
        <ellipse cx="38" cy="52" rx="3" ry="1.8" fill="#B83232" fillOpacity="0.4" stroke="none" />
        <ellipse cx="62" cy="52" rx="3" ry="1.8" fill="#B83232" fillOpacity="0.4" stroke="none" />
      </svg>
    </motion.div>
  );
}

export function FlowerDoodle({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-chocolate"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 50,85 Q 46,60 50,45" />
        <path d="M 48,65 Q 36,60 38,52 Q 46,55 48,65 Z" fill="#E8F4E5" />
        <circle cx="50" cy="30" r="10" fill="#FED2C7" />
        <circle cx="36" cy="40" r="10" fill="#FED2C7" />
        <circle cx="64" cy="40" r="10" fill="#FED2C7" />
        <circle cx="42" cy="54" r="10" fill="#FED2C7" />
        <circle cx="58" cy="54" r="10" fill="#FED2C7" />
        <circle cx="50" cy="44" r="8" fill="#FFF4D0" />
        <circle cx="48" cy="43" r="1" fill="currentColor" stroke="none" />
        <circle cx="52" cy="43" r="1" fill="currentColor" stroke="none" />
        <path d="M 49,46 Q 50,47 51,46" />
      </svg>
    </motion.div>
  );
}

export function SpeechBubbleDoodle({
  className = "",
  text = "yum!",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      whileHover={{ scale: 1.1, rotate: -3 }}
    >
      <svg
        viewBox="0 0 120 70"
        className="w-full h-full text-chocolate"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 10,30 C 10,14 28,10 60,10 C 92,10 110,14 110,30 C 110,46 92,50 60,50 C 48,50 36,54 26,62 C 28,52 10,46 10,30 Z"
          fill="white"
        />
        <text
          x="60"
          y="36"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          className="font-display font-bold text-sm select-none italic"
          stroke="none"
        >
          {text}
        </text>
      </svg>
    </motion.div>
  );
}
