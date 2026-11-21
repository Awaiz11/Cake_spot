"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { BRAND, REVIEWS, type Review } from "@/lib/data";
import { Reveal, SectionHead } from "./ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/* 570 reviews · weighted average = 4.9 */
const DISTANCE = [
  { stars: 5, pct: 94, count: 536 },
  { stars: 4, pct: 5, count: 28 },
  { stars: 3, pct: 1, count: 6 },
  { stars: 2, pct: 0, count: 0 },
  { stars: 1, pct: 0, count: 0 },
];

export function Reviews() {
  const [feature, ...rest] = REVIEWS;
  return (
    <section id="reviews" className="relative scroll-mt-24 overflow-hidden bg-cream py-20 md:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-8 top-24 hidden select-none font-script text-[190px] leading-none text-ink/[0.04] lg:block"
      >
        thank you
      </span>
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHead
              kicker="Customer love"
              title={
                <>
                  4.9 stars across
                  <br />
                  570+ <span className="italic">honest</span> reviews
                </>
              }
              lede="Birthdays, anniversaries, corporate runs and last-minute rescues — this is what Lahore writes back after the candles are out."
            />
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="border border-ink/12 bg-[#FFFCF7] p-6 md:p-7">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <span className="font-display text-[58px] leading-none text-ink md:text-[68px]">
                      {BRAND.rating}
                    </span>
                    <span className="mb-2 ml-1 text-[15px] text-slate-warm">/ 5</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="flex gap-[3px]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.07 }}
                        >
                          <Star size={16} className="fill-gold text-gold" strokeWidth={0} />
                        </motion.span>
                      ))}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-warm">
                      {BRAND.reviewCount}+ reviews on Google
                    </span>
                  </div>
                </div>

                <ul className="mt-6 space-y-2">
                  {DISTANCE.map((d, i) => (
                    <li key={d.stars} className="flex items-center gap-3">
                      <span className="w-8 shrink-0 text-[11px] text-slate-warm">{d.stars}★</span>
                      <span className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-ink/8">
                        <motion.span
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: d.pct / 100 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.07 }}
                          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gold/85"
                        />
                      </span>
                      <span className="w-12 shrink-0 text-right text-[11px] tabular-nums text-slate-warm">
                        {d.count}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold"
                >
                  See unedited customer posts
                  <span aria-hidden className="text-gold">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* featured pull-quote */}
        <Reveal delay={0.1}>
          <figure className="mt-16 grid gap-8 border-y border-ink/12 py-10 md:mt-20 md:grid-cols-12 md:py-14">
            <figcaption className="md:col-span-3">
              <Quote size={26} className="text-gold" strokeWidth={1.4} />
              <p className="mt-5 font-display text-[22px] leading-tight text-ink">
                {feature.name}
              </p>
              <p className="mt-1.5 text-[12px] uppercase tracking-[0.16em] text-slate-warm">
                {feature.area}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-oat px-3 py-1.5 text-[10.5px] uppercase tracking-[0.16em] text-ink">
                {feature.occasion}
              </p>
            </figcaption>
            <blockquote className="md:col-span-9">
              <p className="text-balance font-display text-[24px] leading-[1.36] text-ink sm:text-[30px] md:text-[34px] md:leading-[1.3]">
                “{feature.quote}”
              </p>
            </blockquote>
          </figure>
        </Reveal>

        {/* pull-quote grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((r, i) => (
            <ReviewCard key={r.name} r={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ r, index }: { r: Review; index: number }) {
  const reduce = useReducedMotion();
  return (
    <Reveal delay={index * 0.07} className="h-full">
      <figure
        className={`group flex h-full flex-col justify-between border border-ink/10 bg-[#FFFCF7] p-6 transition-all duration-500 ${
          reduce ? "" : "hover:-translate-y-1 hover:border-gold/55 hover:shadow-[0_30px_60px_-45px_rgba(22,34,46,0.6)]"
        }`}
      >
        <div>
          <span className="flex gap-[3px]">
            {Array.from({ length: r.rating }).map((_, i) => (
              <Star key={i} size={12} className="fill-gold text-gold" strokeWidth={0} />
            ))}
          </span>
          <span className="mt-5 block font-display text-[42px] leading-[0.4] text-gold/45">”</span>
          <blockquote className="mt-5 text-[15px] leading-[1.72] text-ink">{r.quote}</blockquote>
        </div>
        <figcaption className="mt-7 flex items-baseline justify-between gap-3 border-t border-ink/10 pt-4">
          <span className="font-display text-[17px] text-ink">{r.name}</span>
          <span className="text-right text-[10.5px] uppercase tracking-[0.14em] text-slate-warm">
            {r.area} · {r.occasion}
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}
