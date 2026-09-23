"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import TiltFrame from "./TiltFrame";
import ProjectMedia from "./ProjectMedia";

const viewport = { once: true, margin: "0px 0px -15% 0px" } as const;

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const textItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ProjectCard({
  project,
  reverse,
  mediaRef,
}: {
  project: Project;
  reverse: boolean;
  mediaRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      className={`relative z-10 flex flex-col gap-8 md:gap-4 items-center ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <motion.div
        ref={mediaRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-3/5"
      >
        <TiltFrame>
          <ProjectMedia project={project} />
        </TiltFrame>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={textContainer}
        className={`w-full md:w-2/5 ${
          reverse ? "md:text-right" : "md:text-left"
        } text-center md:text-left`}
      >
        <motion.p
          variants={textItem}
          className="font-mono text-sm uppercase tracking-widest text-accent"
        >
          {project.eyebrow}
        </motion.p>
        <motion.h3
          variants={textItem}
          className="mt-2 font-display text-2xl font-bold sm:text-3xl"
        >
          {project.title}
        </motion.h3>
        <motion.p variants={textItem} className="mt-4 text-foreground/70">
          {project.description}
        </motion.p>
        <motion.ul
          variants={textItem}
          className={`mt-4 flex flex-col gap-2 text-sm text-foreground/60 ${
            reverse ? "md:items-end" : "md:items-start"
          } items-center md:text-left text-center`}
        >
          {project.bullets.map((bullet) => (
            <li key={bullet} className="max-w-md">
              {bullet}
            </li>
          ))}
        </motion.ul>
        <motion.ul
          variants={textItem}
          className={`mt-5 flex flex-wrap gap-2 ${
            reverse ? "md:justify-end" : "md:justify-start"
          } justify-center`}
        >
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-foreground/60"
            >
              {tech}
            </li>
          ))}
        </motion.ul>
        {project.repoUrl && (
          <motion.div
            variants={textItem}
            className={`mt-5 flex gap-4 ${
              reverse ? "md:justify-end" : "md:justify-start"
            } justify-center`}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-wider text-accent transition-opacity hover:opacity-80"
              >
                Ver en vivo ↗
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-foreground/70 transition-colors hover:text-accent"
            >
              GitHub ↗
            </a>
          </motion.div>
        )}
        {!project.repoUrl && (
          <motion.p
            variants={textItem}
            className="mt-5 font-mono text-xs uppercase tracking-wider text-foreground/40"
          >
            Repositorio privado
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
