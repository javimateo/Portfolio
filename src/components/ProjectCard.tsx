"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import CircularCursor from "./CircularCursor";

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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-10 flex flex-col gap-8 md:gap-4 items-center ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div ref={mediaRef} className="w-full md:w-3/5">
        <CircularCursor label="Ver repo">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-zinc-950 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            </div>
            <a
              href={project.repoUrl ?? "#"}
              target={project.repoUrl ? "_blank" : undefined}
              rel="noreferrer"
              aria-disabled={!project.repoUrl}
              className={`flex aspect-video items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 ${
                !project.repoUrl ? "pointer-events-none" : ""
              }`}
            >
              <span className="font-display text-4xl font-bold text-white/10">
                {project.title}
              </span>
            </a>
          </div>
        </CircularCursor>
      </div>

      <div
        className={`w-full md:w-2/5 ${
          reverse ? "md:text-right" : "md:text-left"
        } text-center md:text-left`}
      >
        <p className="font-mono text-sm uppercase tracking-widest text-accent">
          {project.eyebrow}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 text-foreground/70">{project.description}</p>
        <ul
          className={`mt-4 flex flex-col gap-2 text-sm text-foreground/60 ${
            reverse ? "md:items-end" : "md:items-start"
          } items-center md:text-left text-center`}
        >
          {project.bullets.map((bullet) => (
            <li key={bullet} className="max-w-md">
              {bullet}
            </li>
          ))}
        </ul>
        <ul
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
        </ul>
        {project.repoUrl && (
          <div
            className={`mt-5 flex gap-4 ${
              reverse ? "md:justify-end" : "md:justify-start"
            } justify-center`}
          >
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-foreground/70 transition-colors hover:text-accent"
            >
              GitHub ↗
            </a>
          </div>
        )}
        {!project.repoUrl && (
          <p className="mt-5 font-mono text-xs uppercase tracking-wider text-foreground/40">
            Repositorio privado
          </p>
        )}
      </div>
    </motion.div>
  );
}
