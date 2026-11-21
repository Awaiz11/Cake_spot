/** Smooth anchor scrolling with a sticky-header offset. */
export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const offset = window.innerWidth < 768 ? 74 : 88;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
