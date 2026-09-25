"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { bio, education, experience, quickFacts } from "@/data/about";
import GithubContributions from "./GithubContributions";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -15% 0px" } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function StarNode() {
  return (
    <motion.span
      aria-hidden="true"
      variants={{
        hidden: { scale: 0, opacity: 0 },
        show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: EASE } },
      }}
      className="absolute top-1.5 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent/50 bg-background shadow-[0_0_12px_2px_rgba(244,196,48,0.35)]"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
    </motion.span>
  );
}

// A vertical timeline whose line draws itself as the reader scrolls through it.
function Timeline({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div>
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={fadeUp}
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent/80"
      >
        <span aria-hidden="true" className="h-px w-5 bg-accent/60" />
        {title}
      </motion.p>
      <div ref={ref} className="relative mt-6">
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-white/10" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-accent to-accent/20"
        />
        <ol className="flex flex-col gap-10">{children}</ol>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="sobre-mi" className="w-full max-w-5xl px-6 py-32">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="font-mono text-sm uppercase tracking-widest text-accent"
          >
            Sobre mí
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Quién soy
          </motion.h2>
          {bio.map((paragraph) => (
            <motion.p
              key={paragraph}
              variants={fadeUp}
              className="mt-6 text-lg leading-relaxed text-foreground/70"
            >
              {paragraph}
            </motion.p>
          ))}
          <motion.dl variants={fadeUp} className="mt-10 flex flex-col gap-4">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="border-l border-accent/40 pl-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-foreground/50">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-foreground/90">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="flex flex-col gap-16">
          <Timeline title="Experiencia">
            {experience.map((job) => (
              <motion.li
                key={job.org}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={stagger}
                className="relative pl-10"
              >
                <StarNode />
                <motion.h3 variants={fadeUp} className="font-display text-xl font-bold">
                  {job.role}
                </motion.h3>
                <motion.p variants={fadeUp} className="mt-1 text-foreground/60">
                  {job.org}
                  {job.period && <span className="font-mono text-sm"> · {job.period}</span>}
                </motion.p>
                <motion.ul
                  variants={fadeUp}
                  className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-foreground/70 marker:text-accent/60"
                >
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </motion.ul>
                <motion.ul variants={fadeUp} className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-foreground/60"
                    >
                      {tech}
                    </li>
                  ))}
                </motion.ul>
              </motion.li>
            ))}
          </Timeline>

          <Timeline title="Formación">
            {education.map((item) => (
              <motion.li
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={stagger}
                className="relative pl-10"
              >
                <StarNode />
                <motion.p variants={fadeUp} className="font-mono text-sm text-accent/80">
                  {item.period}
                  {item.inProgress && (
                    <span className="ml-3 rounded-full border border-accent/40 px-2 py-0.5 text-xs text-accent">
                      En curso
                    </span>
                  )}
                </motion.p>
                <motion.h3 variants={fadeUp} className="mt-1 font-display text-lg font-bold">
                  {item.title}
                </motion.h3>
                <motion.p variants={fadeUp} className="mt-1 text-foreground/60">
                  {item.school}
                </motion.p>
              </motion.li>
            ))}
          </Timeline>
        </div>
      </div>

      <GithubContributions />
    </section>
  );
}
