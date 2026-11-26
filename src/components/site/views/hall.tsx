"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Armchair,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  BOOKED_DATES,
  EVENT_TYPES,
  HERITAGE_FEATURES,
  HALL_FEATURES,
} from "@/lib/site-data";
import { Eyebrow, Reveal, RevealGroup, RevealItem, Sparkle } from "@/components/site/reveal";

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function HallHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 170]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#700b12]"
      aria-label="Tayo Hall venue"
    >
      {/* gold field — diagonal boundary on the right, as designed */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: "polygon(58% 0, 100% 0, 100% 100%, 36% 100%)",
          background:
            "linear-gradient(205deg, #e3c27e 0%, #dbb670 35%, #ba9054 100%)",
        }}
      />
      {/* maroon field — lighter radial centre-left, clipped to the seam */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: "polygon(0 0, 58% 0, 36% 100%, 0 100%)",
          background:
            "radial-gradient(900px 620px at 28% 40%, #9e1620 0%, #830d17 48%, #670a11 82%)",
        }}
      />
      <img
        src="/images/hall-glitter.webp"
        alt=""
        aria-hidden
        width={900}
        height={900}
        className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen"
      />
      <img
        src="/images/hall-coin.webp"
        alt=""
        aria-hidden
        width={800}
        height={800}
        className="tayo-float absolute left-[4%] top-[12%] w-12 opacity-90 md:w-16"
      />
      <Sparkle className="absolute left-[30%] top-[16%] hidden h-4 w-4 text-gold-bright/80 lg:block" />
      <Sparkle className="absolute bottom-[18%] left-[38%] hidden h-3.5 w-3.5 text-cream/60 lg:block" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-8 px-5 py-12 md:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:px-0 lg:py-10">
        <div className="text-center lg:text-left lg:pl-[42px]">
          <Reveal>
            <Eyebrow tone="gold">Mogadishu&apos;s Premier Venue</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-3 font-elegant text-4xl leading-[1.15] text-cream sm:text-5xl md:text-[38px] md:leading-[1.18]">
              An Elegant Setting
              <span className="block">for Your Special Day.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-3.5 max-w-md font-body text-[13px] leading-relaxed text-cream/85 sm:text-sm lg:mx-0">
              Celebrate your most cherished moments in a beautiful, versatile
              space designed for unforgettable weddings, corporate events, and
              private gatherings.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#booking"
                className="inline-flex h-9 items-center rounded-full bg-gradient-to-b from-[#f2c14e] to-[#d9992b] px-6 font-body text-[13px] font-bold text-cocoa shadow-[0_8px_22px_rgba(120,80,10,0.4)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Check Availability
              </a>
              <a
                href="#heritage"
                className="inline-flex h-9 items-center rounded-full border-[1.5px] border-cream/70 px-6 font-body text-[13px] font-bold text-cream transition-colors duration-300 hover:bg-cream hover:text-maroon"
              >
                View Gallery
              </a>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ y: yPhoto }}
          className="relative mx-auto w-full max-w-[440px]"
        >
          {/* landscape stage photo in a soft rounded frame, as designed */}
          <div className="overflow-hidden rounded-[26px] shadow-[0_28px_56px_rgba(60,35,5,0.45)]">
            <img
              src="/images/hall-hero.jpg"
              alt="Tayo Hall set for a grand wedding reception"
              width={1000}
              height={640}
              className="aspect-[16/9.5] w-full object-cover"
            />
          </div>
          {/* rose petal at the photo's lower left, as designed */}
          <img
            src="/images/hall-food.webp"
            alt=""
            aria-hidden
            width={700}
            height={700}
            className="tayo-float absolute -bottom-4 -left-4 w-12 drop-shadow-[0_10px_16px_rgba(60,10,10,0.4)]"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Heritage gallery                                                   */
/* ------------------------------------------------------------------ */

const FEATURE_ICONS = {
  feast: UtensilsCrossed,
  seating: Armchair,
  users: Users,
  chef: UtensilsCrossed,
  sparkles: Sparkles,
} as const;

