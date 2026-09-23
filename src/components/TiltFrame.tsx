"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { type MouseEvent, type ReactNode } from "react";

const MAX_TILT = 4; // degrees — subtle, unlike the hero photo's stronger tilt

export default function TiltFrame({ children }: { children: ReactNode }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const tiltSpring = { stiffness: 150, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), tiltSpring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), tiltSpring);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div
      className="relative"
      style={{ perspective: 1000 }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="overflow-hidden rounded-xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
