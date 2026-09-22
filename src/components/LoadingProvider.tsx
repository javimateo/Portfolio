"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const logoFont = Poppins({ subsets: ["latin"], weight: "800" });

const LoadingContext = createContext(false);

export function useIsLoaded() {
  return useContext(LoadingContext);
}

const DRAW_DURATION = 0.9; // hexagon "loading" draw
const FILL_DURATION = 0.5; // hexagon fills solid + "JM" fades in
const HOLD_MS = 400; // pause once filled, before zooming through
const ZOOM_DURATION = 0.65; // same hexagon zooms up to flood the screen
const FADE_DELAY = 0.42; // wait until mostly covered, then cut
const FADE_DURATION = 0.3; // quick cut revealing the site

type Phase = "draw" | "fill" | "zoom" | "done";

// Same hexagon as HEX_POINTS ("50,4 93,27 93,73 50,96 7,73 7,27") but
// with softly rounded corners.
const HEX_PATH =
  "M 13.616,23.462 L 43.384,7.539 Q 50,4 56.616,7.539 L 86.384,23.462 Q 93,27 93,34.5 L 93,65.5 Q 93,73 86.384,76.539 L 56.616,92.462 Q 50,96 43.384,92.462 L 13.616,76.539 Q 7,73 7,65.5 L 7,34.5 Q 7,27 13.616,23.462 Z";

export default function LoadingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("draw");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (phase !== "fill") return;
    const timer = setTimeout(() => setPhase("zoom"), FILL_DURATION * 1000 + HOLD_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "zoom") return;
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      setIsLoaded(true);
      setPhase("done");
    }, (FADE_DELAY + FADE_DURATION) * 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <LoadingContext.Provider value={isLoaded}>
      {phase !== "done" && (
        <motion.div
          animate={{ opacity: phase === "zoom" ? 0 : 1 }}
          transition={
            phase === "zoom"
              ? { duration: FADE_DURATION, delay: FADE_DELAY, ease: "easeIn" }
              : { duration: 0 }
          }
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-background"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: phase === "zoom" ? 18 : 1 }}
            transition={
              phase === "zoom"
                ? { duration: ZOOM_DURATION, ease: [0.6, 0, 0.9, 0] }
                : { duration: 0 }
            }
            className="relative flex h-28 w-28 items-center justify-center"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <motion.path
                d={HEX_PATH}
                strokeWidth="2.5"
                strokeLinejoin="round"
                stroke="var(--accent)"
                initial={{ pathLength: 0, fill: "rgba(244,196,48,0)" }}
                animate={{
                  pathLength: 1,
                  fill:
                    phase === "draw"
                      ? "rgba(244,196,48,0)"
                      : "rgba(244,196,48,1)",
                }}
                transition={{
                  pathLength: { duration: DRAW_DURATION, ease: "easeInOut" },
                  fill: { duration: FILL_DURATION, ease: "easeOut" },
                }}
                onAnimationComplete={() => {
                  setPhase((p) => (p === "draw" ? "fill" : p));
                }}
              />
            </svg>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "draw" ? 0 : 1 }}
              transition={{
                duration: FILL_DURATION * 0.7,
                delay: FILL_DURATION * 0.3,
                ease: "easeOut",
              }}
              className={`${logoFont.className} relative text-4xl tracking-tight text-background`}
            >
              JM
            </motion.span>
          </motion.div>
        </motion.div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
