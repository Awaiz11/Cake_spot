"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ImageUp,
  Loader2,
  MessageCircle,
  RotateCcw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BRAND,
  DELIVERY_AREAS,
  FLAVOURS,
  FLAVOUR_NAMES,
  OCCASIONS,
  SIZES,
  photo,
  waLink,
} from "@/lib/data";
import { useOrder } from "@/lib/order-store";
import { CakeImage } from "./ui/CakeImage";
import { Reveal, SectionHead } from "./ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEPS = ["You & occasion", "Cake & flavour", "Date & delivery"] as const;
const PICKUP = "Pickup at Gulberg III";
const DROP = "Delivery somewhere in Lahore";

type FormState = {
  fullName: string;
  phone: string;
  occasion: string;
  size: string;
  flavour: string;
  date: string;
  message: string;
  delivery: string;
  area: string;
};

const EMPTY: FormState = {
  fullName: "",
  phone: "",
  occasion: "",
  size: "",
  flavour: "",
  date: "",
  message: "",
  delivery: DROP,
  area: "",
};

const todayISO = () => new Date().toISOString().slice(0, 10);

function prettyDate(iso: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

export function OrderForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [refFile, setRefFile] = useState<{ name: string; url: string } | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [flash, setFlash] = useState(0);
  const { prefill } = useOrder();
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  /* ── Prefill coming from gallery / specialty cards ───────── */
  useEffect(() => {
    if (!prefill) return;
    setStatus("idle");
    setForm((f) => ({
      ...f,
      occasion: prefill.occasion ?? f.occasion,
      size: prefill.size ?? f.size,
      flavour: prefill.flavour ?? f.flavour,
      message: prefill.message ? `${prefill.message}${f.message}` : f.message,
    }));
    setStep(prefill.style ? 1 : 0);
    setFlash((n) => n + 1);
  }, [prefill]);

  const validate = (s: number) => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (form.fullName.trim().length < 2) e.fullName = "Please tell us your name";
      if (!/^[+()\d][\d\s()-]{8,}$/.test(form.phone.trim()))
        e.phone = "A reachable WhatsApp number, e.g. 0300 1234567";
      if (!form.occasion) e.occasion = "Pick the occasion";
    }
    if (s === 1) {
      if (!form.size) e.size = "Choose a size — or ask us to advise";
    }
    if (s === 2) {
      if (!form.date) e.date = "When do you need it?";
      else if (form.date < todayISO()) e.date = "That date has passed";
      if (form.delivery === DROP && form.area.trim().length < 2)
        e.area = "Which area? Nearest landmark is fine";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const compiled = useMemo(() => {
    const lines = [
      "*NEW CAKE IDEA — cakespot.pk*",
      "",
      `Name: ${form.fullName}`,
      `WhatsApp: ${form.phone}`,
      `Occasion: ${form.occasion}`,
      form.size ? `Size / servings: ${form.size}` : "",
      form.flavour ? `Flavour: ${form.flavour}` : "",
      form.date ? `Needed on: ${prettyDate(form.date)}` : "",
      `Handover: ${form.delivery}${form.delivery === DROP && form.area ? ` — ${form.area}` : ""}`,
      "",
      "The idea:",
      form.message.trim() || "— (I'll describe it here)",
      "",
      refFile
        ? `Reference photo: ${refFile.name} — attaching it to this message now.`
        : "Reference photo: none attached yet.",
      "",
      "Sent from the Cake Spot website.",
    ];
    return lines.filter((l) => l !== "").join("\n");
  }, [form, refFile]);

  const submit = async () => {
    if (!validate(2)) return;
    setStatus("sending");
    const link = waLink(compiled);
    setWaUrl(link);

    // Fire the enquiry into the bakery queue, then hand the customer to WhatsApp.
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          requiredDate: form.date,
          deliveryMode: form.delivery,
          deliveryArea: form.area,
          referenceFileName: refFile?.name ?? null,
          sentToWhatsapp: true,
        }),
      });
    } catch {
      /* WhatsApp still works — never trap the customer on a failed ping */
    }

    window.open(link, "_blank", "noopener,noreferrer");
    setStatus("done");
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setRefFile(null);
    setStatus("idle");
    setWaUrl(null);
    setStep(0);
    if (fileInput.current) fileInput.current.value = "";
  };

  const onFile = (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (refFile) URL.revokeObjectURL(refFile.url);
    setRefFile({ name: file.name, url: URL.createObjectURL(file) });
  };

  return (
    <section id="order" className="relative scroll-mt-24 overflow-x-clip bg-oat py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_100%_0%,rgba(196,147,71,0.14),transparent_60%)]"
      />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ── Editorial rail ─────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                kicker="Send your cake idea"
                tone="ink"
                title={
                  <>
                    Tell us the plan.
                    <br />
                    We&apos;ll price it <span className="italic text-gold">honestly</span>.
                  </>
                }
                lede="Two minutes here saves a week of back-and-forth. Everything you type is compiled into one clean WhatsApp message to our kitchen — no account, no payment, no waiting for an email reply."
              />

              <Reveal delay={0.12}>
                <ul className="mt-9 space-y-3.5">
                  {[
                    "Open every day, 7 AM to 2 AM",
                    "A real price before you commit — no quote theatre",
                    "Send any picture, we make it the same",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-ink">
                      <span className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-ink">
                        <Check size={11} className="text-gold-soft" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.2}>
                <a
                  href={waLink("Hi Cake Spot — I have a cake idea I'd like to run past you.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-9 flex items-center gap-4 border border-ink/12 bg-cream/60 p-4 transition-colors hover:border-gold/60"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream">
                    <MessageCircle size={17} />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-slate-warm">
                      Prefer to just talk?
                    </span>
                    <span className="font-display text-[19px] leading-tight text-ink">
                      {BRAND.phoneDisplay}
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-gold transition-transform duration-500 group-hover:translate-x-1"
                  />
                </a>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-6 hidden overflow-hidden lg:block">
                  <CakeImage
                    src={photo(3983576, "jpeg", 900)}
                    alt="Cake Spot artist finishing a chocolate drip in the Gulberg kitchen"
                    className="aspect-[16/9] w-full"
                    imgClassName="transition-transform duration-[1.2s] hover:scale-[1.04]"
                  />
                  <p className="mt-2.5 text-[10.5px] uppercase tracking-[0.2em] text-slate-warm">
                    Block K, Gulberg III, Lahore
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── The form ───────────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.div
              ref={cardRef}
              key={flash}
              initial={false}
              animate={
                reduce || !flash
                  ? { boxShadow: "0 0 0 0 rgba(196,147,71,0)" }
                  : { boxShadow: ["0 0 0 0px rgba(196,147,71,0.55)", "0 0 0 14px rgba(196,147,71,0)"] }
              }
              transition={{ duration: 1.05, ease: EASE }}
              className="relative border border-ink/12 bg-[#FFFCF7] shadow-[0_45px_90px_-60px_rgba(22,34,46,0.5)]"
            >
              {/* progress rail */}
              <div className="flex items-stretch border-b border-ink/10">
                {STEPS.map((s, i) => {
                  const done = i < step || status === "done";
                  const on = i === step && status !== "done";
                  return (
                    <button
                      key={s}
                      onClick={() => (i < step ? setStep(i) : undefined)}
                      className={`relative flex flex-1 flex-col gap-1 px-4 py-4 text-left transition-colors sm:px-6 ${
                        i < step ? "cursor-pointer hover:bg-oat/60" : "cursor-default"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                          on ? "text-gold" : "text-slate-warm"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`text-[12.5px] font-medium leading-tight ${
                          on || done ? "text-ink" : "text-slate-warm/70"
                        }`}
                      >
                        {done ? <Check size={12} className="mr-1 inline text-gold" /> : null}
                        {s}
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-ink transition-transform duration-500"
                        style={{ transform: on || done ? "scaleX(1)" : "scaleX(0)" }}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="p-5 sm:p-7 lg:p-9">
                {status === "done" ? (
                  <Sent waUrl={waUrl ?? waLink(compiled)} onReset={reset} name={form.fullName} />
                ) : (
                  <>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={step}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.42, ease: EASE }}
                      >
                        {step === 0 ? (
                          <StepOne form={form} set={set} errors={errors} />
                        ) : step === 1 ? (
                          <StepTwo
                            form={form}
                            set={set}
                            errors={errors}
                            refFile={refFile}
                            fileInput={fileInput}
                            onFile={onFile}
                            onClear={() => {
                              if (refFile) URL.revokeObjectURL(refFile.url);
                              setRefFile(null);
                              if (fileInput.current) fileInput.current.value = "";
                            }}
                          />
                        ) : (
                          <StepThree
                            form={form}
                            set={set}
                            errors={errors}
                            refFile={refFile}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-9 flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        {step > 0 ? (
                          <button
                            onClick={() => setStep((s) => Math.max(0, s - 1))}
                            className="inline-flex min-h-[48px] items-center gap-2 px-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-warm transition-colors hover:text-ink"
                          >
                            <RotateCcw size={14} /> Back
                          </button>
                        ) : (
                          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-warm">
                            Nothing is charged here
                          </span>
                        )}
                      </div>

                      {step < STEPS.length - 1 ? (
                        <button
                          onClick={next}
                          className="group relative flex min-h-[52px] items-center justify-center gap-3 overflow-hidden rounded-full bg-ink px-8 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-cream"
                        >
                          <span className="relative z-10">Continue</span>
                          <ArrowRight
                            size={16}
                            className="relative z-10 transition-transform duration-500 group-hover:translate-x-1"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={submit}
                          disabled={status === "sending"}
                          className="group relative flex min-h-[52px] items-center justify-center gap-3 overflow-hidden rounded-full bg-gold px-7 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink disabled:opacity-70"
                        >
                          {status === "sending" ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <MessageCircle size={16} />
                          )}
                          <span className="relative z-10">Send via WhatsApp</span>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-slate-warm">
              <BadgeCheck size={14} className="mt-[2px] shrink-0 text-gold" />
              We only use your number to reply about this cake. No marketing lists, no broadcast
              groups.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   Steps
   ──────────────────────────────────────────────────────────────── */

function StepOne({
  form,
  set,
  errors,
}: {
  form: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  errors: Partial<Record<keyof FormState, string>>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <StepTitle n="01" title="Who's the cake for?" line="We reply from the same number you give us." />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName} htmlFor="fullName">
          <input
            id="fullName"
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            placeholder="Ayesha Rahman"
            autoComplete="name"
            className={inputCls(!!errors.fullName)}
          />
        </Field>
        <Field label="Phone / WhatsApp" error={errors.phone} htmlFor="phone">
          <input
            id="phone"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="0300 1234567"
            inputMode="tel"
            autoComplete="tel"
            className={inputCls(!!errors.phone)}
          />
        </Field>
      </div>
      <Field label="Occasion" error={errors.occasion} htmlFor="occasion">
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <Chip key={o} on={form.occasion === o} onClick={() => set("occasion", o)}>
              {o}
            </Chip>
          ))}
        </div>
      </Field>
    </div>
  );
}

function StepTwo({
  form,
  set,
  errors,
  refFile,
  onFile,
  onClear,
  fileInput,
}: {
  form: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  errors: Partial<Record<keyof FormState, string>>;
  refFile: { name: string; url: string } | null;
  onFile: (f?: File | null) => void;
  onClear: () => void;
  fileInput: React.RefObject<HTMLInputElement | null>;
}) {
  const flavourNote = FLAVOURS.find((f) => f.name === form.flavour)?.note;
  return (
    <div className="flex flex-col gap-6">
      <StepTitle n="02" title="Size, flavour, inspiration" line="Rough is fine — we'll refine it with you." />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Weight / servings" error={errors.size} htmlFor="size">
          <select
            id="size"
            value={form.size}
            onChange={(e) => set("size", e.target.value)}
            className={`${selectCls} ${errors.size ? "border-red-400" : ""}`}
          >
            <option value="">Select a size…</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Flavour preference" htmlFor="flavour">
          <select
            id="flavour"
            value={form.flavour}
            onChange={(e) => set("flavour", e.target.value)}
            className={selectCls}
          >
            <option value="">Let Cake Spot suggest…</option>
            {FLAVOUR_NAMES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          {flavourNote ? (
            <span className="mt-1.5 block text-[11.5px] italic text-slate-warm">{flavourNote}</span>
          ) : null}
        </Field>
      </div>

      <Field label="Describe your cake idea, colours, or message on the cake" htmlFor="message">
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Two tiers, ivory with dried flowers. My mother's name in Urdu on the front — “Ami, 50”. Not too sweet, and please make the bear wear tiny glasses."
          className={`${inputCls(false)} resize-y leading-relaxed`}
        />
        <span className="mt-1.5 block text-[11px] uppercase tracking-[0.14em] text-slate-warm">
          {form.message.trim().length} characters · the more specific, the closer the first sketch
        </span>
      </Field>

      <div>
        <span className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-warm">
          Inspiration / reference image
        </span>
        <input
          ref={fileInput}
          id="ref"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        {refFile ? (
          <div className="flex items-center gap-4 border border-ink/12 bg-cream p-3">
            <img
              src={refFile.url}
              alt="Selected reference preview"
              className="h-16 w-16 shrink-0 object-cover"
            />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-[13.5px] font-medium text-ink">{refFile.name}</span>
              <span className="text-[11.5px] text-slate-warm">
                Preview saved · attach it in WhatsApp when the chat opens
              </span>
            </span>
            <button
              onClick={onClear}
              aria-label="Remove reference image"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 text-slate-warm transition-colors hover:border-ink hover:text-ink"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInput.current?.click()}
            className="group flex w-full items-center gap-4 border border-dashed border-ink/25 bg-cream/60 p-4 text-left transition-colors hover:border-gold hover:bg-gold-wash/50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors group-hover:border-gold group-hover:text-gold">
              <ImageUp size={17} />
            </span>
            <span className="flex flex-col">
              <span className="text-[14px] font-medium text-ink">
                Add a Pinterest pin, screenshot or sketch
              </span>
              <span className="text-[12px] text-slate-warm">
                Opens your phone gallery · JPG or PNG, any size
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function StepThree({
  form,
  set,
  errors,
  refFile,
}: {
  form: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  errors: Partial<Record<keyof FormState, string>>;
  refFile: { name: string; url: string } | null;
}) {
  return (
    <div className="flex flex-col gap-6">
      <StepTitle n="03" title="When, and how it leaves us" line="Pickup from Gulberg III, or we drive it to you." />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Required date" error={errors.date} htmlFor="date">
          <div className="relative">
            <CalendarDays
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gold"
            />
            <input
              id="date"
              type="date"
              min={todayISO()}
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className={`${inputCls(!!errors.date)} pl-10`}
            />
          </div>
        </Field>
        <Field label="Pickup or Lahore delivery" htmlFor="delivery">
          <div className="flex flex-col gap-2">
            {[DROP, PICKUP].map((d) => (
              <button
                key={d}
                onClick={() => set("delivery", d)}
                className={`flex min-h-[48px] items-center justify-between gap-3 border px-4 text-[13.5px] transition-colors ${
                  form.delivery === d
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/15 bg-cream text-ink hover:border-ink/40"
                }`}
              >
                {d}
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    form.delivery === d ? "border-gold bg-gold" : "border-ink/30"
                  }`}
                >
                  {form.delivery === d ? <Check size={10} strokeWidth={3.5} className="text-ink" /> : null}
                </span>
              </button>
            ))}
          </div>
        </Field>
      </div>

      {form.delivery === DROP ? (
        <Field label="Delivery area in Lahore" error={errors.area} htmlFor="area">
          <input
            id="area"
            list="lahore-areas"
            value={form.area}
            onChange={(e) => set("area", e.target.value)}
            placeholder="DHA Phase 5, near Bank Anwar market"
            className={inputCls(!!errors.area)}
          />
          <datalist id="lahore-areas">
            {DELIVERY_AREAS.map((a) => (
              <option key={a} value={a} />
            ))}
          </datalist>
          <span className="mt-2 flex flex-wrap gap-1.5">
            {DELIVERY_AREAS.slice(0, 6).map((a) => (
              <button
                key={a}
                onClick={() => set("area", a)}
                className="inline-flex min-h-[44px] items-center rounded-full border border-ink/12 px-4 text-[11.5px] text-slate-warm transition-colors hover:border-gold hover:text-ink"
              >
                {a}
              </button>
            ))}
          </span>
        </Field>
      ) : (
        <p className="border-l-2 border-gold/70 bg-cream px-4 py-3 text-[13.5px] leading-relaxed text-slate-warm">
          Pickup from <span className="text-ink">{BRAND.addressLine}</span> — {BRAND.hours}. We hold
          the cake chilled and text you the moment it&apos;s boxed.
        </p>
      )}

      <div className="border border-ink/10 bg-cream">
        <span className="flex items-center gap-2 border-b border-ink/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-warm">
          <Sparkles size={13} className="text-gold" /> What we&apos;ll receive
        </span>
        <dl className="grid grid-cols-1 gap-x-6 px-4 py-2 sm:grid-cols-2">
          {[
            ["Name", form.fullName],
            ["WhatsApp", form.phone],
            ["Occasion", form.occasion],
            ["Size", form.size],
            ["Flavour", form.flavour || "Chef's suggestion"],
            ["Needed on", prettyDate(form.date)],
            ["Handover", form.delivery === DROP ? `Delivery — ${form.area}` : PICKUP],
            ["Reference", refFile ? refFile.name : "None yet"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-3 border-b border-ink/6 py-2 last:border-0">
              <dt className="w-[86px] shrink-0 text-[10px] uppercase tracking-[0.16em] text-slate-warm">
                {k}
              </dt>
              <dd className="flex-1 text-[13.5px] text-ink">
                {v || <span className="text-slate-warm/70">—</span>}
              </dd>
            </div>
          ))}
        </dl>
        <p className="px-4 pb-4 pt-2 text-[12.5px] leading-relaxed text-slate-warm">
          Tapping <span className="text-ink">Send via WhatsApp</span> opens WhatsApp with this
          message pre-typed. Add your reference photo there and hit send — that&apos;s the whole
          booking.
        </p>
      </div>
    </div>
  );
}

function Sent({ waUrl, onReset, name }: { waUrl: string; onReset: () => void; name: string }) {
  const first = name.trim().split(" ")[0] || "there";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="flex flex-col items-start gap-6 py-4"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink">
        <Check size={22} className="text-gold" strokeWidth={2.4} />
      </span>
      <div>
        <h3 className="text-[28px] leading-tight text-ink sm:text-[34px]">
          Idea packed, {first}. Now one tap.
        </h3>
        <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-slate-warm">
          WhatsApp should have opened with your full brief typed out. If the window didn&apos;t
          appear, use the button below — your message is already waiting inside it. Drop the
          reference photo in the chat and we&apos;ll come back with a sketch and a price.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-[54px] items-center justify-center gap-3 overflow-hidden rounded-full bg-ink px-8 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-cream"
        >
          <MessageCircle size={16} className="relative z-10" />
          <span className="relative z-10">Open WhatsApp again</span>
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
          />
        </a>
        <button
          onClick={onReset}
          className="flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-ink/18 px-6 text-[12.5px] font-semibold uppercase tracking-[0.13em] text-ink transition-colors hover:border-ink"
        >
          <RotateCcw size={14} /> Send another idea
        </button>
      </div>
      <p className="text-[12px] text-slate-warm">
        Urgent, within 24 hours? Call {BRAND.phoneDisplay} — the kitchen answers the line.
      </p>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Primitives
   ──────────────────────────────────────────────────────────────── */

function StepTitle({ n, title, line }: { n: string; title: string; line: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="font-display text-[13px] tracking-[0.2em] text-gold">{n}</span>
      <div>
        <h3 className="text-[24px] leading-tight text-ink sm:text-[27px]">{title}</h3>
        <p className="mt-1.5 text-[13.5px] text-slate-warm">{line}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  error,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  htmlFor: string;
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={htmlFor}
        className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-warm"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error ? (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-[12px] font-medium text-[#A2412F]"
          >
            {error}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`relative min-h-[44px] rounded-full border px-4 text-[12.5px] font-medium transition-colors duration-300 ${
        on ? "border-transparent text-cream" : "border-ink/15 text-slate-warm hover:border-ink/40 hover:text-ink"
      }`}
    >
      {on ? (
        <motion.span
          layoutId="occasion-pill"
          transition={{ type: "spring", stiffness: 430, damping: 38 }}
          className="absolute inset-0 rounded-full bg-ink"
        />
      ) : null}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

const inputCls = (bad: boolean) =>
  `min-h-[52px] w-full rounded-none border bg-cream px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-slate-warm/60 focus:border-gold ${
    bad ? "border-[#C2604D]" : "border-ink/15"
  }`;

const selectCls =
  "select-clean min-h-[52px] w-full rounded-none border border-ink/15 bg-cream px-4 pr-10 text-[15px] text-ink outline-none transition-colors focus:border-gold";
