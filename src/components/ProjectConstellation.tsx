"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion } from "framer-motion";

type Point = { x: number; y: number };

export default function ProjectConstellation({
  containerRef,
  anchorRefs,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  anchorRefs: RefObject<(HTMLDivElement | null)[]>;
}) {
  const [points, setPoints] = useState<Point[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      setSize({ width: containerRect.width, height: containerRect.height });
      const pts = anchorRefs.current
        .map((el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            x: r.left + r.width / 2 - containerRect.left,
            y: r.top + r.height / 2 - containerRect.top,
          };
        })
        .filter((p): p is Point => p !== null);
      setPoints(pts);
    }

    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [containerRef, anchorRefs]);

  if (points.length < 2 || size.width === 0) return null;

  const segments = points.slice(0, -1).map((p, i) => ({ from: p, to: points[i + 1] }));

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 overflow-visible"
      width={size.width}
      height={size.height}
    >
      <defs>
        <filter id="constellation-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {segments.map((seg, i) => (
        <motion.line
          key={i}
          x1={seg.from.x}
          y1={seg.from.y}
          x2={seg.to.x}
          y2={seg.to.y}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#constellation-glow)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.5, 0.28] }}
          viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
          transition={{ duration: 1.4, delay: i * 0.35, ease: "easeOut" }}
        />
      ))}

      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={3}
          fill="var(--accent)"
          filter="url(#constellation-glow)"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.9 }}
          viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
          transition={{ duration: 0.5, delay: i * 0.35 }}
        />
      ))}
    </svg>
  );
}
