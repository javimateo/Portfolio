"use client";

import { useId, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { skillConstellations, type SkillConstellation } from "@/data/skills";
import SkillIcon from "./SkillIcon";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -15% 0px" } as const;

// The box is 4:3, so the SVG uses a matching 100×75 viewBox to scale uniformly
// and stay aligned with the HTML stars, which are positioned in percentages.
const VIEW_H = 75;

const starVariants = {
  hidden: { opacity: 0, scale: 0 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.15 + i * 0.12, duration: 0.45, ease: EASE },
  }),
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 0.6,
    transition: { delay: 0.55 + i * 0.2, duration: 0.8, ease: "easeInOut" as const },
  }),
};

function Constellation({
  constellation,
  className = "",
  style,
}: {
  constellation: SkillConstellation;
  className?: string;
  style?: CSSProperties;
}) {
  const { name, stars, links } = constellation;
  const gradientPrefix = useId();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`aspect-[4/3] ${className}`}
      style={style}
    >
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 12 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
        }}
        className="absolute top-0 left-0 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent/80"
      >
        <span aria-hidden="true" className="h-px w-5 bg-accent/60" />
        {name}
      </motion.p>

      <svg
        viewBox={`0 0 100 ${VIEW_H}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {links.map(([a, b], i) => (
            <linearGradient
              key={i}
              id={`${gradientPrefix}-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={stars[a].x}
              y1={(stars[a].y * VIEW_H) / 100}
              x2={stars[b].x}
              y2={(stars[b].y * VIEW_H) / 100}
            >
              <stop offset="0%" stopColor={stars[a].color} />
              <stop offset="100%" stopColor={stars[b].color} />
            </linearGradient>
          ))}
        </defs>
        {links.map(([a, b], i) => (
          <motion.line
            key={`${a}-${b}`}
            x1={stars[a].x}
            y1={(stars[a].y * VIEW_H) / 100}
            x2={stars[b].x}
            y2={(stars[b].y * VIEW_H) / 100}
            stroke={`url(#${gradientPrefix}-${i})`}
            strokeWidth="0.35"
            strokeLinecap="round"
            custom={i}
            variants={lineVariants}
          />
        ))}
      </svg>

      {stars.map((star, i) => (
        // The anchor div is what sits on the (x, y) point, so the icon's centre —
        // not the icon + label block — is where the lines meet.
        <div
          key={star.name}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${star.x}%`, top: `${star.y}%`, "--star": star.color } as CSSProperties}
        >
          <motion.div
            custom={i}
            variants={starVariants}
            className="relative flex h-12 w-12 items-center justify-center"
          >
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [0.55, 0.2, 0.55] }}
              transition={{
                duration: 2.4 + (i % 3) * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
              className="absolute -inset-1 rounded-full blur-lg transition-transform duration-300 group-hover:scale-125"
              style={{ background: star.color }}
            />
            <span
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--star)]"
              style={{
                background:
                  "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--star) 22%, #0a0a0a), #0a0a0a 72%)",
              }}
            >
              <SkillIcon icon={star.icon} color={star.color} size={26} />
            </span>
            <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-foreground/80 transition-colors duration-300 group-hover:text-[var(--star)]">
              {star.name}
            </span>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

// Where each constellation floats inside the desktop galaxy, in % of the galaxy.
// Every region is 32% wide and keeps its 4:3 shape, so its stars stay put.
const GALAXY_LAYOUT: Record<string, { left: number; top: number }> = {
  Frontend: { left: 0, top: 3 },
  Backend: { left: 34, top: 0 },
  "Bases de datos": { left: 68, top: 7 },
  "Cloud y DevOps": { left: 3, top: 51 },
  "Arquitectura y redes": { left: 35, top: 57 },
  "Mobile y otros": { left: 67, top: 52 },
};

function Nebula() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute top-[8%] left-[-10%] h-[70%] w-[60%] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(244,196,48,0.07), transparent)" }}
      />
      <div
        className="absolute top-[-5%] left-[35%] h-[65%] w-[55%] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.10), transparent)" }}
      />
      <div
        className="absolute top-[45%] left-[55%] h-[65%] w-[55%] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(30,144,255,0.08), transparent)" }}
      />
      {/* faint diagonal band, like the Milky Way */}
      <div
        className="absolute top-[30%] left-[-10%] h-[40%] w-[120%] -rotate-12"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.035), transparent)",
        }}
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="flex w-full max-w-6xl flex-col items-center py-32 sm:px-6">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: EASE }}
        className="font-mono text-sm uppercase tracking-widest text-accent"
      >
        Stack
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        className="mt-3 font-display text-4xl font-bold sm:text-5xl"
      >
        Con qué trabajo
      </motion.h2>

      <div className="relative isolate mt-20 w-full">
        <Nebula />

        {/* Desktop: one open galaxy with the constellations floating freely */}
        <div className="relative hidden aspect-[16/10] w-full lg:block">
          {skillConstellations.map((c) => {
            const pos = GALAXY_LAYOUT[c.name];
            return (
              <Constellation
                key={c.name}
                constellation={c}
                className="absolute w-[32%]"
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              />
            );
          })}
        </div>

        {/* Smaller screens: the same constellations stacked, still borderless */}
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:hidden">
          {skillConstellations.map((c) => (
            <Constellation key={c.name} constellation={c} className="relative w-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
