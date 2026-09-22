"use client";

import { useRef } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectConstellation from "./ProjectConstellation";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section
      id="proyectos"
      className="flex w-full max-w-5xl flex-col items-center px-6 py-32"
    >
      <p className="font-mono text-sm uppercase tracking-widest text-accent">
        Algunos proyectos
      </p>
      <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
        Cosas que he construido
      </h2>

      <div ref={containerRef} className="relative mt-20 flex w-full flex-col gap-24">
        <ProjectConstellation containerRef={containerRef} anchorRefs={anchorRefs} />
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
    </section>
  );
}
