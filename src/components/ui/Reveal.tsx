"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Scroll-triggered fade + soft upward translate. Fires once. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  duration = 0.7,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Line-mask typography reveal: each line slides up out of its own clip. */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.14,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={reduce ? { y: 0, opacity: 1 } : { y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Generic staggered parent for small groups. */
export function Stagger({
  children,
  className,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Editorial section header: kicker, serif title, optional lede. */
export function SectionHead({
  kicker,
  title,
  lede,
  align = "left",
  tone = "ink",
  id,
}: {
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "cream";
  id?: string;
}) {
  const isCream = tone === "cream";
  return (
    <div
      id={id}
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <Reveal>
        <span
          className={`inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] ${
            isCream ? "text-gold-soft" : "text-gold"
          }`}
        >
          <span className={`h-px w-8 ${isCream ? "bg-gold-soft/60" : "bg-gold/60"}`} />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className={`max-w-[22ch] text-[clamp(1.95rem,5.2vw,3.5rem)] leading-[1.04] ${
            isCream ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={0.12}>
          <p
            className={`max-w-[54ch] text-[15px] leading-relaxed md:text-[16.5px] ${
              isCream ? "text-cream/65" : "text-slate-warm"
            }`}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
