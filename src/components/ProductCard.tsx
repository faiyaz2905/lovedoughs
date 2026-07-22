import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { Spoon, Sparkle, HeartDoodle } from "./Doodles";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  const accentColor = product.accent === "velvet" ? "#B83232" : "#471A14";

  return (
    <Link
      to="/flavors/$slug"
      params={{ slug: product.slug }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="group relative block overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-[0_8px_30px_rgba(71,26,20,0.08)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(71,26,20,0.18)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-blush">
        <img
          src={hover ? product.imageOpenedUrl : product.imageClosedUrl}
          alt={product.imageAlt}
          width={800}
          height={1000}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-12 top-1/3 text-chocolate"
          initial={{ x: 100, y: -40, rotate: -45, opacity: 0 }}
          animate={
            hover
              ? { x: -60, y: 0, rotate: -15, opacity: 1 }
              : { x: 100, y: -40, rotate: -45, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <Spoon className="h-16 w-16" />
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-6 max-w-[60%] rounded-2xl rounded-bl-sm bg-white px-4 py-2 font-display text-base italic shadow-md"
          style={{ color: accentColor }}
          initial={{ y: 20, opacity: 0, scale: 0.9 }}
          animate={
            hover
              ? { y: 0, opacity: 1, scale: 1 }
              : { y: 20, opacity: 0, scale: 0.9 }
          }
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: hover ? 0.2 : 0 }}
        >
          {product.scoopCopy}
        </motion.div>
        {product.accent === "velvet" && (
          <span className="absolute left-6 top-6 -rotate-[4deg] rounded-sm bg-velvet px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-md">
            New
          </span>
        )}
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl font-semibold text-chocolate">{product.name}</h3>
            <p className="mt-1 font-body text-sm text-muted-foreground">{product.tagline}</p>
          </div>
          <div className="relative shrink-0 text-right">
            <span className="font-display text-xl font-semibold text-chocolate">৳{product.price}</span>
            <Sparkle className={`absolute -right-3 -top-4 h-5 w-5 text-gold transition-all duration-500 ${hover ? "scale-100 rotate-12 opacity-100" : "scale-50 opacity-0"}`} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.flavorTags.map((tag) => (
            <span key={tag} className="rounded-full bg-blush px-3 py-1 font-body text-xs font-medium text-chocolate">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-4">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{product.weight} tin</span>
          <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-chocolate">
            Open the tin
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
          </span>
        </div>

        <HeartDoodle className={`absolute -right-2 -top-2 h-8 w-8 text-gold transition-all duration-700 ${hover ? "scale-100 opacity-100 -rotate-12" : "scale-0 opacity-0"}`} />
      </div>
    </Link>
  );
}