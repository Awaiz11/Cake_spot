"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { MoveDiagonal } from "lucide-react";
import { useMemo, useState } from "react";
import { CAKES, CATEGORIES, type Cake, type Category, photo } from "@/lib/data";
import { Reveal, SectionHead } from "./ui/Reveal";
import { CakeImage } from "./ui/CakeImage";
import { GalleryLightbox } from "./GalleryLightbox";

const EASE = [0.22, 1, 0.36, 1] as const;

const RATIO_CLASS: Record<Cake["ratio"], string> = {
  tall: "aspect-[2/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[4/3]",
};

export function Gallery() {
  const [filter, setFilter] = useState<Category>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const shown = useMemo(
    () => (filter === "All" ? CAKES : CAKES.filter((c) => c.category === filter)),
    [filter],
  );

  const active = shown.find((c) => c.id === openId) ?? null;

  return (
    <section
      id="gallery"
      className="relative scroll-mt-24 overflow-hidden bg-oat/70 py-20 md:py-28 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent"
      />
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            kicker="The past cakes archive"
            title={
              <>
                Real orders,
                <br />
                <span className="italic">not renders</span>
              </>
            }
            lede="A rolling archive of cakes that left our Gulberg kitchen this season. Tap any one to see the size, flavour and finish — then send it straight to our WhatsApp as your reference."
          />
          <Reveal delay={0.08}>
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-warm">
              <span className="text-ink">{shown.length}</span> of {CAKES.length} shown
            </p>
          </Reveal>
        </div>

        {/* ── Filter rail ─────────────────────────────── */}
        <LayoutGroup id="gallery-filters">
          <div
            role="group"
            aria-label="Filter cakes by category"
            className="scrollbar-none -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
          >
            {CATEGORIES.map((c) => {
              const on = c === filter;
              const count = c === "All" ? CAKES.length : CAKES.filter((k) => k.category === c).length;
              return (
                <button
                  key={c}
                  aria-pressed={on}
                  onClick={() => setFilter(c)}
                  className={`relative flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-5 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                    on ? "border-transparent text-cream" : "border-ink/14 text-slate-warm hover:text-ink"
                  }`}
                >
                  {on ? (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 40, mass: 0.8 }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  ) : null}
                  <span className="relative z-10">{c}</span>
                  <span className={`relative z-10 text-[10px] ${on ? "text-gold-soft" : "text-ink/35"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* ── Masonry archive ─────────────────────────── */}
        <motion.div layout transition={{ duration: reduce ? 0 : 0.5, ease: EASE }} className="mt-10">
          <div className="columns-2 gap-4 md:columns-3 md:gap-6 xl:columns-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((cake, i) => (
                <motion.button
                  key={cake.id}
                  layout
                  layoutId={`cake-img-${cake.id}`}
                  onClick={() => setOpenId(cake.id)}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
                  transition={{
                    duration: 0.55,
                    ease: EASE,
                    delay: reduce ? 0 : Math.min(i, 7) * 0.045,
                    layout: { duration: 0.5, ease: EASE },
                  }}
                  className="cake-tile group mb-4 flex w-full flex-col text-left md:mb-6"
                >
                  <span className="relative block w-full overflow-hidden bg-cream">
                    <CakeImage
                      src={photo(cake.photoId, cake.ext, 760)}
                      alt={`${cake.title} — ${cake.category} cake by Cake Spot`}
                      sizes="(min-width:1280px) 22vw, (min-width:768px) 30vw, 46vw"
                      className={`${RATIO_CLASS[cake.ratio]} w-full`}
                      imgClassName={`transition-transform duration-500 ease-out ${
                        reduce ? "" : "group-hover:scale-[1.04]"
                      }`}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 border border-ink/10 transition-colors duration-500 group-hover:border-gold/60"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex translate-y-full items-end justify-between gap-3 bg-gradient-to-t from-ink/92 via-ink/70 to-transparent p-4 pt-10 text-cream transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
                      <span className="block">
                        <span className="block text-[10px] uppercase tracking-[0.22em] text-gold-soft">
                          {cake.category}
                        </span>
                        <span className="mt-1 block font-display text-[17px] leading-tight">
                          {cake.title}
                        </span>
                        <span className="mt-1 block text-[11.5px] text-cream/70">
                          {cake.weight} · {cake.serves}
                        </span>
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/35">
                        <MoveDiagonal size={14} />
                      </span>
                    </span>
                  </span>
                  <span className="mt-2.5 flex items-baseline justify-between gap-2 pr-1">
                    <span className="font-display text-[15px] leading-snug text-ink md:text-[17px]">
                      {cake.title}
                    </span>
                    <span className="shrink-0 text-[10.5px] uppercase tracking-[0.16em] text-slate-warm">
                      {cake.price.replace("from ", "")}
                    </span>
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <GalleryLightbox
        cake={active}
        items={shown}
        onChange={(id) => setOpenId(id)}
        onClose={() => setOpenId(null)}
      />
    </section>
  );
}
