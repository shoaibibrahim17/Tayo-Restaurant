"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CATEGORIES, DISHES, type Dish, type DishCategory } from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";

/* Menu page — rebuilt against Figma "Desktop - 2" (node 29:4):
 * compact maroon banner ("MENU" set in olive green), centred Jakarta
 * filter chips, 4-column card grid with circular photos that overlap
 * the card's top edge, left-aligned text, heart + Add actions. */

type Filter = DishCategory | "all";

const FALLBACK_IMG = "/images/dish-bariis.webp";

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative mt-[60px] flex flex-col rounded-2xl ${dish.pastel} px-5 pb-4 pt-[72px] shadow-[0_4px_18px_rgba(31,25,22,0.06)] transition-shadow duration-500 hover:shadow-[0_14px_36px_rgba(31,25,22,0.13)]`}
    >
      {/* photo — circle sitting on the card's top edge, as designed */}
      <div className="absolute -top-[60px] left-1/2 w-[120px] -translate-x-1/2">
        <div className="rounded-full bg-white p-1.5 shadow-[0_14px_26px_rgba(31,25,22,0.15)] transition-transform duration-500 group-hover:scale-[1.04]">
          <img
            src={dish.image || FALLBACK_IMG}
            alt={dish.name}
            loading="lazy"
            width={560}
            height={560}
            className="aspect-square w-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* heart — top right corner */}
      <button
        aria-label={`Save ${dish.name} to favourites`}
        className="absolute right-4 top-4 text-terra/70 transition-colors hover:text-terra [&>svg]:h-[18px] [&>svg]:w-[18px] [&:hover>svg]:fill-terra/20"
      >
        <Heart aria-hidden />
      </button>

      <h3 className="font-display text-[15.5px] font-bold leading-snug text-[#292521]">
        {dish.name}
      </h3>
      <p className="mt-1.5 flex-1 font-body text-[12px] leading-snug text-stone2">
        {dish.desc}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-jakarta text-lg font-bold leading-none text-price">
          ${dish.price.toFixed(2)}
        </span>
        <button
          onClick={() =>
            toast.success(`${dish.name} added to your order`, {
              description: "Call 061 9180005 to confirm pickup or delivery.",
            })
          }
          className="inline-flex h-8 items-center gap-1 rounded-full bg-maroon px-4 font-jakarta text-[12.5px] font-bold text-cream transition-all duration-300 hover:scale-105 hover:bg-maroon-deep active:scale-95"
          aria-label={`Add ${dish.name} to order`}
        >
          Add
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </motion.article>
  );
}

export function MenuView() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible =
    filter === "all" ? DISHES : DISHES.filter((d) => d.category === filter);

  return (
    <>
      {/* banner — compact maroon band with sweeping ribbon + spices */}
      <section className="relative overflow-hidden bg-cream pb-9 pt-24 md:pb-11 md:pt-28">
        {/* maroon blob with an organic curved top edge, as designed */}
        <svg
          aria-hidden
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M0,42 C240,10 430,26 720,20 C1010,14 1230,36 1440,20 L1440,200 L0,200 Z"
            fill="#7c0d14"
          />
          {/* dark ribbon sweep under the leaves */}
          <path
            d="M0,176 C300,148 560,100 860,84 C1100,72 1300,54 1440,46 L1440,66 C1240,74 1040,94 800,110 C520,128 240,160 0,194 Z"
            fill="#500710"
            opacity="0.9"
          />
          {/* sage leaf blades sweeping steeply to the upper right */}
          <path
            d="M-30,150 C340,170 780,140 1470,6 C800,162 340,196 -30,150 Z"
            fill="#33402a"
          />
          <path
            d="M-30,106 C320,126 700,98 1150,-42 C660,112 300,162 -30,106 Z"
            fill="#8ba06b"
          />
          <path
            d="M-30,128 C330,150 760,122 1330,-18 C720,136 320,180 -30,128 Z"
            fill="#5c6e46"
            opacity="0.92"
          />
          <path
            d="M-30,190 C360,206 850,182 1470,92 C850,208 360,216 -30,190 Z"
            fill="#2a3520"
            opacity="0.85"
          />
        </svg>
        {/* spice splash glow behind the headline */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[26%] h-32 w-64 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(22,2,4,0.6) 0%, rgba(22,2,4,0.28) 55%, rgba(22,2,4,0) 100%)",
          }}
        />
        <img
          src="/images/menu-garnish-a.webp"
          alt=""
          aria-hidden
          width={600}
          height={600}
          className="tayo-float absolute left-[6%] top-[16%] w-14 opacity-80 md:w-20"
        />
        <img
          src="/images/menu-garnish-b.webp"
          alt=""
          aria-hidden
          width={600}
          height={600}
          className="tayo-float absolute bottom-[14%] right-[7%] w-14 opacity-80 md:w-20"
          style={{ animationDelay: "1.5s" }}
        />
        <img
          src="/images/garnish-1.webp"
          alt=""
          aria-hidden
          width={600}
          height={600}
          className="absolute right-[18%] top-[12%] hidden w-12 opacity-70 md:block"
        />
        <img
          src="/images/garnish-3.webp"
          alt=""
          aria-hidden
          width={600}
          height={600}
          className="tayo-float absolute bottom-[16%] left-[16%] hidden w-14 opacity-70 lg:block"
          style={{ animationDelay: "0.8s" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.01em] text-cream sm:text-6xl md:text-[54px] md:leading-[1.05]">
              OUR <span className="text-[#5d6b44]">MENU</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-xs font-body text-[15px] leading-relaxed text-cream/85 sm:text-base">
              Fresh Somali favorites served daily at Rugsan Mall.
            </p>
          </Reveal>
        </div>
      </section>

      {/* filter + grid */}
      <section className="bg-white py-12 md:py-16" aria-label="Menu items">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-0">
          <div
            className="no-scrollbar sticky top-16 z-30 -mx-5 flex gap-3 overflow-x-auto bg-white/85 px-5 py-3 backdrop-blur-md md:top-20 md:flex-wrap md:justify-center"
            role="tablist"
            aria-label="Menu categories"
          >
            {CATEGORIES.map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c.id)}
                  className={`h-9 shrink-0 rounded-full px-5 font-jakarta text-[13px] font-bold transition-colors duration-300 ${
                    active
                      ? "bg-maroon text-cream shadow-[0_8px_20px_rgba(139,15,22,0.25)]"
                      : "border-[1.5px] border-ink text-ink hover:bg-beige"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            className="mt-[76px] grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((dish, i) => (
                <DishCard key={dish.id} dish={dish} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          <p className="mt-14 text-center font-body text-sm text-stone3">
            Prices in USD · To order, call{" "}
            <a href="tel:0619180005" className="font-bold text-maroon hover:underline">
              061 9180005
            </a>{" "}
            or message us on WhatsApp.
          </p>
        </div>
      </section>
    </>
  );
}
