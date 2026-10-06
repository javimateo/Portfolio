"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const SECTION_IDS = ["home", "about", "projects", "skills", "contact"];
const DEPTHS = [25, 50, 75, 100];

// Page-level engagement: how far each visitor scrolls and which sections they actually see.
// Each milestone is sent once per page view.
export default function Analytics() {
  useEffect(() => {
    const reached = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // A page that fits on screen counts as fully read.
      const percent = scrollable <= 0 ? 100 : ((window.scrollY + 1) / scrollable) * 100;
      for (const depth of DEPTHS) {
        if (percent >= depth && !reached.has(depth)) {
          reached.add(depth);
          track("scroll-depth", { percent: depth });
        }
      }
      if (reached.size === DEPTHS.length) window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // "Seen" = a good part of the section on screen for at least a second, so fast scrolling
    // past it doesn't count.
    const timers = new Map<string, ReturnType<typeof setTimeout>>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            timers.set(
              id,
              setTimeout(() => {
                track("section-view", { section: id });
                observer.unobserve(entry.target);
                timers.delete(id);
              }, 1000)
            );
          } else {
            clearTimeout(timers.get(id));
            timers.delete(id);
          }
        }
      },
      // Tall sections never reach a high ratio on a phone, so trigger on viewport coverage instead.
      { rootMargin: "-30% 0px -30% 0px" }
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
