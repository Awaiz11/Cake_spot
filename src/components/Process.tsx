"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PROCESS } from "@/lib/data";
import { Reveal, SectionHead } from "./ui/Reveal";
import { useOrder } from "@/lib/order-store";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const { requestOrder } = useOrder();

  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden bg-cream py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          kicker="How custom ordering works"
          title={
            <>
              Three messages,
              <br />
              then it&apos;s in the oven
            </>
          }
          lede="No cart, no checkout, no waiting on an email that never comes. Here's exactly how a cake gets from your head to the table."
        />

        <div ref={ref} className="relative mt-16">
          {/* connector that draws itself as you scroll */}
          <span aria-hidden className="absolute left-0 top-[42px] hidden h-px w-full bg-ink/10 lg:block">
            <motion.span
              className="block h-px origin-left bg-gold"
              style={reduce ? { width: "100%" } : { width: line }}
            />
          </span>

          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.12}>
                <li className="group relative flex flex-col">
                  <span className="relative z-10 flex h-[86px] w-[86px] items-center justify-center rounded-full border border-ink/12 bg-cream transition-colors duration-500 group-hover:border-gold">
                    <span className="font-display text-[30px] leading-none text-ink transition-colors duration-500 group-hover:text-gold">
                      {p.n}
                    </span>
                  </span>
                  <h3 className="mt-7 max-w-[24ch] text-[22px] leading-[1.22] text-ink md:text-[25px]">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-[42ch] text-[14.5px] leading-[1.75] text-slate-warm">
                    {p.body}
                  </p>
                  <span className="mt-6 flex items-center gap-2.5 border-t border-ink/10 pt-4 text-[10.5px] uppercase tracking-[0.2em] text-slate-warm">
                    <span className="h-[5px] w-[5px] rotate-45 bg-gold" />
                    {p.meta}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-start gap-5 border-y border-ink/10 bg-oat/50 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="max-w-[58ch] text-[14.5px] leading-relaxed text-ink">
              <span className="font-display text-[19px]">Booking 5+ days ahead</span> is ideal for
              sculpted themes — but we hold two express slots every day for genuine last-minute
              plans.
            </p>
            <button
              onClick={() => requestOrder({ message: "I need a cake fast — here's the plan: " }, "order")}
              className="group inline-flex min-h-[48px] shrink-0 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink"
            >
              Ask about an express slot
              <ArrowUpRight
                size={16}
                className="text-gold transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