function Heritage() {
  return (
    <section
      id="heritage"
      className="bg-cream py-16 md:py-24"
      aria-labelledby="heritage-title"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-5 lg:grid-cols-2 lg:gap-12 lg:px-0">
        {/* stacked photos */}
        <div className="relative mx-auto w-full max-w-[500px]">
          <div className="relative rounded-xl p-2">
            <div className="overflow-hidden rounded-xl shadow-[0_24px_48px_rgba(42,34,30,0.16)]">
              <img
                src="/images/hall-interior.jpg"
                alt="Inside Tayo Hall with its illuminated arched stage"
                loading="lazy"
                width={900}
                height={506}
                className="aspect-[16/7.5] w-full object-cover"
              />
            </div>
            <Sparkle
              className="absolute -left-7 -top-6 h-7 w-7 text-gold"
            />
            <Sparkle
              className="absolute -left-2 top-5 h-4 w-4 text-gold/70"
            />
          </div>
          {/* wedding couple — dashed gold frame, overlapping lower right */}
          <div className="absolute -bottom-12 -right-3 w-48 rotate-2 rounded-[14px] border-[1.5px] border-dashed border-gold bg-cream p-1.5 shadow-[0_18px_40px_rgba(42,34,30,0.25)] sm:-right-8 sm:w-[248px]">
            <img
              src="/images/hall-wedding.webp"
              alt="A newlywed couple celebrating at Tayo Hall"
              loading="lazy"
              width={900}
              height={620}
              className="aspect-[16/10] w-full rounded-[10px] object-cover"
            />
          </div>
          <Sparkle
            className="absolute -right-2 bottom-16 hidden h-4 w-4 text-gold/80 sm:block"
          />
        </div>

        <div>
          <Reveal>
            <Eyebrow tone="gold">Honoring Our Heritage</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="heritage-title"
              className="mt-3 font-elegant text-3xl leading-[1.2] text-[#292521] sm:text-4xl md:text-[36px]"
            >
              A Venue That Understands Somali Traditions.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-lg font-body text-[13.5px] leading-relaxed text-stone3 sm:text-sm">
              From the vibrant colors of the decor to the warmth of true Somali
              hospitality, Tayo Hall is designed to host authentic, joyous
              celebrations. We take pride in our roots.
            </p>
          </Reveal>
          <RevealGroup className="mt-7 space-y-5">
            {HERITAGE_FEATURES.map((f) => {
              const Icon = FEATURE_ICONS[f.icon as keyof typeof FEATURE_ICONS];
              return (
                <RevealItem key={f.title} className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[1.5px] border-gold/70 bg-cream text-olive">
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <div>
                    <p className="font-body text-[14px] font-bold text-ink">
                      {f.title}
                    </p>
                    <p className="mt-0.5 font-body text-[12.5px] leading-relaxed text-stone2">
                      {f.desc}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Booking calendar                                                   */
/* ------------------------------------------------------------------ */

const WEEKDAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function Calendar() {
  // start on November 2026 like the design
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(10); // 0-indexed → November
  const [selected, setSelected] = useState<number | null>(14);
  const cells = useMemo(() => {
    const first = new Date(year, month, 1).getDay(); // 0 = Sunday
    const count = new Date(year, month + 1, 0).getDate();
    const arr: (number | null)[] = Array(first).fill(null);
    for (let d = 1; d <= count; d++) arr.push(d);
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [year, month]);

  const step = (dir: 1 | -1) => {
    let m = month + dir;
    let y = year;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setMonth(m);
    setYear(y);
    setSelected(null);
  };

  const isBooked = (d: number) =>
    year === 2026 && month === 10 && BOOKED_DATES.has(d);

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_24px_56px_rgba(42,34,30,0.12)] sm:p-6">
      <div>
        <h3 className="font-display text-lg font-bold text-[#292521]">
          Select a Date
        </h3>
        <p className="mt-1 font-body text-[12.5px] text-stone2">
          Choose your preferred event date to check availability.
        </p>
      </div>

      <div className="mt-4 border-t border-ink/10 pt-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => step(-1)}
            aria-label="Previous month"
            className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 text-stone2 transition-colors hover:border-maroon hover:text-maroon"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${year}-${month}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="font-display text-base font-bold text-[#292521]"
            >
              {MONTH_NAMES[month]} {year}
            </motion.p>
          </AnimatePresence>
          <button
            onClick={() => step(1)}
            aria-label="Next month"
            className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 text-stone2 transition-colors hover:border-maroon hover:text-maroon"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-0.5 text-center">
          {WEEKDAYS.map((d) => (
            <span
              key={d}
              className="py-1 font-display text-[10px] font-extrabold uppercase tracking-wider text-stone3"
            >
              {d}
            </span>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <span key={`pad-${i}`} aria-hidden />;
            const booked = isBooked(d);
            const isSelected = selected === d;
            return (
              <button
                key={`${year}-${month}-${d}`}
                disabled={booked}
                onClick={() => setSelected(d)}
                aria-label={
                  booked
                    ? `${d} ${MONTH_NAMES[month]} — booked`
                    : `${d} ${MONTH_NAMES[month]}`
                }
                aria-pressed={isSelected}
                className={`relative mx-auto grid h-8 w-8 place-items-center rounded-full font-body text-[13px] transition-all duration-200 ${
                  booked
                    ? "cursor-not-allowed text-stone3/50 line-through decoration-[1.5px]"
                    : isSelected
                      ? "scale-105 bg-maroon font-display font-bold text-cream shadow-[0_8px_18px_rgba(139,15,22,0.4)]"
                      : "text-ink hover:bg-beige"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <label htmlFor="event-type" className="sr-only">
          Select event type
        </label>
        <select
          id="event-type"
          defaultValue=""
          className="w-full appearance-none rounded-xl border border-ink/15 bg-cream px-4 py-2.5 font-body text-[13px] text-ink outline-none transition-colors focus:border-gold"
        >
          <option value="" disabled>
            Select Event Type (e.g., Wedding, Corporate)
          </option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (selected === null) {
              toast.error("Please pick a date first");
              return;
            }
            const type = (
              document.getElementById("event-type") as HTMLSelectElement | null
            )?.value;
            toast.success("Enquiry ready!", {
              description: `${type || "Your event"} on ${MONTH_NAMES[month]} ${selected}, ${year} — call 061 9180005 to confirm with our team.`,
            });
          }}
          className="w-full rounded-full bg-maroon py-3 font-jakarta text-sm font-bold text-cream shadow-[0_10px_24px_rgba(139,15,22,0.3)] transition-transform duration-300 hover:scale-[1.02] hover:bg-maroon-deep"
        >
          Continue Enquiry
        </button>
        <div className="flex items-center justify-center gap-5 pt-0.5 font-body text-[11px] text-stone3">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-gold-bright to-[#d47c20]" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border border-ink/25" />
            Booked
          </span>
        </div>
      </div>
    </div>
  );
}

function Booking() {
  return (
    <section id="booking" className="bg-cream py-16 md:py-24" aria-labelledby="booking-title">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-0">
        <div className="lg:pl-2">
          <Reveal>
            <Eyebrow tone="gold">Reserve Your Date</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="booking-title"
              className="mt-2 font-display text-3xl font-bold tracking-[-0.01em] text-[#292521] sm:text-4xl md:text-[38px] md:leading-[1.15]"
            >
              Plan Your Perfect Event With Us.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-lg font-body text-[13.5px] leading-relaxed text-stone3 sm:text-sm">
              Whether it is a grand wedding reception or an intimate corporate
              gathering, Tayo Hall provides the space, catering, and ambiance you
              need.
            </p>
          </Reveal>
          <RevealGroup className="mt-7 space-y-5">
            {HALL_FEATURES.map((f) => {
              const Icon = FEATURE_ICONS[f.icon as keyof typeof FEATURE_ICONS];
              return (
                <RevealItem key={f.title} className="flex items-start gap-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#e9cf8d] to-[#c49a5a] text-white shadow-[0_6px_14px_rgba(160,110,30,0.3)]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-body text-[14px] font-bold text-ink">
                      {f.title}
                    </p>
                    <p className="mt-0.5 font-body text-[12.5px] text-stone2">{f.desc}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <Reveal delay={0.1}>
          <Calendar />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function HallView() {
  return (
    <>
      <HallHero />
      <Heritage />
      <Booking />
    </>
  );
}
