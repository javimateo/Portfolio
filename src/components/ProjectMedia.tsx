"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import TerraceLivePreview from "./TerraceLivePreview";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";

const SPRING = { type: "spring", stiffness: 180, damping: 22 } as const;

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 p-4 text-center">
      <span className="font-display text-2xl font-bold text-white/10 sm:text-4xl">{title}</span>
    </div>
  );
}

// Phone screens are small; a browser frame spans most of the card and holds small UI
// text, so it asks for a much wider image at a higher quality.
const SCREENSHOT = {
  phone: { sizes: "(min-width: 768px) 260px, 40vw", quality: 75 },
  browser: { sizes: "(min-width: 1024px) 600px, (min-width: 768px) 60vw, 100vw", quality: 90 },
} as const;

function Screenshot({
  src,
  alt,
  frame,
}: {
  src: string;
  alt: string;
  frame: keyof typeof SCREENSHOT;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Placeholder title="" />;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={SCREENSHOT[frame].sizes}
      quality={SCREENSHOT[frame].quality}
      className="object-cover object-top"
      onError={() => setFailed(true)}
    />
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full aspect-[9/19.5] overflow-hidden rounded-[1.2rem] border-[4px] border-zinc-800 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <span
        aria-hidden="true"
        className="absolute top-1 left-1/2 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-zinc-800"
      />
      {children}
    </div>
  );
}

export default function ProjectMedia({ project }: { project: Project }) {
  const locale = useLocale();
  const { projects: t } = useDictionary();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const media = project.media;
  const frame = media?.frame ?? "browser";
  const images = !media?.images ? [] : Array.isArray(media.images) ? media.images : media.images[locale];
  const href = project.links?.[0]?.href ?? project.repoUrl;
  const alt = t.screenshotOf(project.title);
  // A browser frame without a video crossfades to its second screenshot on hover.
  const hoverImage = frame === "browser" && !media?.video ? images[1] : undefined;

  const startPreview = () => {
    setHovered(true);
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  };

  const stopPreview = () => {
    setHovered(false);
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  // The main screen: live widget, screenshot, or placeholder, with the optional
  // hover video fading in on top.
  const mainScreen = (
    <div className="relative h-full w-full">
      {media?.live === "terrace-weather" ? (
        <TerraceLivePreview />
      ) : images[0] ? (
        <Screenshot src={images[0]} alt={alt} frame={frame} />
      ) : (
        <Placeholder title={project.title} />
      )}
      {hoverImage && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Screenshot src={hoverImage} alt={alt} frame={frame} />
        </div>
      )}
      {media?.video && (
        <video
          ref={videoRef}
          src={media.video}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hovered && videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );

  let content: ReactNode;
  if (frame === "browser") {
    content = (
      <>
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-zinc-950 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className={media?.live ? "aspect-[4/3] sm:aspect-video" : "aspect-video"}>{mainScreen}</div>
      </>
    );
  } else {
    const trio = images.length >= 3;
    content = (
      <div
        className="relative aspect-video overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(244,196,48,0.14), transparent 60%), linear-gradient(to bottom right, #27272a, #09090b)",
        }}
      >
        {trio &&
          ([
            { src: images[1], side: -1 },
            { src: images[2], side: 1 },
          ] as const).map(({ src, side }) => (
            <motion.div
              key={src}
              className="absolute top-1/2 left-1/2 z-10 h-[76%] -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: `${side * (hovered ? 82 : 60)}%`,
                rotate: side * (hovered ? 9 : 6),
                filter: hovered ? "brightness(0.9)" : "brightness(0.6)",
              }}
              transition={SPRING}
            >
              <Phone>
                <Screenshot src={src} alt={alt} frame="phone" />
              </Phone>
            </motion.div>
          ))}
        <motion.div
          className="absolute top-1/2 left-1/2 z-20 h-[88%] -translate-x-1/2 -translate-y-1/2"
          animate={{ y: hovered ? "-3%" : "0%", scale: hovered ? 1.03 : 1 }}
          transition={SPRING}
        >
          <Phone>{mainScreen}</Phone>
        </motion.div>
      </div>
    );
  }

  return (
    <a
      href={href ?? "#"}
      target={href ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={href ? t.open(project.title) : undefined}
      aria-disabled={!href}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      className={`relative block overflow-hidden rounded-xl border border-white/10 bg-zinc-900 ${
        href ? "" : "pointer-events-none"
      }`}
    >
      {content}

      {media?.video && videoReady && (
        <span
          className={`pointer-events-none absolute right-3 bottom-3 z-30 flex items-center gap-1.5 rounded-full border border-white/10 bg-background/80 px-3 py-1 font-mono text-xs text-foreground/80 backdrop-blur-sm transition-opacity duration-300 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-accent" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          {t.video}
        </span>
      )}
    </a>
  );
}
