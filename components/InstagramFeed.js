"use client";

import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, Grid3x3 } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import MoonLamp from "./ui/MoonLamp";
import { instagramPosts } from "@/lib/data";
import { brand } from "@/lib/config";
import { staggerContainer, scaleIn, revealViewport } from "@/lib/utils";

const TILE_BG = [
  "radial-gradient(120% 90% at 70% 20%, rgba(255,211,105,0.35), transparent 55%), #131110",
  "radial-gradient(120% 90% at 30% 70%, rgba(255,211,105,0.28), transparent 55%), #141414",
  "radial-gradient(110% 90% at 50% 30%, rgba(255,211,105,0.32), transparent 55%), #17130f",
];

export default function InstagramFeed() {
  return (
    <section id="instagram" className="section-pad">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Join the community"
          title="10,000+ rooms already glowing"
          subtitle="Follow the tag, get inspired, and show off your own setup."
        />

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-5 rounded-3xl glass p-6 sm:flex-row sm:gap-7"
        >
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-gold-deep via-gold to-fuchsia-500 p-[3px]">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-night-950">
              <Instagram size={30} className="text-white" />
            </span>
          </span>
          <div className="flex flex-1 flex-col items-center gap-3 sm:items-start">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <p className="font-display text-lg font-bold text-white">@{brand.handle}</p>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold-gradient px-5 py-1.5 text-xs font-bold text-night-950"
              >
                Follow
              </a>
            </div>
            <div className="flex gap-6 text-center text-sm sm:text-left">
              <span>
                <span className="font-bold text-white">248</span>{" "}
                <span className="text-white/55">posts</span>
              </span>
              <span>
                <span className="font-bold text-white">52.3k</span>{" "}
                <span className="text-white/55">followers</span>
              </span>
              <span>
                <span className="font-bold text-white">4.9★</span>{" "}
                <span className="text-white/55">rated</span>
              </span>
            </div>
            <p className="text-center text-sm text-white/60 sm:text-left">
              🌙 Aesthetic Moon Lamps · Free shipping · COD available · Tag us to be featured
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-6 grid grid-cols-3 gap-2 sm:gap-3"
        >
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={scaleIn}
              className="group relative block aspect-square overflow-hidden rounded-xl border border-white/10"
              style={{ background: TILE_BG[i % TILE_BG.length] }}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110">
                <MoonLamp size={70} withBase={false} />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-4 text-xs font-semibold text-white">
                  <span className="flex items-center gap-1">
                    <Heart size={15} className="fill-white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={15} /> {(i + 3) * 7}
                  </span>
                </span>
                <p className="px-3 text-center text-[11px] text-white/85">{post.caption}</p>
              </div>
              <Grid3x3 size={13} className="absolute right-2 top-2 text-white/50" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
