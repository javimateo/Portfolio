"use client";

import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import { skillConstellations, type SkillStar } from "@/data/skills";
import SkillIcon from "./SkillIcon";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";

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
  const locale = useLocale();
  const { skills } = useDictionary();

  return (
    <section id="skills" className="flex w-full max-w-5xl flex-col items-center py-20 sm:px-6 sm:py-32">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: EASE }}
        className="font-mono text-sm uppercase tracking-widest text-accent"
      >
        {skills.eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        className="mt-3 font-display text-4xl font-bold sm:text-5xl"
      >
        {skills.title}
      </motion.h2>

      <div className="mt-14 flex w-full flex-col gap-12 sm:mt-16 sm:gap-16 md:gap-20">
        {skillConstellations.map((group) => (
          <motion.div
            key={group.name.es}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={rowVariants}
            className="group/row grid gap-6 sm:gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12"
          >
            <motion.h3
              variants={fadeUp}
              className="font-display text-3xl leading-[0.95] font-bold tracking-tight text-foreground/30 uppercase transition-colors duration-500 group-hover/row:text-foreground/60 sm:text-5xl"
            >
              {group.name[locale]}
            </motion.h3>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:flex sm:flex-wrap sm:content-start sm:gap-x-10 sm:gap-y-7">
              {group.stars.map((skill) => (
                <motion.li
                  key={skill.icon}
                  variants={fadeUp}
                  className="group flex min-w-0 items-center gap-3 sm:gap-4"
                  style={{ "--star": skill.color } as CSSProperties}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    <SkillLogo skill={skill} />
                  </span>
                  <span className="text-base text-foreground/90 transition-colors duration-300 group-hover:text-[var(--star)] sm:text-xl">
                    {typeof skill.name === "string" ? skill.name : skill.name[locale]}
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
