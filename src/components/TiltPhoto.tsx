"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const MAX_TILT = 10; // degrees

export default function TiltPhoto({ isLoaded }: { isLoaded: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [MAX_TILT, -MAX_TILT]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-MAX_TILT, MAX_TILT]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 24 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[3/4] w-72 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:w-96"
      >
        <Image
          src="/images/javier.jpg"
          alt="Javier Mateo"
          fill
          sizes="(min-width: 640px) 384px, 288px"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
