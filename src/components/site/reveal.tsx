"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-up reveal on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** Parent that staggers RevealItem children when scrolled into view. */
export function RevealGroup({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/** Small uppercase eyebrow label — DM Sans Bold 14px, tight tracking.
 *  The design shows plain maroon eyebrows with no rule line; the hero
 *  uses a gold variant with a short dash on the left. */
export function Eyebrow({
  children,
  tone = "red",
  center = false,
  rule = false,
  className = "",
}: {
  children: ReactNode;
  tone?: "red" | "gold" | "cream" | "olive";
  center?: boolean;
  rule?: boolean;
  className?: string;
}) {
  const color =
    tone === "gold"
      ? "text-gold-bright"
      : tone === "cream"
        ? "text-cream/90"
        : tone === "olive"
          ? "text-olive"
          : "text-maroon";
  return (
    <div
      className={`flex items-center gap-3 ${center ? "justify-center" : ""} ${className}`}
    >
      {rule && (
        <span className={`h-px w-6 bg-current opacity-80 ${color}`} aria-hidden />
      )}
      <span
        className={`font-body text-sm font-bold uppercase tracking-[0.02em] ${color}`}
      >
        {children}
      </span>
    </div>
  );
}

/** Four-point sparkle star — the accent motif used across the design. */
export function Sparkle({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.8-11.1 5.4-12 12-.9-6.6-4.5-10.2-12-12C7.5 10.2 11.1 6.6 12 0z" />
    </svg>
  );
}

export { motion };
