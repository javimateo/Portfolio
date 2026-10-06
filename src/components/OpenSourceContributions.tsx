"use client";

import { motion } from "framer-motion";
import { contributions } from "@/data/contributions";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";

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
  const locale = useLocale();
  const { openSource } = useDictionary();

  return (
    <div className="mt-24 w-full sm:mt-28">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-sm uppercase tracking-widest text-accent"
      >
        {openSource.eyebrow}
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 font-display text-3xl font-bold sm:text-4xl"
      >
        {openSource.title}
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
                {c.description[locale]}
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 self-start rounded-full border border-[#a371f7]/40 bg-[#a371f7]/10 px-3 py-1 font-mono text-xs text-[#c4a5fb] sm:self-center">
              {/* GitHub's "merged" icon and colour */}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z" />
              </svg>
              {c.status[locale]}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
