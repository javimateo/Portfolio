"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Day = { date: string; level: number; label: string };
type YearData = { year: number; days: Day[]; total: number };

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -15% 0px" } as const;

const LEVEL_COLOR = [
  "rgba(255,255,255,0.06)",
  "rgba(244,196,48,0.30)",
  "rgba(244,196,48,0.52)",
  "rgba(244,196,48,0.76)",
  "rgba(244,196,48,1)",
];

const MONTHS = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

function buildGrid(days: Day[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  if (sorted.length === 0) return { cells: [], monthMarks: [] as { week: number; label: string }[] };

  const firstWeekday = new Date(`${sorted[0].date}T00:00:00Z`).getUTCDay(); // 0 = Sunday
  const cells: (Day | null)[] = Array(firstWeekday).fill(null);
  cells.push(...sorted);

  const weekCount = Math.ceil(cells.length / 7);
  const monthMarks: { week: number; label: string }[] = [];
  let lastMonth = -1;
  for (let week = 0; week < weekCount; week++) {
    const first = cells[week * 7];
    if (!first) continue;
    const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
    if (month !== lastMonth) {
      monthMarks.push({ week, label: MONTHS[month] });
      lastMonth = month;
    }
  }

  return { cells, weekCount, monthMarks };
}

export default function GithubContributions() {
  const [years, setYears] = useState<YearData[] | null>(null);
  const [live, setLive] = useState(true);
  const [activeYear, setActiveYear] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-contributions")
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.ok && json.years?.length) {
          setYears(json.years);
          setActiveYear(json.years[0].year);
        } else {
          setLive(false);
        }
      })
      .catch(() => !cancelled && setLive(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const current = years?.find((y) => y.year === activeYear);
  const grid = useMemo(() => (current ? buildGrid(current.days) : null), [current]);

  if (!live) return null; // no fabricated data for something this personal

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, ease: EASE }}
      className="mt-16 w-full rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Actividad en GitHub
        </p>
        {years && (
          <div className="flex gap-1">
            {years.map((y) => (
              <button
                key={y.year}
                onClick={() => setActiveYear(y.year)}
                className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                  y.year === activeYear
                    ? "bg-accent text-black"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {y.year}
              </button>
            ))}
          </div>
        )}
      </div>

      {current && grid ? (
        <>
          <p className="mt-1 text-sm text-foreground/60">
            {current.total} contribuciones en {current.year}
          </p>
          <div className="mt-5 overflow-x-auto">
            <div className="inline-grid min-w-full gap-[3px]" style={{ gridTemplateRows: "12px repeat(7, 11px)" }}>
              <div className="relative col-span-full h-3">
                {grid.monthMarks?.map((m) => (
                  <span
                    key={`${m.week}-${m.label}`}
                    className="absolute top-0 font-mono text-[10px] text-foreground/40"
                    style={{ left: `${m.week * 14}px` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
              <div
                className="col-span-full grid grid-flow-col gap-[3px]"
                style={{ gridTemplateRows: "repeat(7, 11px)" }}
              >
                {grid.cells.map((day, i) =>
                  day ? (
                    <span
                      key={day.date}
                      title={day.label}
                      className="h-[11px] w-[11px] rounded-[2px] transition-transform hover:scale-125"
                      style={{ background: LEVEL_COLOR[day.level] }}
                    />
                  ) : (
                    <span key={`empty-${i}`} className="h-[11px] w-[11px]" />
                  )
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-foreground/40">
            <span>Menos</span>
            {LEVEL_COLOR.map((color) => (
              <span key={color} className="h-[10px] w-[10px] rounded-[2px]" style={{ background: color }} />
            ))}
            <span>Más</span>
          </div>
        </>
      ) : (
        <div className="mt-5 h-[95px] animate-pulse rounded-lg bg-white/[0.03]" />
      )}
    </motion.div>
  );
}
