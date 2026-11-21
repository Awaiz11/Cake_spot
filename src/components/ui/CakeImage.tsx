"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight remote image wrapper (Pexels CDN, no optimizer round-trip) with a
 * soft load-in so mobile networks never show a blank frame or layout jump.
 */
export function CakeImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // If the photo finished loading before React hydrated, onLoad never fires: catch that case.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, [src]);
  return (
    <span className={`relative block overflow-hidden bg-oat-deep ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-[6px]"
        } ${imgClassName}`}
      />
    </span>
  );
}
