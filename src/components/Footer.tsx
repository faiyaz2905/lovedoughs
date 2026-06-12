import { Link } from "@tanstack/react-router";
import { Instagram, Phone } from "lucide-react";
import { CookieLogo, HeartDoodle } from "./Doodles";
import { WHATSAPP_NUMBER } from "@/lib/products";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-chocolate text-blush">
      <div className="absolute -left-10 top-10 opacity-10">
        <HeartDoodle className="h-40 w-40" />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-3 lg:px-12">
        <div>
          <div className="flex items-center gap-3">
            <CookieLogo className="h-12 w-12" />
            <span className="font-display text-2xl font-bold">Love Doughs</span>
          </div>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-blush/80">
            Tinned cookie dough, baked with love in a small kitchen in Dhaka.
            Made in tiny batches. Always tied with a red ribbon.
          </p>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">Wander</h4>
          <ul className="mt-4 space-y-2 font-body text-base">
            <li><Link to="/story" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/flavors" className="hover:text-gold">Flavors</Link></li>
            <li><Link to="/gift" className="hover:text-gold">Gift This</Link></li>
            <li><Link to="/order" className="hover:text-gold">Order</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">Say hi</h4>
          <ul className="mt-4 space-y-3 font-body text-base">
            <li>
              <a href="https://instagram.com/lovedoughs" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold">
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
                @lovedoughs
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold">
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                WhatsApp orders
              </a>
            </li>
            <li className="text-sm text-blush/70">Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blush/15 py-6 text-center font-body text-xs text-blush/60">
        © {new Date().getFullYear()} Love Doughs. Baked with love.
      </div>
    </footer>
  );
}