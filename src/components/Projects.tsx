"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import OpenSourceContributions from "./OpenSourceContributions";
// import ProjectConstellation from "./ProjectConstellation";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section
      id="proyectos"
      className="flex w-full max-w-5xl flex-col items-center px-6 py-32"
    >
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-sm uppercase tracking-widest text-accent"
      >
        Algunos proyectos
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 font-display text-4xl font-bold sm:text-5xl"
      >
        Cosas que he construido
      </motion.h2>

      <div ref={containerRef} className="relative mt-20 flex w-full flex-col gap-24">
        {/* Temporarily disabled to compare the look without connecting lines */}
        {/* <ProjectConstellation containerRef={containerRef} anchorRefs={anchorRefs} /> */}
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            reverse={i % 2 === 1}
            mediaRef={(el) => {
              anchorRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      <OpenSourceContributions />
    </section>
  );
}
