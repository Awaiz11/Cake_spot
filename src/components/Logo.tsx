/**
 * Cake Spot circular badge — hand-built SVG so the mark stays crisp at any size.
 * Deep navy disc, hairline gold ring, refined script wordmark.
 */
export function Logo({
  size = 46,
  tone = "ink",
  className = "",
}: {
  size?: number;
  tone?: "ink" | "cream";
  className?: string;
}) {
  const disc = tone === "ink" ? "#16222E" : "transparent";
  const discStroke = tone === "ink" ? "none" : "#FAF7F2";
  const text = tone === "ink" ? "#FAF7F2" : "#16222E";
  const scriptFill = tone === "ink" ? "#FAF7F2" : "#16222E";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Cake Spot — Lahore"
      className={className}
    >
      <circle cx="60" cy="60" r="58.5" fill={disc} stroke={discStroke} strokeWidth="1.4" />
      <circle
        cx="60"
        cy="60"
        r="51"
        fill="none"
        stroke="#C49347"
        strokeWidth="1.1"
        opacity={tone === "ink" ? 0.85 : 0.95}
      />
      <circle cx="60" cy="60" r="47.2" fill="none" stroke={text} strokeWidth="0.5" opacity="0.28" />

      {/* script wordmark */}
      <text
        x="60"
        y="65"
        textAnchor="middle"
        fill={scriptFill}
        style={{
          fontFamily: "var(--font-script-alt), 'Pinyon Script', cursive",
          fontSize: "34px",
          fontWeight: 400,
        }}
      >
        Cake&nbsp;Spot
      </text>

      {/* hairline caps under the script */}
      <line x1="34" y1="74.5" x2="86" y2="74.5" stroke="#C49347" strokeWidth="0.7" opacity="0.75" />
      <text
        x="60"
        y="86.5"
        textAnchor="middle"
        fill={scriptFill}
        opacity="0.82"
        style={{
          fontFamily: "var(--font-jakarta), sans-serif",
          fontSize: "8.4px",
          fontWeight: 500,
          letterSpacing: "2.4px",
        }}
      >
        LAHORE
      </text>

      {/* top mark: a three-tier cake glyph */}
      <g transform="translate(60 38)" stroke="#C49347" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <path d="M-9 6 h18" />
        <path d="M-6.5 2.2 h13 a2 2 0 0 1 2 2 v0 h-17 a2 2 0 0 1 2 -2 z" opacity="0.9" />
        <path d="M-4 -1.6 h8" opacity="0.75" />
        <path d="M0 -5.4 v2.6" />
        <circle cx="0" cy="-6.6" r="1.05" fill="#C49347" stroke="none" />
      </g>
    </svg>
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
