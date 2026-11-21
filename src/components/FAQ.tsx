"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { BRAND, waLink } from "@/lib/data";
import { Reveal, SectionHead } from "./ui/Reveal";
import { useOrder } from "@/lib/order-store";

const EASE = [0.22, 1, 0.36, 1] as const;

const QUESTIONS = [
  {
    q: "How far ahead should I book a custom cake?",
    a: "Many cakes can be ready as early as tomorrow. For big theme cakes and multi-tier designs, message us a few days early so we can lock your date.",
  },
  {
    q: "Can you match a photo I found online?",
    a: "Usually, yes — within reason. Send the reference and we reply honestly with what we can reproduce exactly, what we'd change for structural reasons, and what we'd refuse so it doesn't arrive looking nothing like the picture. That answer comes free, with the quote.",
  },
  {
    q: "Is the writing on the cake editable, including Urdu?",
    a: "Send the exact wording, spelling and capitalisation as you want it on the cake and we hand-letter it in chocolate or write it on a piped plaque. Urdu and Arabic script are written by hand — we check the spelling with a native writer before we pipe.",
  },
  {
    q: "Do you deliver, and what does it cost?",
    a: "Yes, we deliver all across Lahore, at the delivery time you choose. The delivery charge depends on your area and is shared with your order on WhatsApp.",
  },
  {
    q: "Eggless, nut-free or less sweet?",
    a: "Tell us on WhatsApp what you need, including any allergies, and we will tell you honestly what we can make for you.",
  },
  {
    q: "How do I confirm an order?",
    a: "We agree the design, size, flavour, date and price on WhatsApp. You can pay by JazzCash, EasyPaisa, bank transfer or Visa/MasterCard.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const { requestOrder } = useOrder();

  return (
    <section className="relative scroll-mt-24 border-t border-ink/8 bg-cream py-20 md:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              kicker="Before you ask"
              title={
                <>
                  The six things
                  <br />
                  everyone messages
                </>
              }
              lede="If your question isn't here, it takes ten seconds to ask — we answer from the same number, all day."
            />
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={waLink("Hi Cake Spot — quick question about a custom cake:")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-ink px-6 text-[12px] font-semibold uppercase tracking-[0.13em] text-cream transition-colors hover:bg-ink-soft"
                >
                  Ask on WhatsApp
                </a>
                <button
                  onClick={() => requestOrder({}, "order")}
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-ink/18 px-6 text-[12px] font-semibold uppercase tracking-[0.13em] text-ink transition-colors hover:border-gold hover:text-gold"
                >
                  Send a written brief
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-ink/12">
            {QUESTIONS.map((f, i) => {
              const on = open === i;
              return (
                <li key={f.q} className="border-b border-ink/12">
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    className="group flex w-full items-start gap-5 py-6 text-left"
                  >
                    <span className="mt-[6px] shrink-0 text-[10px] uppercase tracking-[0.22em] text-gold">
                      0{i + 1}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block font-display text-[19px] leading-snug transition-colors duration-300 md:text-[23px] ${
                          on ? "text-ink" : "text-ink/85 group-hover:text-ink"
                        }`}
                      >
                        {f.q}
                      </span>
                      <AnimatePresence initial={false}>
                        {on ? (
                          <motion.span
                            key="body"
                            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="block overflow-hidden"
                          >
                            <span className="block max-w-[62ch] pt-4 text-[14.5px] leading-[1.78] text-slate-warm">
                              {f.a}
                            </span>
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>
                    <span className="mt-[2px] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 group-hover:border-gold">
                      {on ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-slate-warm">
            Anything about a specific date or design? Message the counter directly on
            <a
              href={`tel:${BRAND.phoneDisplay.replace(/\s/g, "")}`}
              className="link-rule font-medium text-ink"
            >
              {BRAND.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
