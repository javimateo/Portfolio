// Live data for the Terrace Weather API card in the projects section.
// One batch call to the real API, cached for an hour so visitors never hit it directly.

export const dynamic = "force-static";
export const revalidate = 3600;

const API = "https://terrace.javiermateo.dev/api/v1/terrace/windows";
const CITY = { name: "Sevilla", lat: 37.3891, lon: -5.9845 };
const TIME_ZONE = "Europe/Madrid";
const FIRST_HOUR = 12;
const LAST_HOUR = 23;
const SERVICES = [
  { id: "comida", label: "Comida", start: 13, end: 16 },
  { id: "cena", label: "Cena", start: 20, end: 23 },
];

type ApiWindow = {
  verdict: "OPEN" | "CAUTION" | "CLOSED";
  minScore: number;
  averageScore: number;
  recommendedCapacityPercent: number;
  reasons: string[];
};

type ApiResult = { id: string; window?: ApiWindow; error?: unknown };

function madridNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return { date: `${get("year")}-${get("month")}-${get("day")}`, hour: Number(get("hour")) };
}

function addDay(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

const at = (date: string, hour: number) =>
  hour === 24 ? `${addDay(date)}T00:00:00` : `${date}T${String(hour).padStart(2, "0")}:00:00`;

export async function GET() {
  const now = madridNow();
  // Once lunch has started, show tomorrow so every bar is still a forecast.
  const isToday = now.hour < FIRST_HOUR;
  const date = isToday ? now.date : addDay(now.date);

  const hourWindows = [];
  for (let h = FIRST_HOUR; h <= LAST_HOUR; h++) {
    hourWindows.push({ id: `h${h}`, start: at(date, h), end: at(date, h + 1) });
  }
  const serviceWindows = SERVICES.map((s) => ({
    id: s.id,
    start: at(date, s.start),
    end: at(date, s.end),
  }));

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lat: CITY.lat,
        lon: CITY.lon,
        windows: [...serviceWindows, ...hourWindows],
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const data: { results: ApiResult[] } = await res.json();
    const byId = new Map(data.results.map((r) => [r.id, r.window]));

    const services = SERVICES.map((s) => {
      const w = byId.get(s.id);
      if (!w) throw new Error(`Missing window ${s.id}`);
      return {
        label: s.label,
        range: `${s.start}–${s.end} h`,
        verdict: w.verdict,
        score: w.minScore,
        capacity: w.recommendedCapacityPercent,
        reasons: w.reasons,
      };
    });

    const hours = hourWindows.map((hw, i) => {
      const w = byId.get(hw.id);
      if (!w) throw new Error(`Missing window ${hw.id}`);
      return { hour: FIRST_HOUR + i, score: w.minScore, verdict: w.verdict };
    });

    return Response.json({
      ok: true,
      city: CITY.name,
      date,
      isToday,
      services,
      hours,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("terrace-preview:", error);
    return Response.json({ ok: false });
  }
}
