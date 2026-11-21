"use client";

import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND, SPECIALTIES, waLink } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";
import { useOrder } from "@/lib/order-store";
import { Logo } from "./Logo";
import { InstagramGlyph } from "./Nav";
import { Reveal } from "./ui/Reveal";

const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Cake+Spot+customized+cake+shop+Gulberg+Lahore";

export function Footer() {
  const { requestOrder } = useOrder();
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_120%,rgba(196,147,71,0.17),transparent_62%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />

      <div className="container-x relative">
        {/* oversized script signature */}
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-cream/12 py-14 md:py-16 lg:flex-row lg:items-end lg:justify-between">
            <p className="font-script text-[clamp(3.6rem,13vw,9rem)] leading-[0.85] text-cream/95">
              Cake&nbsp;Spot
            </p>
            <p className="max-w-[34ch] text-[14px] leading-relaxed text-cream/55">
              Custom cakes, baked to order in Gulberg III. Send us the idea tonight — hold the
              date in the morning.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <Logo size={58} tone="cream" />
              <div>
                <p className="font-display text-[21px] leading-none text-cream">Cake Spot</p>
                <p className="mt-2 text-[9.5px] uppercase tracking-[0.26em] text-cream/50">
                  Boutique patisserie · Lahore
                </p>
              </div>
            </div>
            <p className="mt-6 flex items-center gap-2 text-[13px] text-cream/70">
              <span className="flex gap-[2px] text-gold">★★★★★</span>
              {BRAND.rating} · {BRAND.reviewCount}+ verified reviews
            </p>
            <a
              href={waLink("Hi Cake Spot — I'd like to book a custom cake.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 flex min-h-[54px] items-center justify-between gap-3 bg-cream px-6 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold"
            >
              WhatsApp the kitchen
              <MessageCircle size={17} className="transition-transform duration-500 group-hover:scale-110" />
            </a>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Explore
            </h3>
            <ul className="mt-5 flex flex-col gap-3.5 text-[14.5px]">
              {[
                ["Past cakes gallery", "gallery"],
                ["Signature specialties", "specialties"],
                ["Send a cake idea", "order"],
                ["Customer reviews", "reviews"],
                ["How ordering works", "process"],
              ].map(([label, id]) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToId(id)}
                    className="link-rule text-cream/72 transition-colors hover:text-cream"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Cake styles
            </h3>
            <ul className="mt-5 flex flex-col gap-3.5 text-[14.5px] text-cream/72">
              {SPECIALTIES.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() =>
                      requestOrder({ occasion: "Birthday", style: s.name, message: `I want a ${s.name} like the one on your page. Details: ` }, "order")
                    }
                    className="link-rule text-left transition-colors hover:text-cream"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Find us
            </h3>
            <ul className="mt-5 flex flex-col gap-4 text-[14px] text-cream/72">
              <li className="flex gap-3">
                <MapPin size={15} className="mt-[3px] shrink-0 text-gold" />
                <a href={MAPS} target="_blank" rel="noopener noreferrer" className="link-rule">
                  {BRAND.addressLine}
                  <br />
                  {BRAND.city}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={15} className="mt-[3px] shrink-0 text-gold" />
                <span>{BRAND.hours}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="mt-[3px] shrink-0 text-gold" />
                <a
                  href={`tel:${BRAND.phoneDisplay.replace(/\s/g, "")}`}
                  className="link-rule tabular-nums"
                >
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="mt-[3px] shrink-0 text-gold" />
                <a href={`mailto:${BRAND.email}`} className="link-rule break-all">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* delivery note */}
        <div className="flex flex-col gap-5 border-t border-cream/12 py-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[68ch] text-[13px] leading-relaxed text-cream/55">
            <span className="text-cream">Chilled delivery across Lahore</span> — Gulberg, DHA,
            Model Town, Bahria Town, Johar Town, Cantt, Faisal Town &amp; Garden Town. Delivery as
            early as tomorrow, at your chosen time; pickup from our Gulberg III shop any day of the
            week.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/22 text-cream/80 transition-colors hover:border-gold hover:text-gold"
            >
              <InstagramGlyph size={17} />
            </a>
            <a
              href={BRAND.site}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-2 rounded-full border border-cream/22 px-5 text-[11.5px] uppercase tracking-[0.16em] text-cream/80 transition-colors hover:border-gold hover:text-gold"
            >
              cakespot.pk <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-cream/10 py-6 pb-[86px] text-[11.5px] text-cream/60 sm:flex-row sm:items-center sm:justify-between md:pb-6">
          <span>© {new Date().getFullYear()} Cake Spot · Lahore, Pakistan</span>
          <span className="uppercase tracking-[0.2em]">Baked to order · never frozen stock</span>
        </div>
      </div>
    </footer>
  );
}
