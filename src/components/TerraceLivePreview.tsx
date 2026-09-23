"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Verdict = "OPEN" | "CAUTION" | "CLOSED";

type Preview = {
  ok: true;
  city: string;
  date: string;
  isToday: boolean;
  services: {
    label: string;
    range: string;
    verdict: Verdict;
    score: number;
    capacity: number;
    reasons: string[];
  }[];
  hours: { hour: number; score: number; verdict: Verdict }[];
};

// Real response captured on 23 Sep 2026, shown only if the API can't be reached.
const FALLBACK: Preview = {
  ok: true,
  city: "Sevilla",
  date: "2026-09-24",
  isToday: false,
  services: [
    { label: "Comida", range: "13–16 h", verdict: "OPEN", score: 89, capacity: 100, reasons: ["Feels like 37 C (too hot)"] },
    { label: "Cena", range: "20–23 h", verdict: "OPEN", score: 96, capacity: 100, reasons: ["Feels like 35 C (too hot)"] },
  ],
  hours: [100, 100, 97, 89, 86, 87, 92, 96, 97, 100, 100, 100].map((score, i) => ({
    hour: 12 + i,
    score,
    verdict: "OPEN" as const,
  })),
};

const VERDICT: Record<Verdict, { label: string; color: string }> = {
  OPEN: { label: "Abrir", color: "#4ade80" },
  CAUTION: { label: "Precaución", color: "#fbbf24" },
  CLOSED: { label: "Cerrar", color: "#f87171" },
};

// The API reports reasons in English; these are every format it can produce.
function translateReason(reason: string) {
  const rules: [RegExp, (m: RegExpMatchArray) => string][] = [
    [/^Feels like (-?\d+) C \(too hot\)$/, (m) => `Sensación de ${m[1]} °C (calor)`],
    [/^Feels like (-?\d+) C \(too cold\)$/, (m) => `Sensación de ${m[1]} °C (frío)`],
    [/^Rain probability (\d+)%$/, (m) => `${m[1]} % de probabilidad de lluvia`],
    [/^Expected precipitation ([\d.]+) mm$/, (m) => `${m[1]} mm de lluvia previstos`],
    [/^Wind gusts (\d+) km\/h$/, (m) => `Rachas de ${m[1]} km/h`],
  ];
  for (const [pattern, format] of rules) {
    const match = reason.match(pattern);
    if (match) return format(match);
  }
  return reason;
}

function formatDay(date: string, isToday: boolean) {
  const label = new Intl.DateTimeFormat("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
  return `${isToday ? "Hoy" : "Mañana"} · ${label}`;
}

export default function TerraceLivePreview() {
  const [data, setData] = useState<Preview | null>(null);
  const [live, setLive] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/terrace-preview")
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.ok) {
          setData(json);
        } else {
          setData(FALLBACK);
          setLive(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setData(FALLBACK);
        setLive(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const preview = data ?? FALLBACK;
  const worstReason = preview.services.flatMap((s) => s.reasons).at(-1);

  return (
    <div
      className={`flex h-full w-full flex-col gap-2.5 p-3 text-left transition-opacity duration-500 sm:gap-4 sm:p-5 ${
        data ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background:
          "radial-gradient(circle at 85% 0%, rgba(74,222,128,0.10), transparent 55%), linear-gradient(to bottom right, #18181b, #09090b)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-sm font-bold text-foreground sm:text-lg">
            Terraza · {preview.city}
          </p>
          <p className="font-mono text-[10px] text-foreground/50 sm:text-xs">
            {formatDay(preview.date, preview.isToday)}
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/60 sm:text-[10px]">
          <span
            className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulse bg-green-400" : "bg-foreground/40"}`}
          />
          {live ? "En vivo" : "Ejemplo"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {preview.services.map((s) => (
          <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 sm:px-3 sm:py-2.5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-foreground/50 sm:text-[10px]">
              {s.label} · {s.range}
            </p>
            <p
              className="mt-0.5 font-display text-base font-bold sm:mt-1 sm:text-2xl"
              style={{ color: VERDICT[s.verdict].color }}
            >
              {VERDICT[s.verdict].label}
            </p>
            <p className="font-mono text-[9px] text-foreground/60 sm:text-xs">
              {s.score}/100 · aforo {s.capacity} %
            </p>
          </div>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 items-end gap-[3px] sm:gap-1.5">
        {preview.hours.map((h, i) => (
          <div key={h.hour} className="flex h-full flex-1 flex-col justify-end">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="w-full origin-bottom rounded-t-sm"
              style={{
                height: `${Math.max(h.score, 6)}%`,
                background: `linear-gradient(to top, ${VERDICT[h.verdict].color}33, ${VERDICT[h.verdict].color})`,
              }}
              title={`${h.hour}:00 · ${h.score}/100`}
            />
            <span className="mt-1 text-center font-mono text-[8px] text-foreground/40 sm:text-[10px]">
              {i % 2 === 0 ? h.hour : ""}
            </span>
          </div>
        ))}
      </div>

      <div className="hidden items-center justify-between gap-2 font-mono text-[10px] text-foreground/45 sm:flex">
        <span>{worstReason ? translateReason(worstReason) : "Sin incidencias previstas"}</span>
        <span>Datos: Open-Meteo</span>
      </div>
    </div>
  );
}
