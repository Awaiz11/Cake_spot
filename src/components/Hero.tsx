"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import { BRAND, photo } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";
import { useOrder } from "@/lib/order-store";
import { CakeImage } from "./ui/CakeImage";
import { MaskLines } from "./ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { requestOrder } = useOrder();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const shift = useTransform(scrollY, [0, 620], [0, reduce ? 0 : 54]);
  const shiftBack = useTransform(scrollY, [0, 620], [0, reduce ? 0 : -30]);

  return (
    <section id="top" className="relative overflow-hidden pt-[104px] md:pt-[132px] lg:pt-[148px]">
      {/* layered ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_88%_-10%,#F6EFE4_0%,rgba(246,239,228,0)_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_-5%_105%,rgba(196,147,71,0.13)_0%,rgba(196,147,71,0)_62%)]" />
        <div className="absolute inset-x-0 top-0 mx-auto hidden h-full max-w-[84rem] grid-cols-12 gap-8 px-14 lg:grid">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} className="col-span-1 border-r border-ink/[0.045]" />
          ))}
        </div>
        <span className="absolute -right-6 top-[42%] hidden select-none font-script text-[130px] leading-none text-ink/[0.045] xl:block">
          freshly baked
        </span>
      </div>

      <div className="container-x">
        <div className="grid items-end gap-12 pb-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
          {/* ── Copy column ───────────────────────────────── */}
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="inline-flex items-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gold"
            >
              <span className="h-px w-7 bg-gold/70" />
              Cake Spot · Gulberg III, Lahore
            </motion.span>

            <h1 className="mt-6 text-[clamp(2.5rem,9.2vw,5.05rem)] leading-[0.97] tracking-[-0.032em] text-ink">
              <MaskLines
                lines={[
                  <span key="a">Custom cakes</span>,
                  <span key="b">
                    your guests <span className="text-slate-warm">will</span>
                  </span>,
                  <span key="c" className="italic text-ink">
                    talk about
                  </span>,
                ]}
                delay={0.14}
                stagger={0.15}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
              className="mt-7 max-w-[46ch] text-[15.5px] leading-[1.75] text-slate-warm md:text-[17px]"
            >
              Bespoke, freshly baked custom cakes crafted to order in Lahore — built around
              your photo, your colours and the message that actually matters. Birthdays,
              anniversaries, and the milestones worth the fuss.
            </motion.p>

            {/* trust pill + dual CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.86 }}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-cream/70 py-2 pl-2.5 pr-4 text-[12.5px] shadow-[0_1px_0_rgba(22,34,46,0.05)]">
                <span className="flex h-6 items-center gap-[1px] rounded-full bg-ink px-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={9.5} className="fill-gold text-gold" strokeWidth={0} />
                  ))}
                </span>
                <span className="font-semibold text-ink">{BRAND.rating}</span>
                <span className="text-slate-warm">· {BRAND.reviewCount}+ Verified Reviews</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.96 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <button
                onClick={() => requestOrder({}, "order")}
                className="group relative flex min-h-[54px] items-center justify-center gap-3 overflow-hidden rounded-full bg-ink px-8 text-[13px] font-semibold uppercase tracking-[0.13em] text-cream"
              >
                <span className="relative z-10">Send Your Cake Idea</span>
                <ArrowUpRight
                  size={17}
                  className="relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-gold transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                />
              </button>
              <button
                onClick={() => scrollToId("gallery")}
                className="flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border border-ink/18 px-7 text-[13px] font-semibold uppercase tracking-[0.13em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink/[0.04]"
              >
                View Past Cakes
                <ArrowDown size={15} className="text-gold" />
              </button>
            </motion.div>
          </div>

          {/* ── Asymmetric photo showcase ─────────────────── */}
          <div className="relative lg:col-span-6 lg:col-start-7 xl:col-span-7">
            <motion.div
              style={{ y: shift }}
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
              className="relative grid grid-cols-12 gap-3 sm:gap-4"
            >
              <HeroTile className="col-span-8 lg:col-span-7" delay={0.2}>
                <CakeImage
                  src={photo(30668691, "jpeg", 900)}
                  alt="Hand-sculpted teddy bear birthday cake by Cake Spot"
                  priority
                  className="aspect-[4/5] w-full border border-ink/10 p-[6px] shadow-[0_40px_80px_-50px_rgba(22,34,46,0.55)]"
                  imgClassName={reduce ? "" : "kenburns"}
                />
                <figcaption className="mt-2.5 flex items-center justify-between text-[10.5px] uppercase tracking-[0.18em] text-slate-warm">
                  <span>Teddy in Clouds · 2kg</span>
                  <span className="text-gold">Signature</span>
                </figcaption>
              </HeroTile>

              <div className="col-span-4 flex flex-col gap-3 sm:gap-4">
                <HeroTile className="" delay={0.34}>
                  <CakeImage
                    src={photo(33755869, "png", 620)}
                    alt="White cake with a single red rose and gold accents"
                    className="aspect-square w-full border border-ink/10 p-[6px]"
                  />
                </HeroTile>
                <HeroTile className="" delay={0.46}>
                  <CakeImage
                    src={photo(17939214, "jpeg", 620)}
                    alt="Chocolate teddy bear decoration on a cake"
                    className="aspect-[3/4] w-full border border-ink/10 p-[6px]"
                  />
                </HeroTile>
              </div>

              {/* rotated gold seal */}
              <motion.div
                style={{ y: shiftBack }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
                className="absolute -left-2 top-1/2 z-20 hidden -translate-y-1/2 sm:block lg:-left-8"
              >
                <Seal />
              </motion.div>
            </motion.div>

            {/* wide strip under the grid */}
            <HeroTile className="mt-3 sm:mt-4" delay={0.56}>
              <CakeImage
                src={photo(29051734, "jpeg", 1400)}
                alt="Ivory cake finished with orchids and eucalyptus"
                className="aspect-[16/6] w-full border border-ink/10 p-[6px]"
              />
            </HeroTile>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="container-x hidden items-center gap-4 pb-8 md:flex">
        <motion.span
          animate={reduce ? {} : { scaleY: [0.25, 1, 0.25] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-10 w-px origin-top bg-gradient-to-b from-gold to-transparent"
        />
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-warm">
          Scroll for the past cakes
        </span>
      </div>
    </section>
  );
}

function HeroTile({
  children,
  className = "",
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.985 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.05, ease: EASE, delay } },
      }}
      className={`m-0 ${className}`}
    >
      {children}
    </motion.figure>
  );
}

function Seal() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full bg-ink text-cream lg:h-[124px] lg:w-[124px]">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="seal-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <g
          style={
            reduce
              ? undefined
              : { transformOrigin: "60px 60px", animation: "spin 34s linear infinite" }
          }
        >
          <text
            fill="#C49347"
            style={{
              fontFamily: "var(--font-jakarta), sans-serif",
              fontSize: "9.4px",
              letterSpacing: "3.1px",
              fontWeight: 600,
            }}
          >
            <textPath href="#seal-path" startOffset="0%">
              BAKED TO ORDER · LAHORE · GULBERG III ·
            </textPath>
          </text>
        </g>
      </svg>
      <span className="font-script text-[26px] leading-none text-cream lg:text-[30px]">Fresh</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
