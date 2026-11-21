"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";
import { BRAND, waLink } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";
import { useOrder } from "@/lib/order-store";

const LINKS = [
  { label: "Gallery", id: "gallery" },
  { label: "Specialties", id: "specialties" },
  { label: "Custom Order", id: "order" },
  { label: "Reviews", id: "reviews" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("gallery");
  const { requestOrder } = useOrder();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0.01, 0.2, 0.5] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-ink/10 bg-cream/90 backdrop-blur-md shadow-[0_10px_40px_-28px_rgba(22,34,46,0.5)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-6 md:h-[86px]">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Cake Spot — back to top"
            className="shrink-0"
          >
            <LogoLockup size={40} showTagline={false} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className={`link-rule text-[12.5px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  active === l.id ? "text-ink" : "text-slate-warm hover:text-ink"
                }`}
              >
                {l.label}
                {active === l.id ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-[7px] left-0 h-[1.5px] w-full bg-gold"
                  />
                ) : null}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cake Spot on Instagram"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-ink/12 text-ink transition-colors hover:border-gold hover:text-gold sm:flex"
            >
              <InstagramGlyph />
            </a>
            <button
              onClick={() => requestOrder({}, "order")}
              className="group relative hidden h-11 items-center overflow-hidden rounded-full bg-ink px-6 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-cream transition-transform duration-300 hover:-translate-y-[1px] md:inline-flex"
            >
              <span className="relative z-10">Send Cake Idea</span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
              />
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 lg:hidden"
            >
              <span className="flex w-5 flex-col items-end gap-[5px]">
                <motion.span
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-[1.5px] w-5 bg-ink"
                />
                <motion.span
                  animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block h-[1.5px] w-3.5 bg-ink"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-[1.5px] w-5 bg-ink"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-drawer"
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex h-[100dvh] flex-col bg-cream lg:hidden"
          >
            <div className="mt-[76px] flex flex-1 flex-col justify-between overflow-y-auto px-5 pb-8">
              <nav aria-label="Mobile" className="flex flex-col">
                {LINKS.map((l, i) => (
                  <motion.button
                    key={l.id}
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => scrollToId(l.id), 120);
                    }}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-baseline justify-between border-b border-ink/8 py-5 text-left"
                  >
                    <span className="font-display text-[30px] leading-none text-ink">{l.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-gold">
                      0{i + 1}
                    </span>
                  </motion.button>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col gap-3"
              >
                <a
                  href={waLink(
                    "Hi Cake Spot — I'd like to ask about a custom cake for a celebration in Lahore.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[56px] items-center justify-center rounded-full bg-ink px-6 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-cream"
                >
                  WhatsApp {BRAND.phoneDisplay}
                </a>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[56px] items-center justify-center gap-3 rounded-full border border-ink/15 px-6 text-[13px] font-medium uppercase tracking-[0.14em] text-ink"
                >
                  <InstagramGlyph size={16} /> Follow {BRAND.handle}
                </a>
                <p className="mt-2 text-center text-[12.5px] leading-relaxed text-slate-warm">
                  {BRAND.addressLine}, {BRAND.city}
                  <br />
                  {BRAND.hours}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function InstagramGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}
