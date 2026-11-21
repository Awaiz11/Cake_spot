/**
 * Cake Spot logo: the brand's own circular mark ("Cake Spot, Taste of Royalty").
 */
export function Logo({
  size = 46,
  className = "",
}: {
  size?: number;
  tone?: "ink" | "cream";
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://cakespot.pk/wp-content/uploads/2025/04/IMG_20250408_001138-1.png"
      width={size}
      height={size}
      alt="Cake Spot logo"
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** Wordmark lockup used in nav + footer. */
export function LogoLockup({
  tone = "ink",
  size = 44,
  showTagline = true,
}: {
  tone?: "ink" | "cream";
  size?: number;
  showTagline?: boolean;
}) {
  const main = tone === "ink" ? "text-ink" : "text-cream";
  const sub = tone === "ink" ? "text-slate-warm" : "text-cream/55";
  return (
    <span className="flex items-center gap-3">
      <Logo size={size} tone={tone} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[19px] tracking-[-0.01em] ${main}`}>Cake Spot</span>
        {showTagline ? (
          <span className={`mt-1 text-[9.5px] uppercase tracking-[0.26em] ${sub}`}>
            Boutique Patisserie
          </span>
        ) : null}
      </span>
    </span>
  );
}
