"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Snowflake, Timer, EggFried, Truck } from "lucide-react";

const ITEMS = [
  {
    icon: Timer,
    k: "30-minute replies",
    v: "A human reads every message between 11 AM and 11 PM, seven days a week.",
  },
  {
    icon: Snowflake,
    k: "Same-morning build",
    v: "Sculpting, piping and finishing all happen the day your cake is collected.",
  },
  {
    icon: EggFried,
    k: "Eggless & low-sugar",
    v: "Every flavour on the bench can be reworked — just say the word when you enquire.",
  },
  {
    icon: Truck,
    k: "Chilled Lahore delivery",
    v: "Boxed in tier-safe cartons and driven cold across the city, doorstep handover.",
  },
];

export function TrustRow() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="How Cake Spot works" className="border-b border-ink/8 bg-cream py-10 md:py-12">
      <div className="container-x grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it, i) => (
          <motion.div
            key={it.k}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            className="group flex gap-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
              <it.icon size={16} strokeWidth={1.5} />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-[17px] leading-tight text-ink">{it.k}</span>
              <span className="mt-1.5 max-w-[34ch] text-[13.5px] leading-relaxed text-slate-warm">
                {it.v}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
