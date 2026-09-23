"use client";

import { motion } from "framer-motion";
import TiltPhoto from "./TiltPhoto";
import { useIsLoaded } from "./LoadingProvider";

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

export default function Hero() {
  const isLoaded = useIsLoaded();

  return (
    <section
      id="inicio"
      className="flex min-h-screen w-full max-w-6xl flex-col-reverse items-center gap-16 px-6 pt-32 pb-20 md:flex-row md:items-center md:justify-between md:pt-0"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="flex max-w-2xl flex-col items-center text-center md:items-start md:text-left"
      >
        <motion.p
          variants={item}
          className="font-mono text-base uppercase tracking-widest text-accent"
        >
          Full-Stack Developer
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-4 font-display text-6xl font-bold leading-tight sm:text-7xl lg:text-8xl"
        >
          Javier Mateo
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 text-xl text-foreground/70"
        >
          Desarrollador full-stack especializado en Angular, TypeScript y
          Node.js. Máster en Full Stack Developer por UNIR, buscando mi
          primera posición como desarrollador.
        </motion.p>
        <motion.div variants={item} className="mt-8 flex gap-4">
          <a
            href="#proyectos"
            className="rounded-full bg-accent px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-black transition-transform hover:scale-105"
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-white/20 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Contacto
          </a>
        </motion.div>
      </motion.div>

      <TiltPhoto isLoaded={isLoaded} />
    </section>
  );
}
