"use client";

import { useState, useEffect } from "react";
import CrystalBall from "@/components/experience/CrystalBall";

/**
 * Shows a real product photo for a design, falling back to the CSS crystal ball
 * if the image file hasn't been added to /public/products/ yet.
 *
 * @param {object} props
 * @param {string} [props.src]   image url (e.g. "/products/moon.jpeg")
 * @param {string} props.alt
 * @param {string} props.design  design id, used for the fallback render
 * @param {"main"|"thumb"} [props.variant="main"]
 * @param {boolean} [props.feather=false]  fade the photo's edges to transparent
 *   so it blends into the scene with no visible background box
 */
export default function ProductPhoto({ src, alt, design, variant = "main", feather = false }) {
  const [failed, setFailed] = useState(false);

  // Reset the error state if the source changes (e.g. switching designs).
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    const isThumb = variant === "thumb";
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CrystalBall design={design} size={isThumb ? 54 : 190} base={variant === "main"} ambient={variant === "main"} />
      </div>
    );
  }

  const mask = feather
    ? "radial-gradient(circle at 50% 46%, #000 46%, rgba(0,0,0,0.55) 62%, transparent 75%)"
    : undefined;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading={variant === "main" ? "eager" : "lazy"}
      decoding="async"
      className="h-full w-full object-cover"
      style={feather ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
    />
  );
}
