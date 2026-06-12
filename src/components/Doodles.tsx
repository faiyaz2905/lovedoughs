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
      <path d="M20 4 L22 18 L36 20 L22 22 L20 36 L18 22 L4 20 L18 18 Z" />
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
      <path d="M4 30 Q 25 6 50 30 T 100 30" />
      <path d="M100 30 l-10 -6 M100 30 l-6 10" />
    </svg>
  );
}

export function HeartDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
    >
      <path d="M16 28s-11-7.2-11-15a6 6 0 0 1 11-3.3A6 6 0 0 1 27 13c0 7.8-11 15-11 15z" />
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
      <path d="M42 14 l3 4 l-3 4 l-3-4z M50 18 l2 3 l-2 3 l-2-3z M46 8 l2 3 l-2 3 l-2-3z" fill="#B46D37" />
    </svg>
  );
}