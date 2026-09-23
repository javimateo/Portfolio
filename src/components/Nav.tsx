"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "skills", label: "Skills" },
  { id: "contacto", label: "Contacto" },
];

export default function Nav() {
  const [active, setActive] = useState(LINKS[0].id);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-full max-w-fit -translate-x-1/2 px-4 sm:top-6 sm:px-0">
      <ul className="relative flex items-center gap-0.5 rounded-full border border-white/10 bg-black/60 px-1.5 py-1.5 backdrop-blur-md sm:gap-1 sm:px-2 sm:py-2">
        {LINKS.map((link) => (
          <li key={link.id} className="relative">
            <a
              ref={(el) => {
                linkRefs.current[link.id] = el;
              }}
              href={`#${link.id}`}
              className={`relative z-10 block whitespace-nowrap rounded-full px-[7px] py-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-4 sm:py-2 sm:text-xs sm:tracking-wider ${
                active === link.id
                  ? "text-black"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
            {active === link.id && (
              <motion.div
                layoutId="nav-highlight"
                className="absolute inset-0 z-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
