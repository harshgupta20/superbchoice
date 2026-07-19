"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X, Heart, MessageCircle, Send, Bookmark, Volume2 } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import MoonLamp from "./ui/MoonLamp";
import CTAButton from "./ui/CTAButton";
import { whatsappLink, brand } from "@/lib/config";
import { revealViewport } from "@/lib/utils";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="section-pad">
      <div className="container-tight">
        <SectionHeading
          eyebrow="See the glow in motion"
          title="Watch it light up a room"
          subtitle="The warm glow, the real lunar texture, the color modes — it hits different on video."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7 }}
          className="mt-14 flex flex-col items-center"
        >
          {/* Reel frame (9:16) */}
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[2rem] border border-white/15 shadow-card"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 30%, rgba(255,211,105,0.35), transparent 55%), linear-gradient(170deg,#1a1613,#0b0b0b)",
            }}
            aria-label="Play video"
          >
            {/* In-scene moon */}
            <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
              <MoonLamp size={150} />
            </div>

            {/* Reel UI overlay */}
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-5 text-white">
              <span className="flex flex-col items-center gap-1 text-[10px] font-medium">
                <Heart size={22} className="fill-white/90" /> 12.4k
              </span>
              <span className="flex flex-col items-center gap-1 text-[10px] font-medium">
                <MessageCircle size={22} /> 842
              </span>
              <span className="flex flex-col items-center gap-1 text-[10px] font-medium">
                <Send size={22} /> Share
              </span>
              <Bookmark size={22} />
            </div>

            {/* Play button */}
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-night-950 shadow-glow transition-transform duration-300 group-hover:scale-110">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
              <Play size={26} className="relative ml-1 fill-night-950" />
            </span>

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-left">
              <p className="text-sm font-semibold text-white">@{brand.handle}</p>
              <p className="text-xs text-white/75">POV: your room finally has the vibe 🌙✨</p>
            </div>
            <Volume2 size={16} className="absolute bottom-4 right-4 text-white/80" />
          </button>

          <CTAButton href={whatsappLink()} size="lg" className="mt-9">
            I Want This Glow — Order Now
          </CTAButton>
        </motion.div>
      </div>

      {/* Video modal (placeholder player frame) */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlaying(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
          >
            <button
              type="button"
              aria-label="Close video"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full glass text-white"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex aspect-[9/16] w-full max-w-[340px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/15"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 35%, rgba(255,211,105,0.4), transparent 55%), linear-gradient(170deg,#1a1613,#0b0b0b)",
              }}
            >
              <div className="animate-float">
                <MoonLamp size={190} />
              </div>
              <p className="mt-6 px-6 text-center text-sm text-white/70">
                Add your Instagram Reel or product video here.
                <br />
                <span className="text-white/50">
                  Drop an MP4 or embed and replace this placeholder.
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
