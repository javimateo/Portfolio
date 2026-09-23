"use client";

import { motion } from "framer-motion";
import { contributions } from "@/data/contributions";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function OpenSourceContributions() {
  return (
    <div className="mt-28 w-full">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-sm uppercase tracking-widest text-accent"
      >
        Open source
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 font-display text-3xl font-bold sm:text-4xl"
      >
        Contribuciones a proyectos de otros
      </motion.h3>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        variants={container}
        className="mt-10 flex flex-col gap-4"
      >
        {contributions.map((c) => (
          <motion.a
            key={c.prUrl}
            variants={item}
            href={c.prUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-2 rounded-xl border border-white/10 p-5 transition-colors hover:border-accent/50 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-foreground/50">
                {c.repo}
              </p>
              <h4 className="mt-1 font-display text-lg font-bold transition-colors group-hover:text-accent">
                {c.prTitle}
              </h4>
              <p className="mt-2 max-w-2xl text-sm text-foreground/70">
                {c.description}
              </p>
            </div>
            <span className="shrink-0 self-start rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-foreground/60 sm:self-center">
              {c.status}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
