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

export function Header() {
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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-blush/80 backdrop-blur-md shadow-[0_2px_24px_rgba(71,26,20,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1 lg:px-12">
        <nav className="hidden flex-1 items-center justify-end gap-10 md:flex">
          {links.slice(0, 2).map((l) => (
            <NavLink key={l.to} to={l.to} label={l.label} />
          ))}
        </nav>

        <Link to="/" className="mx-6 flex shrink-0 items-center">
          <img src={logoUrl} alt="Love Doughs" className="h-20 md:h-24 w-auto object-contain" />
        </Link>

        <nav className="hidden flex-1 items-center justify-start gap-10 md:flex">
          {links.slice(2).map((l) => (
            <NavLink key={l.to} to={l.to} label={l.label} />
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto rounded-full border-2 border-chocolate p-2 text-chocolate md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[72px] z-30 flex flex-col items-center justify-center gap-8 bg-blush px-6 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-semibold text-chocolate"
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