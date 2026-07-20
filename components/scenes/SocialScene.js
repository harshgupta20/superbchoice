"use client";

import { Heart, MessageCircle, BadgeCheck } from "lucide-react";
import Scene from "@/components/experience/Scene";
import RevealText from "@/components/experience/RevealText";
import { socialPosts } from "@/lib/experience";

const TILE = [
  "radial-gradient(90% 80% at 70% 25%, rgba(255,211,105,0.45), transparent 60%), #17130f",
  "radial-gradient(90% 80% at 30% 70%, rgba(122,91,255,0.4), transparent 60%), #12111c",
  "radial-gradient(90% 80% at 50% 30%, rgba(255,120,140,0.4), transparent 60%), #1a1114",
  "radial-gradient(90% 80% at 60% 40%, rgba(80,200,255,0.38), transparent 60%), #0f1418",
];

function MiniMoon({ i }) {
  const g = ["rgba(255,196,120,0.7)", "rgba(160,150,255,0.6)", "rgba(255,150,170,0.6)", "rgba(120,210,255,0.55)"][i % 4];
  return (
    <span
      className="relative block h-14 w-14 rounded-full"
      style={{
        background: [
          `radial-gradient(circle at 50% 80%, ${g} 0%, transparent 55%)`,
          "radial-gradient(circle at 38% 30%, rgba(255,255,255,0.28), transparent 42%)",
          "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1), rgba(0,0,0,0.4) 92%)",
        ].join(","),
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: `inset 0 0 10px rgba(255,255,255,0.12), 0 0 20px ${g}`,
      }}
    >
      <span
        className="absolute left-1/2 top-[14%] h-2.5 w-6 -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,244,214,0.9), transparent 70%)", filter: "blur(1px)" }}
      />
    </span>
  );
}

function PostCard({ post, i }) {
  return (
    <figure className="mb-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-gold via-rose-400 to-fuchsia-500 text-[10px] font-bold text-night-950">
          {post.handle.slice(0, 2).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1 truncate text-xs font-semibold text-white">
            {post.handle} <BadgeCheck size={11} className="text-gold" />
          </p>
          <p className="truncate text-[10px] text-white/45">{post.city}</p>
        </div>
      </div>
      <div className="relative flex h-32 items-center justify-center" style={{ background: TILE[i % TILE.length] }}>
        <MiniMoon i={i} />
        <span className="absolute bottom-1.5 right-2 text-sm">{post.reactions.join("")}</span>
      </div>
      <div className="px-3 py-2.5">
        <div className="flex items-center gap-3 text-white/80">
          <span className="flex items-center gap-1 text-[11px]">
            <Heart size={13} className="fill-rose-400 text-rose-400" /> {post.likes}
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <MessageCircle size={13} /> reply
          </span>
        </div>
        <p className="mt-1.5 text-[11px] leading-snug text-white/70">
          <span className="font-semibold text-white">{post.handle}</span> {post.caption}
        </p>
        <p className="mt-1 text-[11px] italic leading-snug text-white/45">“{post.comment}”</p>
      </div>
    </figure>
  );
}

export default function SocialScene() {
  const colA = [socialPosts[0], socialPosts[2], socialPosts[4]];
  const colB = [socialPosts[1], socialPosts[3], socialPosts[5]];

  return (
    <Scene id="social" className="justify-start pt-24">
      <RevealText as="h2" className="mb-2 text-center font-display text-3xl font-extrabold leading-tight text-white">
        10,000 Rooms. <span className="text-gradient-gold">One Moon.</span>
      </RevealText>
      <RevealText delay={0.1} className="mb-6 text-center text-sm text-white/55">
        Real people. Real glow-ups.
      </RevealText>

      <div className="relative grid h-[62svh] w-full grid-cols-2 gap-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee-y">
          {[...colA, ...colA].map((p, i) => (
            <PostCard key={`a-${i}`} post={p} i={i} />
          ))}
        </div>
        <div className="animate-marquee-y" style={{ animationDirection: "reverse", animationDuration: "34s" }}>
          {[...colB, ...colB].map((p, i) => (
            <PostCard key={`b-${i}`} post={p} i={i + 1} />
          ))}
        </div>
      </div>
    </Scene>
  );
}
