"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { useEffect } from "react";
import { BRAND, OCCASION_BY_CATEGORY, type Cake, photo, waLink } from "@/lib/data";
import { useOrder } from "@/lib/order-store";
import { CakeImage } from "./ui/CakeImage";

const EASE = [0.22, 1, 0.36, 1] as const;


export function GalleryLightbox({
  cake,
  items,
  onClose,
  onChange,
}: {
  cake: Cake | null;
  items: Cake[];
  onClose: () => void;
  onChange: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const { requestOrder } = useOrder();

  useEffect(() => {
    if (!cake) return;
    const onKey = (e: KeyboardEvent) => {
      const i = items.findIndex((c) => c.id === cake.id);
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange(items[(i + 1) % items.length].id);
      if (e.key === "ArrowLeft") onChange(items[(i - 1 + items.length) % items.length].id);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cake, items, onClose, onChange]);

  const idx = cake ? items.findIndex((c) => c.id === cake.id) : -1;

  return (
    <AnimatePresence>
      {cake ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-stretch justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${cake.title} — cake detail`}
        >
          <motion.button
            aria-label="Close cake detail"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-zoom-out bg-ink/80 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative z-10 m-0 flex max-h-[100dvh] w-full max-w-[1080px] flex-col overflow-y-auto bg-cream shadow-[0_60px_120px_-40px_rgba(22,34,46,0.6)] sm:my-auto sm:max-h-[92dvh] sm:overflow-hidden lg:flex-row"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-cream/90 text-ink backdrop-blur transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              <X size={17} />
            </button>

            <div className="relative w-full shrink-0 bg-oat lg:w-[54%]">
              <CakeImage
                src={photo(cake.photoId, cake.ext, 1200)}
                alt={`${cake.title} — full view`}
                className="aspect-[4/3] w-full object-contain sm:aspect-[16/11] lg:h-full lg:aspect-auto"
                imgClassName="object-cover lg:object-contain"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-cream/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-ink backdrop-blur">
                {BRAND.handle} · {cake.category}
              </span>

              <div className="absolute bottom-3 right-3 hidden items-center gap-1.5 lg:flex">
                <button
                  onClick={() => onChange(items[(idx - 1 + items.length) % items.length].id)}
                  aria-label="Previous cake"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-cream/85 text-ink backdrop-blur transition hover:bg-ink hover:text-cream"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => onChange(items[(idx + 1) % items.length].id)}
                  aria-label="Next cake"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-cream/85 text-ink backdrop-blur transition hover:bg-ink hover:text-cream"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-7 p-6 sm:p-8 lg:p-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{cake.category}</span>
                <h3 className="mt-3 text-[30px] leading-[1.06] text-ink sm:text-[36px]">{cake.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate-warm">{cake.note}</p>

                <dl className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
                  {[
                    ["Serving", cake.serves],
                    ["Size", cake.weight],
                    ["Flavour", cake.flavour],
                    ["Finish", cake.finish],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[92px_1fr] gap-4 py-3.5">
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-warm">{k}</dt>
                      <dd className="text-[14px] leading-relaxed text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-warm">Indicative</span>
                  <span className="font-display text-[20px] text-ink">{cake.price}</span>
                </div>
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <button
                    onClick={() => {
                      onClose();
                      requestOrder(
                        {
                          occasion: OCCASION_BY_CATEGORY[cake.category] ?? "Birthday",
                          flavour: cake.flavour.split(" with ")[0].split(" & ")[0],
                          message: `I'd like something like "${cake.title}" (${cake.category}) from your page — ${cake.weight}. I'd like it in: `,
                          style: cake.title,
                        },
                        "order",
                      );
                    }}
                    className="group relative flex min-h-[52px] flex-1 items-center justify-center overflow-hidden rounded-full bg-ink px-6 text-[12.5px] font-semibold uppercase tracking-[0.13em] text-cream"
                  >
                    <span className="relative z-10">Order a Similar Cake</span>
                    <span
                      aria-hidden
                      className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                    />
                  </button>
                  <a
                    href={waLink(
                      `Hi Cake Spot — I'd like a cake like "${cake.title}" (${cake.category}). Is this something you can make?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-ink/18 px-5 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-gold hover:text-gold"
                  >
                    <MessageCircle size={15} /> Ask now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
