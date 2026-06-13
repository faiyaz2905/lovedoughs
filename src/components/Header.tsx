import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoUrl from "@/assets/Love Doughs logo.svg";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/story", label: "Our Story" },
  { to: "/flavors", label: "Flavors" },
  { to: "/gift", label: "Gift This" },
  { to: "/order", label: "Order" },
] as const;

/**
 * Minimal header used on the homepage where the hero plates serve as
 * the primary navigation. Shows only the centered logo and a hamburger
 * menu button (always visible, for users who prefer traditional nav).
 * On non-homepage routes, we use the full nav links.
 */
export function Header({ minimal = false }: { minimal?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`${minimal ? "absolute" : "sticky"} top-0 left-0 right-0 z-40 transition-all duration-300 ${
        !minimal && scrolled
          ? "bg-blush/80 backdrop-blur-md shadow-[0_2px_24px_rgba(71,26,20,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl justify-between px-6 py-1 lg:px-12 ${
          minimal ? "items-start pt-4 pb-2 md:pt-6" : "items-center"
        }`}
      >
        {/* Left nav links — hidden in minimal mode */}
        {!minimal && (
          <nav className="hidden flex-1 items-center justify-end gap-10 md:flex">
            {links.slice(0, 2).map((l) => (
              <NavLink key={l.to} to={l.to} label={l.label} />
            ))}
          </nav>
        )}

        {/* Spacer for minimal mode */}
        {minimal && <div className="flex-1" />}

        {/* Logo */}
        <Link to="/" className="mx-6 flex shrink-0 items-center">
          <img
            src={logoUrl}
            alt="Love Doughs"
            className={`w-auto object-contain transition-all duration-300 ${
              minimal ? "h-16 md:h-[240px]" : "h-16 md:h-20"
            }`}
          />
        </Link>

        {/* Right nav links — hidden in minimal mode */}
        {!minimal && (
          <nav className="hidden flex-1 items-center justify-start gap-10 md:flex">
            {links.slice(2).map((l) => (
              <NavLink key={l.to} to={l.to} label={l.label} />
            ))}
          </nav>
        )}

        {/* Spacer for minimal mode to push hamburger to right */}
        {minimal && <div className="flex-1" />}

        {/* Hamburger — always visible */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className={`rounded-full p-2 text-chocolate transition-colors ${
            minimal
              ? "border-2 border-chocolate/40 hover:border-chocolate self-start"
              : "border-2 border-chocolate md:hidden"
          }`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile / hamburger dropdown */}
      {open && (
        <div
          className={`fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-blush px-6 transition-all duration-300 ${
            minimal ? "top-[72px] md:top-[272px]" : "top-[72px]"
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="wavy-link font-display text-4xl font-semibold text-chocolate"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="wavy-link font-body text-sm font-semibold tracking-wide text-chocolate"
    >
      {label}
    </Link>
  );
}