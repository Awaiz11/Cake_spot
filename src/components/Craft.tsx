"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CRAFT_POINTS, FLAVOURS, photo } from "@/lib/data";
import { CakeImage } from "./ui/CakeImage";
import { Reveal, SectionHead, Stagger, StaggerItem } from "./ui/Reveal";
import { useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Craft() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-x-clip bg-ink py-20 text-cream md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(196,147,71,0.16),transparent_60%)]"
      />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* sticky photo column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <CakeImage
                  src={photo(6996363, "jpeg", 900)}
                  alt="Finishing buttercream on a cake by hand"
                  className="aspect-[4/5] w-full"
                  imgClassName="kenburns"
                />
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <CakeImage
                    src={photo(14050799, "jpeg", 600)}
                    alt="Piping caramel onto a cake"
                    className="aspect-square w-full"
                  />
                  <div className="flex flex-col justify-between bg-ink-soft p-5">
                    <span className="font-script text-[38px] leading-none text-gold-soft">since</span>
                    <div>
                      <p className="text-[12.5px] leading-relaxed text-cream/65">
                        A neighbourhood kitchen in Gulberg III, running on one rule: every cake is
                        built from scratch the day it leaves us.
                      </p>
                      <span className="mt-3 block h-px w-10 bg-gold/70" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* scrolling copy column */}
          <div className="lg:col-span-7">
            <SectionHead
              kicker="Inside the kitchen"
              tone="cream"
              title={
                <>
                  Handcrafted is a
                  <br />
                  <span className="italic text-gold-soft">promise</span>, not a label
                </>
              }
              lede="Cake Spot runs a small team of artists rather than a production line. That's why a bear's eyebrows, a hand-painted gold numeral and your father's name in correct Urdu script all get the same attention."
            />

            <div className="mt-12 divide-y divide-cream/12 border-y border-cream/12">
              {CRAFT_POINTS.map((p, i) => (
                <Reveal key={p.k} delay={i * 0.08}>
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex flex-1 flex-col">
                      <span className="flex items-baseline gap-4">
                        <span className="text-[10px] uppercase tracking-[0.24em] text-gold">0{i + 1}</span>
                        <span className="text-[21px] leading-tight text-cream md:text-[25px]">{p.k}</span>
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="block overflow-hidden"
                      >
                        <span className="block max-w-[54ch] pt-3 text-[14.5px] leading-[1.75] text-cream/65">
                          {p.v}
                        </span>
                      </motion.span>
                    </span>
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream/70 transition-colors group-hover:border-gold group-hover:text-gold">
                      <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.35 }}>
                        +
                      </motion.span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>

            <div className="mt-12">
              <Reveal>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-soft">
                  Flavours we keep on the bench
                </h3>
              </Reveal>
              <Stagger className="mt-5 flex flex-wrap gap-2" amount={0.1}>
                {FLAVOURS.map((f) => (
                  <StaggerItem key={f.name}>
                    <span
                      title={f.note}
                      className="inline-flex min-h-[36px] cursor-default items-center rounded-full border border-cream/18 px-4 text-[12.5px] text-cream/75 transition-colors duration-300 hover:border-gold hover:text-cream"
                    >
                      {f.name}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal delay={0.1}>
                <p className="mt-5 text-[13px] leading-relaxed text-cream/60">
                  Hover a flavour for the inside story · eggless sponges and sugar-free buttercream
                  available on request.
                </p>
              </Reveal>
            </div>

            <NumbersRow />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Count-up statistics — animated on first view, static under reduced motion. */
function NumbersRow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDListElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const items = [
    { to: 4.9, label: "Google rating", suffix: "", decimals: 1 },
    { to: 570, label: "Verified reviews", suffix: "+", decimals: 0 },
    { to: 11, label: "Cake flavours", suffix: "", decimals: 0 },
    { to: 100, label: "Baked to order", suffix: "%", decimals: 0 },
  ];

  return (
    <dl
      ref={ref}
      className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-cream/12 pt-10 sm:grid-cols-4"
    >
      {items.map((it) => (
        <CountUp key={it.label} {...it} run={seen && !reduce} />
      ))}
    </dl>
  );
}

function CountUp({
  to,
  label,
  suffix,
  decimals,
  run,
}: {
  to: number;
  label: string;
  suffix: string;
  decimals: number;
  run: boolean;
}) {
  const [val, setVal] = useState(run ? to : 0);

  useEffect(() => {
    if (!run) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1250;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);

  return (
    <div>
      <dt className="font-display text-[38px] leading-none text-cream md:text-[46px]">
        {val.toFixed(decimals)}
        <span className="text-gold">{suffix}</span>
      </dt>
      <dd className="mt-2.5 text-[10.5px] uppercase tracking-[0.2em] text-cream/60">{label}</dd>
    </div>
  );
}
