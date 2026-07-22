import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { HeartDoodle } from "./Doodles";
import { INSTAGRAM_HANDLE, instaLink } from "@/lib/products";
import { DHAKA_AREAS } from "@/lib/site";
import logoUrl from "@/assets/logo.webp";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-chocolate text-blush">
      <div className="absolute -left-10 top-10 opacity-10">
        <HeartDoodle className="h-40 w-40" />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-3 lg:px-12">
        <div>
          <div className="flex items-center">
            <img
              src={logoUrl}
              alt="Love Doughs"
              width={160}
              height={64}
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-blush/80">
            Tinned cookie dough, baked with love in a small kitchen in Dhaka.
            Made in tiny batches. Always tied with a red ribbon. Bangladesh&apos;s
            first edible cookie dough tin brand.
          </p>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">Wander</h4>
          <ul className="mt-4 space-y-2 font-body text-base">
            <li><Link to="/story" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/flavors" className="hover:text-gold">Flavors</Link></li>
            <li><Link to="/gift" className="hover:text-gold">Gift This</Link></li>
            <li><Link to="/order" className="hover:text-gold">Order</Link></li>
            <li><a href="/story#faq" className="hover:text-gold">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">Say hi</h4>
          <ul className="mt-4 space-y-3 font-body text-base">
            <li>
              <a href={instaLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold">
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
                @{INSTAGRAM_HANDLE}
              </a>
            </li>
            <li className="text-sm text-blush/70">Dhaka, Bangladesh</li>
            <li className="text-sm leading-relaxed text-blush/60">
              Delivering across {DHAKA_AREAS.join(", ")}, and nearby areas.
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blush/15 py-6 text-center font-body text-xs text-blush/60">
        © {new Date().getFullYear()} Love Doughs. Baked with love.
      </div>
    </footer>
  );
}
