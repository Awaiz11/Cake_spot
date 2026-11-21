"use client";

import { FLAVOUR_NAMES } from "@/lib/data";

const ROW = [...FLAVOUR_NAMES, ...FLAVOUR_NAMES];

export function FlavourTicker() {
  return (
    <section aria-label="Cake flavours" className="border-y border-ink-line/60 bg-ink py-4 md:py-5">
      <div className="marquee-mask group overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-8 group-hover:[animation-play-state:paused] md:gap-11">
          {ROW.map((f, i) => (
            <span key={`${f}-${i}`} className="flex items-center gap-8 whitespace-nowrap md:gap-11">
              <span className="text-[12px] uppercase tracking-[0.24em] text-cream/72 md:text-[13px]">
                {f}
              </span>
              <span aria-hidden className="h-[5px] w-[5px] rotate-45 bg-gold/85" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
