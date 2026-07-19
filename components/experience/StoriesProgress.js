"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Moon, Volume2, X } from "lucide-react";
import { brand } from "@/lib/config";

function Segment({ p, index, count }) {
  const start = index / count;
  const width = useTransform(p, [start, (index + 1) / count], ["0%", "100%"], { clamp: true });
  return (
    <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
      <motion.span className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width }} />
    </span>
  );
}

/** Instagram Stories–style chrome pinned to the top: segmented progress + handle row. */
export default function StoriesProgress({ segments = 9 }) {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-2.5">
      <div className="mx-auto flex max-w-md flex-col gap-2">
        <div className="flex gap-1">
          {Array.from({ length: segments }).map((_, i) => (
            <Segment key={i} p={p} index={i} count={segments} />
          ))}
        </div>
        <div className="flex items-center gap-2 px-0.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient text-night-950">
            <Moon size={14} className="fill-night-950" />
          </span>
          <span className="text-sm font-semibold text-white drop-shadow">{brand.handle}</span>
          <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white/90">
            Ad
          </span>
          <span className="ml-auto flex items-center gap-3 text-white/80">
            <Volume2 size={17} />
            <X size={19} />
          </span>
        </div>
      </div>
    </div>
  );
}
