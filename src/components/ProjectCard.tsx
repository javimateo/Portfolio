"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import TiltFrame from "./TiltFrame";
import ProjectMedia from "./ProjectMedia";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";
import { track } from "@/lib/analytics";

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
  const locale = useLocale();
  const { projects: t } = useDictionary();

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
        className={`w-full text-left md:w-2/5 ${reverse ? "md:text-right" : ""}`}
      >
        <motion.p
          variants={textItem}
          className="font-mono text-sm uppercase tracking-widest text-accent"
        >
          {project.eyebrow[locale]}
        </motion.p>
        <motion.h3
          variants={textItem}
          className="mt-2 font-display text-2xl font-bold sm:text-3xl"
        >
          {project.title}
        </motion.h3>
        <motion.p variants={textItem} className="mt-4 text-foreground/70">
          {project.description[locale]}
        </motion.p>
        <motion.ul
          variants={textItem}
          className={`mt-4 flex list-disc flex-col gap-2 pl-5 text-sm text-foreground/60 marker:text-accent/60 md:list-none md:pl-0 ${
            reverse ? "md:items-end" : "md:items-start"
          }`}
        >
          {project.bullets[locale].map((bullet) => (
            <li key={bullet} className="max-w-md">
              {bullet}
            </li>
          ))}
        </motion.ul>
        <motion.ul
          variants={textItem}
          className={`mt-5 flex flex-wrap gap-2 ${reverse ? "md:justify-end" : ""}`}
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
            className={`mt-5 flex flex-wrap gap-x-4 gap-y-2 ${reverse ? "md:justify-end" : ""}`}
          >
            {project.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => track("project-link", { project: project.slug, link: link.kind })}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-wider text-accent transition-opacity hover:opacity-80"
              >
                {link.label[locale]} ↗
              </a>
            ))}
            <a
              href={project.repoUrl}
              onClick={() => track("project-link", { project: project.slug, link: "github" })}
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
            {t.privateRepo}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
