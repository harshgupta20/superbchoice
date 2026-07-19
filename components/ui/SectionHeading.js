import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Standard section heading: eyebrow + title + optional subtitle.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = "center", className }) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={cn("max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg", !isCenter && "mx-0")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
