"use client";

import { useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu as MenuIcon, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, CONTACT_INFO } from "@/lib/site-data";

/* ------------------------------------------------------------------ */
/*  Navbar — rebuilt 1:1 from the Figma header (node 1:12)             */
/*                                                                     */
/*  Design spec (1440px frame):                                        */
/*  · bar 80px tall, #FFF9F0 @ 85% + 4px backdrop blur, warm hairline  */
/*  · brand: "TAYO" Manrope ExtraBold 26 maroon, side-by-side          */
/*    "RESTAURANT & HALL" Manrope Bold 14 olive — no logo mark         */
/*  · links: Manrope SemiBold 15, gap 40, centered; active = #720F18   */
/*  · CTA: 200×40 dark pill #1F1916, DM Sans SemiBold 14, phone icon   */
/*  · gutters: 80px at 1440 (content column = 1280px)                  */
/* ------------------------------------------------------------------ */

export function Navbar({
  current,
  onNavigate,
}: {
  current: string;
  onNavigate: (path: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  const go = (path: string) => {
    setOpen(false);
    onNavigate(path);
  };

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`tayo-header-bar fixed inset-x-0 top-0 z-50 border-b border-[#e9e2d6] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_6px_20px_rgba(31,25,22,0.06)]" : ""
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-maroon focus:px-3 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>

      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 md:h-20 lg:px-0"
      >
        {/* Brand — plain type lockup, exactly as the design */}
        <button
          onClick={() => go("/")}
          className="group flex items-baseline gap-5 text-left"
          aria-label="Tayo Restaurant & Hall — home"
        >
          <span className="font-display text-[23px] font-extrabold leading-none tracking-[-0.01em] text-maroon md:text-[26px]">
            TAYO
          </span>
          <span className="hidden font-display text-[11px] font-bold leading-none tracking-[0.06em] text-olive sm:inline md:text-[12px]">
            RESTAURANT &amp; HALL
          </span>
        </button>

        {/* Center links — plain text, active = colour only (no underline) */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = current === link.path;
            return (
              <button
                key={link.path}
                onClick={() => go(link.path)}
                aria-current={active ? "page" : undefined}
                className={`font-display text-[15px] font-semibold transition-colors duration-200 ${
                  active
                    ? "text-red-dark"
                    : "text-ink hover:text-maroon"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Call CTA + mobile trigger */}
        <div className="flex items-center gap-2.5">
          <a
            href="tel:0619180005"
            className="hidden h-10 items-center gap-2 rounded-full bg-cocoa px-5 text-cream transition-transform duration-200 hover:scale-[1.03] sm:inline-flex"
          >
            <Phone className="h-[17px] w-[17px]" aria-hidden strokeWidth={2} />
            <span className="font-body text-sm font-semibold leading-none">
              {CONTACT_INFO.phoneNav}
            </span>
          </a>
          {/* compact icon CTA on phones — the design keeps the call action visible */}
          <a
            href="tel:0619180005"
            aria-label="Call 061 9180005"
            className="grid h-10 w-10 place-items-center rounded-full bg-cocoa text-cream transition-transform duration-200 active:scale-95 sm:hidden"
          >
            <Phone className="h-[17px] w-[17px]" aria-hidden strokeWidth={2} />
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-white/60 text-ink transition-colors hover:bg-beige lg:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[86vw] max-w-[400px] overflow-hidden border-[#e9e2d6] bg-cream p-0 sm:max-w-[400px] [&>button]:top-5 [&>button]:right-5 [&>button]:text-olive"
            >
              <div className="flex h-full flex-col">
                <div className="px-7 pb-6 pt-8">
                  <SheetTitle className="flex items-baseline gap-2.5">
                    <span className="font-display text-[26px] font-extrabold leading-none text-maroon">
                      TAYO
                    </span>
                    <span className="font-display text-sm font-bold leading-none text-olive">
                      RESTAURANT &amp; HALL
                    </span>
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation menu for Tayo Restaurant and Hall
                  </SheetDescription>
                  <div className="mt-5 border-t border-dashed border-gold/50" />
                </div>

                <nav
                  aria-label="Mobile navigation"
                  className="relative flex-1 px-7 pb-4"
                >
                  {NAV_LINKS.map((link, i) => {
                    const active = current === link.path;
                    return (
                      <motion.button
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.06 + i * 0.05,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onClick={() => go(link.path)}
                        aria-current={active ? "page" : undefined}
                        className="group flex w-full items-center justify-between py-[13px] text-left"
                      >
                        <span
                          className={`font-display text-[26px] font-extrabold leading-tight tracking-[-0.01em] transition-colors ${
                            active
                              ? "text-red-dark"
                              : "text-ink group-hover:text-maroon"
                          }`}
                        >
                          {link.label}
                        </span>
                        {active && (
                          <span
                            className="h-2 w-2 shrink-0 rounded-full bg-gold-bright"
                            aria-hidden
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>

                {/* ghost watermark — echoes the footer motif */}
                <div
                  aria-hidden
                  className="tayo-watermark pointer-events-none absolute -bottom-8 right-0 select-none text-[150px] leading-none text-watermark/[0.07]"
                >
                  TAYO
                </div>

                <div className="relative px-7 pb-9">
                  <div className="mb-5 border-t border-dashed border-gold/50" />
                  <a
                    href="tel:0619180005"
                    className="flex h-12 items-center justify-center gap-2.5 rounded-full bg-cocoa text-cream"
                  >
                    <Phone className="h-[17px] w-[17px]" aria-hidden />
                    <span className="font-body text-sm font-semibold">
                      {CONTACT_INFO.phoneNav}
                    </span>
                  </a>
                  <p className="mt-4 font-body text-xs leading-relaxed text-stone2">
                    {CONTACT_INFO.hours}
                    <br />
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer — olive band, side-by-side brand, giant Jakarta watermark   */
/*  (Figma node 15:123 — 120px gutters, watermark 280px, full opacity) */
/* ------------------------------------------------------------------ */

export function Footer({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <footer className="relative mt-auto overflow-hidden bg-olive-deep text-cream">
      {/* giant watermark — Plus Jakarta Bold, #2A221E, overlapping the rule */}
      <div
        aria-hidden
        className="tayo-watermark absolute inset-x-0 top-14 select-none text-center text-[26vw] text-watermark md:top-10 md:text-[280px]"
      >
        TAYO
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 pb-8 pt-14 sm:px-8 md:pt-24 lg:px-0">
        <div className="grid gap-10 md:grid-cols-[1.7fr_1fr_1fr_1fr] md:gap-6">
          <div>
            <p className="flex items-baseline gap-2.5">
              <span className="font-display text-[28px] font-extrabold leading-none text-maroon md:text-[32px]">
                TAYO
              </span>
              <span className="font-display text-[13px] font-extrabold leading-none text-cream">
                RESTAURANT &amp; HALL
              </span>
            </p>
            <p className="mt-5 max-w-xs font-body text-base leading-relaxed text-cream/90">
              Good Food. Great Moments.
              <br />
              Rugsan Mall, Mogadishu.
            </p>
          </div>
          {[
            {
              title: "RESTAURANT",
              links: [
                { label: "Cafeteria Menu", path: "/menu" },
                { label: "Daily Favorites", path: "/menu" },
                { label: "The Tayo Experience", path: "/" },
              ],
            },
            {
              title: "TAYO HALL",
              links: [
                { label: "Venue Overview", path: "/hall" },
                { label: "Weddings & Events", path: "/hall" },
                { label: "Book the Hall", path: "/hall" },
              ],
            },
            {
              title: "CONNECT",
              links: [
                {
                  label: "WhatsApp Us",
                  href: "https://wa.me/252619180005",
                },
                { label: "Instagram", href: "https://instagram.com" },
                { label: "Facebook", href: "https://facebook.com" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-display text-base font-bold text-terra">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l) =>
                  "path" in l ? (
                    <li key={l.label}>
                      <button
                        onClick={() => onNavigate(l.path!)}
                        className="font-body text-base text-[#E4DFD5] transition-colors hover:text-gold-bright"
                      >
                        {l.label}
                      </button>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-body text-base text-[#E4DFD5] transition-colors hover:text-gold-bright"
                      >
                        {l.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[#3a302c] pt-6">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="font-body text-sm text-[#8C827A]">
              © 2026 Tayo Restaurant &amp; Hall. All rights reserved.
            </p>
            <p className="font-body text-sm text-[#8C827A]">
              Site designed by Nuvora Digital
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
