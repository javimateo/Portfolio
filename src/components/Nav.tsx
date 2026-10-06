"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LOCALE_COOKIE, localePath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";
import { SKIP_INTRO_KEY } from "./LoadingProvider";
import { track } from "@/lib/analytics";

const SECTION_IDS = ["home", "about", "projects", "skills", "contact"] as const;

export default function Nav() {
  const locale = useLocale();
  const { nav } = useDictionary();
  const [active, setActive] = useState<string>(SECTION_IDS[0]);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const otherLocale = locale === "es" ? "en" : "es";

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
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

  // Remember the choice (so "/" stops guessing), keep the reader on the same section
  // and skip the intro animation they have already seen.
  const switchLocale = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.cookie = `${LOCALE_COOKIE}=${otherLocale}; path=/; max-age=31536000; samesite=lax`;
    try {
      sessionStorage.setItem(SKIP_INTRO_KEY, "1");
    } catch {}
    track("language-switch", { to: otherLocale, section: active });
    // A full load on purpose: the other language has its own root layout (<html lang>).
    // The short delay lets the event request start before the page goes away.
    setTimeout(() => {
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`${localePath(otherLocale)}#${active}`);
    }, 150);
  };

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-full max-w-fit -translate-x-1/2 px-4 sm:top-6 sm:px-0">
      <ul className="relative flex items-center gap-0.5 rounded-full border border-white/10 bg-black/60 px-1.5 py-1.5 backdrop-blur-md sm:gap-1 sm:px-2 sm:py-2">
        {SECTION_IDS.map((id) => (
          // "Home" gives up its place to the language switch on narrow phones.
          <li key={id} className={`relative ${id === "home" ? "hidden sm:block" : ""}`}>
            <a
              ref={(el) => {
                linkRefs.current[id] = el;
              }}
              href={`#${id}`}
              onClick={() => track("nav-click", { section: id })}
              className={`relative z-10 block whitespace-nowrap rounded-full px-[7px] py-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-4 sm:py-2 sm:text-xs sm:tracking-wider ${
                active === id
                  ? "text-black"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {nav[id]}
            </a>
            {active === id && (
              <motion.div
                layoutId="nav-highlight"
                className="absolute inset-0 z-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </li>
        ))}
        <li className="ml-0.5 border-l border-white/10 pl-0.5 sm:ml-1 sm:pl-1">
          <a
            href={localePath(otherLocale)}
            hrefLang={otherLocale}
            onClick={switchLocale}
            aria-label={nav.switchLabel}
            title={nav.switchLabel}
            className="block rounded-full px-[7px] py-1.5 font-mono text-[10px] uppercase tracking-wide text-accent transition-colors hover:bg-white/10 sm:px-3 sm:py-2 sm:text-xs sm:tracking-wider"
          >
            {nav.switchTo}
          </a>
        </li>
      </ul>
    </nav>
  );
}
