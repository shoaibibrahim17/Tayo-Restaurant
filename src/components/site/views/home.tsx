"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  ArrowRight,
  Clock,
  MapPin,
  MessageCircle,
  Plus,
  Star,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  BEST_SELLERS,
  CATEGORIES,
  EXPERIENCE_POINTS,
  TESTIMONIALS,
  CONTACT_INFO,
  type DishCategory,
} from "@/lib/site-data";
import {
  Eyebrow,
  Reveal,
  RevealGroup,
  RevealItem,
  Sparkle,
} from "@/components/site/reveal";

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

/* Gold gradient pill — the hero CTA from the design (~230×56, dark text) */
function GoldButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-b from-[#f2c14e] to-[#d9992b] px-12 font-body text-base font-bold text-cocoa shadow-[0_10px_26px_rgba(160,110,20,0.35)] transition-transform duration-300 hover:scale-[1.03] ${className}`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — split maroon/olive field + capsule arch photo               */
/*  (Figma 47:153)                                                     */
/* ------------------------------------------------------------------ */

function Hero({ onNavigate }: { onNavigate: (p: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yArch = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yFloat = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const l1x = useTransform(sx, (v) => v * 14);
  const l1y = useTransform(sy, (v) => v * 14);
  const l2x = useTransform(sx, (v) => v * -10);
  const l2y = useTransform(sy, (v) => v * -10);
  const l3x = useTransform(sx, (v) => v * 22);
  const l3y = useTransform(sy, (v) => v * 22);
  const l4x = useTransform(sx, (v) => v * -18);
  const l4y = useTransform(sy, (v) => v * -18);
  const l1 = { x: l1x, y: l1y };
  const l2 = { x: l2x, y: l2y };
  const l3 = { x: l3x, y: l3y };
  const l4 = { x: l4x, y: l4y };

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#700b12] pt-16 md:pt-20"
      aria-label="Welcome to Tayo Restaurant"
    >
      {/* maroon field — lighter radial centre-left, deep edges */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 700px at 30% 38%, #9e1620 0%, #8b0f16 45%, #700b12 80%)",
        }}
      />
      {/* olive field — diagonal boundary 64% → 43.5% (as designed) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: "polygon(64% 0, 100% 0, 100% 100%, 43.5% 100%)",
          background:
            "linear-gradient(180deg, #4f5c3e 0%, #455135 55%, #363f29 100%)",
        }}
      />
      {/* bottom vignette */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#2a0507]/70 to-transparent"
      />

      {/* sambuus — top left, above the headline (as designed) */}
      <motion.img
        src="/images/hero-sambuus.webp"
        alt=""
        aria-hidden
        width={800}
        height={800}
        style={{ ...l3, y: yFloat }}
        className="tayo-float absolute left-[10%] top-[5%] z-20 hidden w-36 drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] lg:block"
      />
      {/* small plate — top right corner, as designed */}
      <motion.img
        src="/images/dish-bariis.webp"
        alt=""
        aria-hidden
        width={600}
        height={600}
        style={l4}
        className="absolute right-[2.5%] top-[9%] z-10 hidden w-[72px] rounded-full lg:block"
      />
      {/* chai cup top view — bottom left, as designed */}
      <motion.img
        src="/images/garnish-2.webp"
        alt=""
        aria-hidden
        width={600}
        height={600}
        style={l2}
        className="absolute bottom-[4%] left-[29%] z-10 hidden w-14 opacity-95 lg:block"
      />
      <Sparkle className="absolute left-[47.5%] top-[15%] z-10 hidden h-5 w-5 text-gold-bright/90 lg:block" />
      <Sparkle className="absolute bottom-[30%] left-[27%] z-10 hidden h-4 w-4 text-terra/90 lg:block" />
      <Sparkle className="absolute right-[38%] top-[30%] z-10 hidden h-3.5 w-3.5 text-gold-bright/70 lg:block" />

      {/* coffee splash cup — overlaps the headline tail on desktop (Figma 47:153) */}
      <motion.img
        src="/images/coffee-cup.webp"
        alt=""
        aria-hidden
        width={1000}
        height={1500}
        style={{ ...l2, y: yFloat }}
        className="tayo-float absolute left-[30%] top-[23%] z-30 hidden w-[185px] -rotate-[14deg] lg:block"
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-4 lg:px-0"
      >
        {/* Copy */}
        <motion.div style={{ y: yTitle }} className="text-center lg:text-left lg:pl-[42px]">
          <Reveal>
            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span className="h-px w-6 bg-gold-bright" aria-hidden />
              <span className="font-body text-xs font-bold uppercase tracking-[0.02em] text-gold-bright sm:text-sm">
                Taste the warmth of Somali cuisine
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-[13.5vw] font-extrabold leading-[0.95] tracking-[-0.02em] text-cream sm:text-7xl sm:leading-[0.93] md:text-8xl xl:text-[96px] xl:leading-[0.84] xl:tracking-[-0.03em]">
              TAYO
              <span className="block">RESTAURANT</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-sm font-body text-[19px] leading-relaxed text-cream/90 sm:text-xl lg:mx-0">
              Unforgettable flavors — served with the warmth of Tayo.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex justify-center lg:justify-start">
              <GoldButton onClick={() => onNavigate("/menu")}>
                Explore Menu
              </GoldButton>
            </div>
          </Reveal>
        </motion.div>

        {/* Visual — capsule arch photo with gold dashed border */}
        <motion.div
          style={{ y: yArch }}
          className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[430px]"
        >
          <motion.div style={l1} className="relative">
            <div
              className="rounded-full border-2 border-dashed border-gold/70 p-2"
              style={{ borderStyle: "dashed" }}
            >
              <div className="overflow-hidden rounded-full bg-maroon-deep">
                <img
                  src="/images/hero-interior.jpg"
                  alt="Guests enjoying dinner in the warm dining room of Tayo Restaurant"
                  width={860}
                  height={1440}
                  className="aspect-[3/5] w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* coffee splash — mobile/tablet only: over the arch's upper left.
              Desktop gets the section-level cup that overlaps the headline. */}
          <motion.img
            src="/images/coffee-cup.webp"
            alt=""
            aria-hidden
            width={1000}
            height={1500}
            style={{ ...l2, y: yFloat }}
            className="tayo-float absolute -left-16 top-4 z-20 w-28 sm:-left-20 sm:w-36 lg:hidden"
          />
          {/* plates at the base */}
          <motion.img
            src="/images/hero-plate-1.webp"
            alt=""
            aria-hidden
            width={800}
            height={800}
            style={l4}
            className="tayo-float absolute -bottom-8 -left-12 z-20 w-24 rounded-full shadow-[0_16px_28px_rgba(0,0,0,0.4)] sm:w-28 lg:-left-16"
          />
          <motion.img
            src="/images/hero-plate-2.webp"
            alt=""
            aria-hidden
            width={800}
            height={800}
            style={l2}
            className="absolute -bottom-6 -right-8 z-20 w-20 rounded-full shadow-[0_16px_28px_rgba(0,0,0,0.4)] sm:w-24"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Daily favorites — bento grid with category chips (Figma 9:35)      */
/* ------------------------------------------------------------------ */

const FAVORITES: {
  tag: string;
  name: string;
  desc?: string;
  descFirst?: boolean;
  price: number;
  image: string;
  bg: string;
  imgSize: string;
  category: DishCategory;
}[] = [
  {
    tag: "Mains",
    name: "Bariis Iskukaris & hilib",
    desc: "Fragrant Somali spiced and roasted chicken",
    price: 8.5,
    image: "/images/bento-bariis.webp",
    bg: "bg-[#fff0e6]",
    imgSize: "h-44 w-44 sm:h-52 sm:w-52 lg:h-64 lg:w-64",
    category: "mains",
  },
  {
    tag: "Breakfast (Quraac)",
    name: "Canjeero & Beer",
    desc: "Somali flatbread & spiced liver",
    descFirst: true,
    price: 4.5,
    image: "/images/bento-canjeero.webp",
    bg: "bg-gradient-to-br from-[#fff2c8] to-[#fff0e6]",
    imgSize: "h-32 w-32 sm:h-[140px] sm:w-[140px]",
    category: "breakfast",
  },
  {
    tag: "Snacks",
    name: "Beef Sambuus",
    price: 1.5,
    image: "/images/dish-sambuus.webp",
    bg: "bg-gradient-to-br from-[#e4d9ff] to-[#f3eeff]",
    imgSize: "h-32 w-32 sm:h-[136px] sm:w-[136px]",
    category: "snacks",
  },
  {
    tag: "Drinks",
    name: "Fresh Mango Juice",
    price: 3.0,
    image: "/images/bento-mango.webp",
    bg: "bg-gradient-to-br from-[#c8f0d6] to-[#e6f9ed]",
    imgSize: "h-32 w-32 sm:h-[136px] sm:w-[136px]",
    category: "drinks",
  },
];

function AddButton({ name }: { name: string }) {
  return (
    <button
      aria-label={`Add ${name}`}
      className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-maroon text-cream shadow-[0_8px_18px_rgba(139,15,22,0.3)] transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden />
    </button>
  );
}

function DailyFavorites({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [cat, setCat] = useState<DishCategory | "all">("all");
  const shown = FAVORITES.filter((f) => cat === "all" || f.category === cat);

  return (
    <section className="relative bg-white py-16 md:py-24" aria-labelledby="favorites-title">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-0">
        <div className="max-w-[1330px]">
          <Reveal>
            <Eyebrow>Cunno Macaan</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="favorites-title"
              className="mt-2 font-display text-3xl font-bold tracking-[-0.01em] text-[#292521] sm:text-4xl md:text-[42px] md:leading-[1.15]"
            >
              Our Daily Favorites
            </h2>
          </Reveal>
        </div>

        {/* category chips — active maroon, others outlined (as designed) */}
        <Reveal delay={0.12}>
          <div className="no-scrollbar mt-8 flex gap-3 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  aria-pressed={active}
                  className={`h-10 shrink-0 rounded-full px-6 font-jakarta text-sm font-bold transition-colors duration-200 ${
                    active
                      ? "bg-maroon text-cream"
                      : "border-[1.5px] border-ink text-ink hover:bg-beige"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-6">
          {/* big card — photo overhangs the left edge, as designed */}
          {shown
            .filter((f) => f.category === "mains")
            .map((f) => (
              <RevealItem key={f.name} className="lg:col-span-2">
                <div
                  className={`group relative flex h-full min-h-[220px] flex-col justify-center rounded-3xl ${f.bg} p-6 transition-transform duration-500 sm:p-7 lg:min-h-[440px] lg:pl-[212px] lg:hover:-translate-y-1.5`}
                >
                  <div className="mx-auto mb-5 lg:absolute lg:-left-16 lg:top-1/2 lg:mb-0 lg:-translate-y-1/2">
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      width={560}
                      height={560}
                      className={`${f.imgSize} rounded-full object-cover shadow-[0_16px_28px_rgba(31,25,22,0.14)] transition-transform duration-500 group-hover:scale-[1.03]`}
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="font-jakarta text-xs font-bold uppercase tracking-[0.04em] text-stone2">
                      {f.tag}
                    </span>
                    <h3 className="mt-2 font-display text-[21px] font-bold leading-tight text-[#292521]">
                      {f.name}
                    </h3>
                    <p className="mt-3 font-jakarta text-[28px] font-bold leading-none text-price">
                      ${f.price.toFixed(2)}
                    </p>
                    {f.desc && (
                      <p className="mt-3 font-body text-base text-[#292521]">
                        {f.desc}
                      </p>
                    )}
                  </div>
                  <AddButton name={f.name} />
                </div>
              </RevealItem>
            ))}

          {/* right block — wide card over two half cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-4">
            {shown
              .filter((f) => f.category !== "mains")
              .map((f) => (
                <RevealItem
                  key={f.name}
                  className={f.category === "breakfast" ? "md:col-span-2" : ""}
                >
                  <div
                    className={`group relative flex h-full min-h-[200px] flex-col rounded-3xl ${f.bg} p-6 transition-transform duration-500 lg:min-h-[210px] lg:flex-row lg:items-start lg:hover:-translate-y-1.5`}
                  >
                    <div className="min-w-0 flex-1 lg:pt-6">
                      <span className="font-jakarta text-xs font-bold uppercase tracking-[0.04em] text-stone2">
                        {f.tag}
                      </span>
                      <h3 className="mt-2 font-display text-[21px] font-bold leading-tight text-[#292521]">
                        {f.name}
                      </h3>
                      {f.desc && f.descFirst && (
                        <p className="mt-2 max-w-[30ch] font-body text-base text-[#292521]">
                          {f.desc}
                        </p>
                      )}
                      <p className="mt-3 font-jakarta text-2xl font-bold leading-none text-price">
                        ${f.price.toFixed(2)}
                      </p>
                      {f.desc && !f.descFirst && (
                        <p className="mt-3 max-w-[30ch] font-body text-base text-[#292521]">
                          {f.desc}
                        </p>
                      )}
                    </div>
                    <div className="mx-auto mt-4 lg:mx-0 lg:mt-[-26px] lg:mr-12 lg:shrink-0">
                      <img
                        src={f.image}
                        alt={f.name}
                        loading="lazy"
                        width={560}
                        height={560}
                        className={`${f.imgSize} rounded-full object-cover shadow-[0_16px_28px_rgba(31,25,22,0.14)] transition-transform duration-500 group-hover:scale-[1.03]`}
                      />
                    </div>
                    <AddButton name={f.name} />
                  </div>
                </RevealItem>
              ))}
          </div>
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-10 lg:ml-[36%]">
            <button
              onClick={() => onNavigate("/menu")}
              className="inline-flex h-14 items-center justify-center rounded-full bg-cocoa px-10 font-jakarta text-base font-bold text-cream transition-transform duration-300 hover:scale-[1.03]"
            >
              View Full Menu
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  The Tayo Experience (Figma 12:2)                                   */
/* ------------------------------------------------------------------ */

function Experience() {
  return (
    <section className="bg-cream-2 py-16 md:py-24" aria-labelledby="experience-title">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-0">
        <div className="lg:pl-2">
          <Reveal>
            <Eyebrow>The Tayo Experience</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="experience-title"
              className="mt-2 font-display text-3xl font-bold tracking-[-0.01em] text-[#292521] sm:text-4xl md:text-[42px] md:leading-[1.15]"
            >
              More Than Just a Meal.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-lg font-body text-lg leading-relaxed text-stone2">
              From everyday lunches to relaxed gatherings, Tayo brings great food
              and a welcoming atmosphere together at Rugsan Mall.
            </p>
          </Reveal>
          <RevealGroup className="mt-9 space-y-5">
            {EXPERIENCE_POINTS.map((p) => (
              <RevealItem key={p} className="flex items-center gap-4">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-maroon" aria-hidden />
                <span className="font-body text-base text-ink">{p}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* rounded olive slab + overlapping photos, as designed */}
        <div className="relative mx-auto flex h-[340px] w-full max-w-[480px] items-center justify-center sm:h-[420px] lg:h-[480px]">
          <div
            aria-hidden
            className="absolute h-[290px] w-[290px] rounded-[35%] bg-olive sm:h-[380px] sm:w-[380px] lg:h-[440px] lg:w-[440px]"
          />
          <div
            aria-hidden
            className="absolute bottom-[2%] right-[2%] h-32 w-32 rounded-full bg-maroon sm:h-44 sm:w-44"
          />
          <Sparkle className="absolute -right-2 top-[4%] h-9 w-9 text-terra" />
          <Sparkle className="absolute -left-6 top-[2%] h-5 w-5 text-terra/90" />
          <img
            src="/images/dish-shaah.webp"
            alt="A glass of Somali shaah spiced tea"
            loading="lazy"
            width={800}
            height={800}
            className="tayo-float relative h-[220px] w-[220px] rounded-full object-cover shadow-[0_16px_24px_rgba(31,25,22,0.12)] sm:h-[280px] sm:w-[280px]"
            style={{ "--float-rot": "-3deg" } as React.CSSProperties}
          />
          <img
            src="/images/exp-sambusa.webp"
            alt="Golden beef sambuusas"
            loading="lazy"
            width={800}
            height={800}
            className="tayo-float absolute bottom-[8%] right-[7%] h-28 w-28 rounded-full object-cover shadow-[0_16px_24px_rgba(31,25,22,0.18)] sm:h-36 sm:w-36"
            style={
              { "--float-rot": "0deg", animationDelay: "1.2s" } as React.CSSProperties
            }
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Best sellers + testimonials (Figma 15:25)                          */
/* ------------------------------------------------------------------ */

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-gold-star text-gold-star" aria-hidden />
      ))}
    </div>
  );
}

function BestSellers() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="best-title">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10 lg:px-0">
        <div className="lg:pl-2">
          <Reveal>
            <Eyebrow>Signature Menu</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="best-title"
              className="mt-2 font-display text-3xl font-bold tracking-[-0.01em] text-[#292521] sm:text-4xl md:text-[42px] md:leading-[1.15]"
            >
              Best Selling Dishes
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* big house specialty card */}
            <RevealItem className="md:col-span-2">
              <div
                className={`group relative flex min-h-[280px] flex-col items-start gap-6 overflow-hidden rounded-3xl ${BEST_SELLERS[0].bg} p-7 transition-transform duration-500 sm:flex-row sm:items-center sm:p-8 lg:hover:-translate-y-1.5`}
              >
                <img
                  src={BEST_SELLERS[0].image}
                  alt={BEST_SELLERS[0].name}
                  loading="lazy"
                  width={560}
                  height={560}
                  className="h-44 w-44 shrink-0 rounded-full object-cover shadow-[0_16px_28px_rgba(31,25,22,0.14)] transition-transform duration-500 group-hover:scale-[1.03] sm:h-52 sm:w-52 lg:h-56 lg:w-56"
                />
                <div className="min-w-0">
                  <span className="font-jakarta text-xs font-bold uppercase tracking-[0.04em] text-stone2">
                    {BEST_SELLERS[0].tag}
                  </span>
                  <h3 className="mt-2 font-display text-[40px] font-bold leading-[1.1] text-[#292521]">
                    {BEST_SELLERS[0].name}
                  </h3>
                  <p className="mt-2 font-body text-base text-[#292521]">
                    {BEST_SELLERS[0].desc}
                  </p>
                  <p className="mt-4 font-jakarta text-[28px] font-bold leading-none text-price">
                    ${BEST_SELLERS[0].price.toFixed(2)}
                  </p>
                </div>
                <button
                  aria-label={`Add ${BEST_SELLERS[0].name}`}
                  className="absolute bottom-6 right-6 grid h-11 w-11 place-items-center rounded-full bg-maroon text-cream shadow-[0_8px_18px_rgba(139,15,22,0.3)] transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                </button>
              </div>
            </RevealItem>

            {BEST_SELLERS.slice(1).map((d) => (
              <RevealItem key={d.id}>
                <div
                  className={`group relative flex h-full min-h-[180px] items-center gap-4 overflow-hidden rounded-3xl ${d.bg} p-6 transition-transform duration-500 lg:hover:-translate-y-1.5`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-jakarta text-xs font-bold uppercase tracking-[0.04em] text-stone2">
                      {d.tag}
                    </span>
                    <h3 className="mt-1.5 font-display text-2xl font-bold text-[#292521]">
                      {d.name}
                    </h3>
                    <p className="mt-1 font-body text-base text-[#292521]">
                      {d.desc}
                    </p>
                    <p className="mt-2.5 font-jakarta text-xl font-bold leading-none text-price">
                      ${d.price.toFixed(2)}
                    </p>
                  </div>
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    width={560}
                    height={560}
                    className="h-[120px] w-[120px] shrink-0 rounded-full object-cover shadow-[0_16px_28px_rgba(31,25,22,0.14)] transition-transform duration-500 group-hover:scale-[1.03] sm:h-[132px] sm:w-[132px]"
                  />
                  <button
                    aria-label={`Add ${d.name}`}
                    className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-maroon text-cream shadow-[0_8px_18px_rgba(139,15,22,0.3)] transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                  </button>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* testimonials — white italic-quote cards (as designed) */}
        <div className="lg:pr-2">
          <Reveal>
            <Eyebrow>Community</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.01em] text-[#292521] sm:text-4xl md:text-[42px] md:leading-[1.15]">
              What They Say
            </h2>
          </Reveal>
          <RevealGroup className="mt-8 space-y-4">
            {TESTIMONIALS.map((t) => (
              <RevealItem key={t.name}>
                <figure className="rounded-2xl border border-[#e4dfd5] bg-white p-7 transition-transform duration-500 lg:hover:-translate-y-1">
                  <Stars />
                  <blockquote className="mt-4 font-body text-lg italic leading-relaxed text-ink">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center justify-between">
                    <span className="font-body text-sm font-bold text-ink">
                      {t.name}
                    </span>
                    <span className="font-body text-sm text-stone2">{t.time}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Tayo Hall teaser (Figma 15:79) — serif headline, olive CTA         */
/* ------------------------------------------------------------------ */

function HallTeaser({ onNavigate }: { onNavigate: (p: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yText = useTransform(scrollYProgress, [0, 1], [-20, 30]);

  return (
    <section className="bg-beige py-16 md:py-24" aria-labelledby="hall-teaser-title">
      <div
        ref={ref}
        className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-0"
      >
        <motion.div style={{ y: yImg }} className="relative mx-auto w-full max-w-xl lg:pl-2">
          {/* ghost offset frame behind, dashed gold frame on the photo */}
          <div
            aria-hidden
            className="absolute -left-5 -top-5 h-full w-full rounded-lg border border-gold opacity-40"
          />
          <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-[#c49a5a]">
            <img
              src="/images/hall-stage.jpg"
              alt="Tayo Hall dressed for a wedding with its illuminated arched stage"
              loading="lazy"
              width={1480}
              height={960}
              className="aspect-[37/24] w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div style={{ y: yText }} className="lg:pr-2">
          <Reveal>
            <Eyebrow>Celebrate at Tayo</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="hall-teaser-title"
              className="mt-3 font-elegant text-4xl leading-[1.15] text-[#292521] sm:text-5xl md:text-[46px]"
            >
              A Beautiful Setting for Your Special Day.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg font-jakarta text-lg leading-relaxed text-[#796d64]">
              Make your celebration memorable at Tayo Hall. A premier venue for
              weddings and special gatherings.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-wrap items-center gap-7">
              <button
                onClick={() => onNavigate("/hall")}
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-olive px-10 font-body text-base font-bold text-cream transition-transform duration-300 hover:scale-[1.03]"
              >
                Explore Tayo Hall
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
              <button
                onClick={() => onNavigate("/hall")}
                className="font-jakarta text-base font-bold text-[#292521] underline-offset-4 hover:underline"
              >
                Enquire About a Date
              </button>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Location & hours (Figma 15:98)                                     */
/* ------------------------------------------------------------------ */

function Location() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="location-title">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-0">
        <div className="lg:pl-2">
          <Reveal>
            <Eyebrow>Plan Your Visit</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="location-title"
              className="mt-2 font-display text-3xl font-bold tracking-[-0.01em] text-[#292521] sm:text-4xl md:text-[42px] md:leading-[1.15]"
            >
              Find us at Rugsan Mall
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 space-y-7">
            <RevealItem className="flex items-start gap-5">
              <MapPin
                className="mt-0.5 h-6 w-6 shrink-0 text-[#4a5340]"
                aria-hidden
              />
              <div>
                <p className="font-body text-base font-bold text-ink">Tayo Restaurant &amp; Hall</p>
                <p className="mt-1 font-body text-base leading-relaxed text-stone2">
                  Upper Level, Rugsan Mall
                  <br />
                  Mogadishu, Somalia
                </p>
              </div>
            </RevealItem>
            <RevealItem className="flex items-start gap-5">
              <Clock className="mt-0.5 h-6 w-6 shrink-0 text-[#4a5340]" aria-hidden />
              <div>
                <p className="font-body text-base font-bold text-ink">Opening Hours</p>
                <p className="mt-1 font-body text-base text-stone2">
                  {CONTACT_INFO.hoursHome}
                </p>
              </div>
            </RevealItem>
            <RevealItem className="flex items-start gap-5">
              <MessageCircle
                className="mt-0.5 h-6 w-6 shrink-0 text-[#4a5340]"
                aria-hidden
              />
              <div>
                <p className="font-body text-base font-bold text-ink">Get in Touch</p>
                <p className="mt-1 font-body text-base text-stone2">
                  Phone / WhatsApp: 061 9180005
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://maps.google.com/?q=Rugsan+Mall+Mogadishu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[50px] items-center justify-center rounded-full bg-[#4a5340] px-8 font-body text-base font-semibold text-cream transition-transform duration-300 hover:scale-[1.03]"
              >
                Get Directions
              </a>
              <a
                href="https://wa.me/252619180005"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[50px] items-center justify-center rounded-full border-2 border-[#4a5340] px-8 font-body text-base font-semibold text-[#4a5340] transition-colors duration-300 hover:bg-[#4a5340]/5"
              >
                WhatsApp Us
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative mx-auto w-full max-w-xl lg:pr-2">
          <div className="relative overflow-hidden rounded-md shadow-[0_24px_48px_rgba(42,34,30,0.15)]">
            <img
              src="/images/mall.jpg"
              alt="The entrance of Rugsan Mall, home of Tayo Restaurant"
              loading="lazy"
              width={1268}
              height={808}
              className="aspect-[634/404] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function HomeView({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <DailyFavorites onNavigate={onNavigate} />
      <Experience />
      <BestSellers />
      <HallTeaser onNavigate={onNavigate} />
      <Location />
    </>
  );
}
