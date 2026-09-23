"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion } from "framer-motion";

type Point = { x: number; y: number };

const FILL_DURATION = 2.2; // seconds — how long the line takes to connect top to bottom

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

  // One continuous path through every project, plus each segment's share
  // of the total length so the "star" and each node light up in sync with
  // how far the line has actually traveled.
  const path = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`), "");
  const segmentLengths = points.slice(0, -1).map((p, i) => Math.hypot(points[i + 1].x - p.x, points[i + 1].y - p.y));
  const totalLength = segmentLengths.reduce((a, b) => a + b, 0);
  const pointFractions = points.map(
    (_, i) => segmentLengths.slice(0, i).reduce((a, b) => a + b, 0) / totalLength
  );

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 overflow-visible"
      width={size.width}
      height={size.height}
    >
      <defs>
        <filter id="constellation-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="constellation-glow-strong" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* the connection itself, filling in smoothly once */}
      <motion.path
        d={path}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#constellation-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.55 }}
        viewport={{ once: true, margin: "0px 0px 150px 0px" }}
        transition={{ duration: FILL_DURATION, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* bright comet head traveling along the same path, just ahead of the fill */}
      <motion.circle
        r={3.5}
        fill="var(--accent)"
        filter="url(#constellation-glow-strong)"
        initial={{ opacity: 0, offsetDistance: "0%" }}
        whileInView={{ opacity: [0, 1, 1, 0], offsetDistance: "100%" }}
        viewport={{ once: true, margin: "0px 0px 150px 0px" }}
        transition={{ duration: FILL_DURATION, ease: [0.4, 0, 0.2, 1] }}
        style={{ offsetPath: `path("${path}")` }}
      />

      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={3}
          fill="var(--accent)"
          filter="url(#constellation-glow)"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.85 }}
          viewport={{ once: true, margin: "0px 0px 150px 0px" }}
          transition={{ duration: 0.4, delay: pointFractions[i] * FILL_DURATION }}
        />
      ))}
    </svg>
  );
}
