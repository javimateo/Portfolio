"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number; // px
  y: number; // px
  radius: number; // px
  fallSpeed: number; // px per second
  peakOpacity: number;
  twinkleSpeed: number; // radians per second
  twinklePhase: number;
};

const STAR_COUNT = 110;
const MIN_FALL_SPEED = 25; // px/s
const MAX_FALL_SPEED = 55;

function createParticle(width: number, height: number, randomY: boolean): Particle {
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : -10,
    radius: Math.random() * 1.4 + 0.6,
    fallSpeed: MIN_FALL_SPEED + Math.random() * (MAX_FALL_SPEED - MIN_FALL_SPEED),
    peakOpacity: Math.random() * 0.6 + 0.25,
    twinkleSpeed: (Math.random() * 0.4 + 0.15) * (Math.random() < 0.5 ? -1 : 1),
    twinklePhase: Math.random() * Math.PI * 2,
  };
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    particles = Array.from({ length: STAR_COUNT }, () =>
      createParticle(width, height, true)
    );

    const draw = (elapsedSeconds: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const twinkle =
          0.5 + 0.5 * Math.sin(elapsedSeconds * p.twinkleSpeed + p.twinklePhase);
        const opacity = p.peakOpacity * (0.35 + 0.65 * twinkle);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity.toFixed(3)})`;
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      draw(0);
      window.addEventListener("resize", () => {
        resize();
        particles = Array.from({ length: STAR_COUNT }, () =>
          createParticle(width, height, true)
        );
        draw(0);
      });
      return;
    }

    let lastTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      for (const p of particles) {
        p.y += p.fallSpeed * dt;
        if (p.y - p.radius > height) {
          Object.assign(p, createParticle(width, height, false));
        }
      }

      draw(now / 1000);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
