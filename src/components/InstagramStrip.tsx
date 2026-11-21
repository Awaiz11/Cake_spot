"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import { BRAND, IG_POSTS, photo } from "@/lib/data";
import { CakeImage } from "./ui/CakeImage";
import { Reveal, SectionHead } from "./ui/Reveal";

export function InstagramStrip() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-oat/70 py-16 md:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead
            kicker="Straight from the feed"
            title={
              <>
                Today&apos;s counter,
                <br />
                posted before it&apos;s eaten
              </>
            }
            lede="New builds land on Instagram first — flavours, slots and the occasional sold-out notice."
          />
          <Reveal delay={0.08}>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[52px] items-center gap-3 rounded-full border border-ink/18 px-6 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              Follow {BRAND.handle}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {IG_POSTS.map((p, i) => (
            <motion.li
              key={p.photoId}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, rotate: i % 2 ? -0.8 : 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="group"
            >
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${p.caption} on Instagram`}
                className="relative block"
              >
                <CakeImage
                  src={photo(p.photoId, p.ext, 520)}
                  alt={p.caption}
                  sizes="(min-width:1024px) 15vw, (min-width:640px) 30vw, 46vw"
                  className="aspect-square w-full"
                  imgClassName={`transition-transform duration-500 ease-out ${
                    reduce ? "" : "group-hover:scale-[1.06]"
                  }`}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/45"
                />
                <span className="pointer-events-none absolute inset-0 flex translate-y-2 flex-col items-center justify-center gap-1 p-2 text-center opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="flex items-center gap-1.5 text-[11px] text-cream">
                    <Heart size={12} className="fill-cream" /> {p.likes}
                  </span>
                  <span className="text-[11.5px] leading-snug text-cream/90">{p.caption}</span>
                </span>
                <span className="pointer-events-none absolute inset-0 border border-ink/10 transition-colors duration-500 group-hover:border-gold/70" />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
