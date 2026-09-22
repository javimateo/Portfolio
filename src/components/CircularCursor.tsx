"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useId, useRef, useState, type MouseEvent, type ReactNode } from "react";

const CIRCLE_SIZE = 92;
const MAX_TILT = 4; // degrees — subtle, unlike the hero photo's stronger tilt

export default function CircularCursor({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const pathId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // 0..1 position within the container, used for both the tilt and the cursor
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const tiltSpring = { stiffness: 150, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), tiltSpring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), tiltSpring);

  const cursorSpring = { stiffness: 300, damping: 30, mass: 0.5 };
  const cursorX = useSpring(
    useTransform(px, (v) => v * (containerRef.current?.clientWidth ?? 0) - CIRCLE_SIZE / 2),
    cursorSpring
  );
  const cursorY = useSpring(
    useTransform(py, (v) => v * (containerRef.current?.clientHeight ?? 0) - CIRCLE_SIZE / 2),
    cursorSpring
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    px.set(0.5);
    py.set(0.5);
  };

  const repeatedLabel = `${label} · ${label} · `;

  return (
    <div
      ref={containerRef}
      className="group relative cursor-none"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="overflow-hidden rounded-xl"
      >
        {children}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-20 flex items-center justify-center rounded-full border-2 border-accent bg-background shadow-[0_0_24px_rgba(0,0,0,0.5)]"
        style={{
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          x: cursorX,
          y: cursorY,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <path
            id={pathId}
            fill="none"
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
          <text fontSize="10.5" fontWeight="700" letterSpacing="1.5">
            <textPath href={`#${pathId}`} fill="var(--accent)">
              {repeatedLabel}
            </textPath>
          </text>
        </motion.svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative h-5 w-5"
        >
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      </motion.div>
    </div>
  );
}
