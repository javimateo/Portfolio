"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const MAX_TILT = 5; // degrees

export default function TiltPhoto({ isLoaded }: { isLoaded: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Slow, well-damped spring: the photo eases towards the cursor instead of snapping.
  const springConfig = { stiffness: 60, damping: 20, mass: 1 };
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
        className="relative aspect-[3/4] w-56 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:w-72 md:w-96"
      >
        <Image
          src="/images/javier2.jpg"
          loading="eager"
          fetchPriority="high"
          alt="Javier Mateo"
          fill
          sizes="(min-width: 768px) 384px, (min-width: 640px) 288px, 224px"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
