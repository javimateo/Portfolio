"use client";

import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import { skillConstellations, type SkillStar } from "@/data/skills";
import SkillIcon from "./SkillIcon";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -15% 0px" } as const;
const LOGO_SIZE = 40;

const rowVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function SkillLogo({ skill }: { skill: SkillStar }) {
  const src = `/icons/skills/color/${skill.icon}.svg`;

  if (skill.logo === "color") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" width={LOGO_SIZE} height={LOGO_SIZE} className="shrink-0" />;
  }

  if (skill.logo === "badge") {
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-lg bg-neutral-100 p-1.5"
        style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="h-full w-full" />
      </span>
    );
  }

  return <SkillIcon icon={skill.icon} color={skill.color} size={LOGO_SIZE - 4} />;
}

export default function SkillsGrid() {
  return (
    <section className="flex w-full max-w-5xl flex-col items-center px-6 pb-32">
      <p className="rounded-full border border-dashed border-white/20 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground/50">
        Opción B · rejilla (para comparar)
      </p>

      <div className="mt-16 flex w-full flex-col gap-16 md:gap-20">
        {skillConstellations.map((group) => (
          <motion.div
            key={group.name}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={rowVariants}
            className="group/row grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12"
          >
            <motion.h3
              variants={fadeUp}
              className="font-display text-4xl leading-[0.95] font-bold tracking-tight text-foreground/30 uppercase transition-colors duration-500 group-hover/row:text-foreground/60 sm:text-5xl"
            >
              {group.name}
            </motion.h3>

            <ul className="flex flex-wrap content-start gap-x-10 gap-y-7">
              {group.stars.map((skill) => (
                <motion.li
                  key={skill.name}
                  variants={fadeUp}
                  className="group flex items-center gap-4"
                  style={{ "--star": skill.color } as CSSProperties}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    <SkillLogo skill={skill} />
                  </span>
                  <span className="text-lg text-foreground/90 transition-colors duration-300 group-hover:text-[var(--star)] sm:text-xl">
                    {skill.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
