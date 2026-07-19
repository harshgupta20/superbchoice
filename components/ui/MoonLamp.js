import { cn } from "@/lib/utils";

// Crater positions (in %), size (px-ish, scaled by container) and opacity.
const CRATERS = [
  { top: 22, left: 30, size: 12, o: 0.5 },
  { top: 34, left: 62, size: 18, o: 0.45 },
  { top: 55, left: 40, size: 22, o: 0.5 },
  { top: 68, left: 66, size: 13, o: 0.4 },
  { top: 44, left: 20, size: 9, o: 0.4 },
  { top: 74, left: 34, size: 8, o: 0.35 },
  { top: 18, left: 55, size: 7, o: 0.35 },
  { top: 60, left: 76, size: 6, o: 0.35 },
  { top: 30, left: 45, size: 6, o: 0.3 },
  { top: 50, left: 58, size: 10, o: 0.4 },
];

/**
 * A pure-CSS, image-free realistic Moon Lamp — sphere shading, lunar craters,
 * a warm ambient glow and an optional hand-finished wooden cradle base.
 *
 * @param {object} props
 * @param {number} [props.size=320]   Diameter of the moon in px.
 * @param {boolean} [props.withBase=true] Render the wooden cradle base.
 * @param {string} [props.className]
 */
export default function MoonLamp({ size = 320, withBase = true, className }) {
  return (
    <div
      className={cn("relative flex flex-col items-center", className)}
      style={{ width: size }}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulse-glow"
        style={{
          width: size * 1.55,
          height: size * 1.55,
          background:
            "radial-gradient(circle, rgba(255,211,105,0.55) 0%, rgba(255,211,105,0.18) 45%, transparent 70%)",
        }}
      />

      {/* Moon sphere */}
      <div
        className="relative rounded-full"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at 34% 30%, #fff7e4 0%, #ffe9bd 32%, #ffd369 58%, #d99f3c 82%, #a86f22 100%)",
          boxShadow:
            "inset -28px -30px 60px rgba(120,74,15,0.55), inset 18px 16px 40px rgba(255,255,255,0.35), 0 0 70px rgba(255,211,105,0.45)",
        }}
      >
        {/* Craters */}
        {CRATERS.map((c, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: `${c.size}%`,
              height: `${c.size}%`,
              background:
                "radial-gradient(circle at 40% 35%, rgba(120,80,25,0.55) 0%, rgba(160,110,40,0.25) 55%, transparent 75%)",
              boxShadow: "inset -2px -2px 4px rgba(255,240,200,0.35)",
              opacity: c.o,
            }}
          />
        ))}

        {/* Soft top highlight */}
        <span
          className="absolute rounded-full"
          style={{
            top: "10%",
            left: "22%",
            width: "35%",
            height: "28%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </div>

      {/* Wooden cradle base */}
      {withBase && (
        <div
          className="relative -mt-2"
          style={{ width: size * 0.62, height: size * 0.16 }}
        >
          {/* Two angled legs */}
          <div
            className="absolute left-1/2 top-0 h-full origin-top -translate-x-1/2 rounded-b-md"
            style={{
              width: size * 0.09,
              transform: "translateX(-90%) rotate(20deg)",
              background: "linear-gradient(180deg,#7a4a1e,#5a3413)",
              boxShadow: "inset 2px 0 3px rgba(255,220,160,0.3)",
            }}
          />
          <div
            className="absolute left-1/2 top-0 h-full origin-top rounded-b-md"
            style={{
              width: size * 0.09,
              transform: "translateX(-10%) rotate(-20deg)",
              background: "linear-gradient(180deg,#7a4a1e,#5a3413)",
              boxShadow: "inset -2px 0 3px rgba(255,220,160,0.3)",
            }}
          />
          {/* Base bar */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: size * 0.6,
              height: size * 0.05,
              background: "linear-gradient(180deg,#8a5623,#5a3413)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </div>
  );
}
