"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { OCCASION_BY_CATEGORY, SPECIALTIES, photo } from "@/lib/data";
import { useOrder } from "@/lib/order-store";
import { CakeImage } from "./ui/CakeImage";
import { Reveal, SectionHead } from "./ui/Reveal";

export function Specialties() {
  const { requestOrder } = useOrder();

  return (
    <section id="specialties" className="relative scroll-mt-24 py-20 md:py-28 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            kicker="What we're known for"
            title={
              <>
                Four things Lahore
                <br />
                keeps ordering
              </>
            }
            lede="Everything is made to order, but these four have a real following. Pick a direction and we'll shape it around your occasion, your palette and your budget."
          />
          <Reveal delay={0.1}>
            <p className="max-w-[24ch] border-l border-gold/50 pl-5 font-script text-[26px] leading-[1.15] text-ink md:text-[30px]">
              “Send the photo — we&apos;ll tell you honestly if we can beat it.”
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {SPECIALTIES.map((s, i) => (
            <SpecialtyCard
              key={s.key}
              s={s}
              index={i}
              onRequest={() =>
                requestOrder(
                  {
                    occasion: OCCASION_BY_CATEGORY[s.category] ?? "Other",
                    message: `I'm after the "${s.name}" style from your page. Here's what I'm thinking: `,
                    style: s.name,
                  },
                  "order",
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecialtyCard({
  s,
  index,
  onRequest,
}: {
  s: (typeof SPECIALTIES)[number];
  index: number;
  onRequest: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="group flex h-full flex-col">
        <div className="relative">
          <span
            aria-hidden
            className="absolute inset-x-0 -top-2 z-20 h-px origin-left scale-x-0 bg-gold transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
          />
          <CakeImage
            src={photo(s.photoId, s.ext, 700)}
            alt={`${s.name} by Cake Spot`}
            sizes="(min-width:1024px) 24vw, (min-width:640px) 46vw, 92vw"
            className="aspect-[4/5] w-full"
            imgClassName={`transition-transform duration-500 ease-out ${
              reduce ? "" : "group-hover:scale-[1.04]"
            }`}
          />
          <span className="pointer-events-none absolute inset-0 border border-ink/10" />
          <span className="absolute left-0 top-4 -translate-y-1/2 bg-cream px-3 py-1 font-display text-[13px] tracking-[0.1em] text-gold">
            0{index + 1}
          </span>
        </div>

        <div className="mt-5 flex flex-1 flex-col">
          <h3 className="text-[22px] leading-tight text-ink md:text-[24px]">{s.name}</h3>
          <p className="mt-1.5 font-script text-[21px] leading-none text-gold md:text-[23px]">
            {s.line}
          </p>
          <p className="mt-4 flex-1 text-[14.5px] leading-[1.72] text-slate-warm">{s.blurb}</p>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
            <span className="text-[10.5px] uppercase tracking-[0.2em] text-slate-warm">{s.meta}</span>
            <motion.button
              onClick={onRequest}
              whileTap={reduce ? {} : { scale: 0.97 }}
              className="inline-flex min-h-[44px] items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold"
            >
              Request This Style
              <ArrowRight
                size={14}
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </motion.button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
