"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -15% 0px" } as const;

const EMAIL = "javimateo2003@gmail.com";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/javimateo",
    icon: (
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.02 3.29 9.28 7.86 10.78.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/javier-mateo-carmona/",
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    ),
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    icon: (
      <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.2.5 7.3 6.02a.75.75 0 0 0 .95 0L19.8 6H4.2ZM20 7.7l-6.85 5.65a2.25 2.25 0 0 1-2.86 0L4 7.7v10.8h16V7.7Z" />
    ),
  },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      className="flex w-full max-w-3xl flex-col items-center px-6 py-32 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: EASE }}
        className="font-mono text-sm uppercase tracking-widest text-accent"
      >
        Contacto
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        className="mt-3 font-display text-4xl font-bold sm:text-5xl"
      >
        ¿Hablamos?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        className="mt-6 max-w-lg text-lg text-foreground/70"
      >
        Estoy buscando mi primera posición como desarrollador full-stack.
        Si tienes un equipo donde encajar, escríbeme.
      </motion.p>

      <motion.a
        href={`mailto:${EMAIL}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        className="group mt-10 font-display text-2xl font-bold text-foreground transition-colors hover:text-accent sm:text-3xl"
      >
        <span className="relative">
          {EMAIL}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
        </span>
      </motion.a>

      <motion.ul
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
        className="mt-12 flex items-center gap-5"
      >
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={link.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foreground/70 transition-colors hover:border-accent/50 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                {link.icon}
              </svg>
            </a>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
