"use client";

import { motion } from "framer-motion";
import TiltPhoto from "./TiltPhoto";
import { useIsLoaded } from "./LoadingProvider";
import { useDictionary } from "@/i18n/LocaleProvider";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero({ cv }: { cv?: string }) {
  const isLoaded = useIsLoaded();
  const { hero } = useDictionary();

  return (
    <section
      id="home"
      className="flex min-h-svh w-full max-w-6xl flex-col-reverse items-center gap-10 pt-28 pb-16 sm:gap-16 sm:px-6 sm:pt-32 sm:pb-20 md:flex-row md:items-center md:justify-between md:pt-0"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="flex max-w-2xl flex-col items-center text-center md:items-start md:text-left"
      >
        <motion.p
          variants={item}
          className="font-mono text-sm uppercase tracking-widest text-accent sm:text-base"
        >
          {hero.role}
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-3 font-display text-5xl font-bold leading-tight sm:mt-4 sm:text-7xl lg:text-8xl"
        >
          Javier Mateo
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-5 text-lg text-foreground/70 sm:mt-6 sm:text-xl"
        >
          {hero.intro}
        </motion.p>
        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 md:justify-start"
        >
          <a
            href="#projects"
            className="rounded-full bg-accent px-5 py-3 font-mono text-xs sm:px-7 sm:py-3.5 sm:text-sm uppercase tracking-wider text-black transition-transform hover:scale-105"
          >
            {hero.projects}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-5 py-3 font-mono text-xs sm:px-7 sm:py-3.5 sm:text-sm uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {hero.contact}
          </a>
          {cv && (
            <a
              href={cv}
              download
              className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-mono text-xs sm:px-7 sm:py-3.5 sm:text-sm uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M11 3h2v10.17l3.59-3.58L18 11l-6 6-6-6 1.41-1.41L11 13.17V3ZM5 19h14v2H5v-2Z" />
              </svg>
              {hero.cv}
            </a>
          )}
        </motion.div>
      </motion.div>

      <TiltPhoto isLoaded={isLoaded} />
    </section>
  );
}
