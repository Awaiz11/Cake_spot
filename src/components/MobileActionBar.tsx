"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND, waLink } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";

/**
 * Thumb-friendly action bar for phones — the WhatsApp-first path for
 * customers who arrived straight from a shared link.
 */
export function MobileActionBar() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const order = document.getElementById("order");
    let inForm = false;

    const onScroll = () => setShow(window.scrollY > 520);
    const obs = order
      ? new IntersectionObserver(
          ([e]) => {
            inForm = e.isIntersecting;
            if (inForm) setShow(false);
            else setShow(window.scrollY > 520);
          },
          { threshold: 0.06 },
        )
      : null;

    window.addEventListener("scroll", onScroll, { passive: true });
    if (order && obs) obs.observe(order);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 74 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 74 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5 backdrop-blur-md md:hidden"
        >
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scrollToId("order")}
              className="flex min-h-[52px] flex-1 items-center justify-center gap-2.5 rounded-full bg-ink px-5 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-cream active:scale-[0.99]"
            >
              <PenLine size={15} className="text-gold" />
              Send Cake Idea
            </button>
            <a
              href={waLink("Hi Cake Spot — I need a custom cake in Lahore. Can you help?")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Message Cake Spot on WhatsApp, ${BRAND.phoneDisplay}`}
              className="flex min-h-[52px] items-center gap-2 rounded-full border border-ink/15 px-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink active:scale-[0.99]"
            >
              <MessageCircle size={16} className="text-gold" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
