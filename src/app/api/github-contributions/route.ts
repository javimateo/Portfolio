// Reads the public contribution calendar GitHub renders on every profile
// page (github.com/users/<user>/contributions). There's no official public
// API for this without a personal token, so this parses that HTML fragment —
// same data, no token to manage on the VPS. If GitHub ever changes that
// markup, this route just starts returning `ok: false` and the widget falls
// back to a static snapshot; nothing else on the site depends on it.

export const revalidate = 86400; // GitHub's own calendar is cached ~1 day too

const USERNAME = "javimateo";
const CURRENT_YEAR = new Date().getUTCFullYear();
const FIRST_YEAR = 2022; // account creation year

type Day = { date: string; level: number; label: string };

function parseCalendar(html: string): Day[] {
  const cells = [
    ...html.matchAll(/<td[^>]*data-date="([0-9-]+)"[^>]*id="([^"]+)"[^>]*data-level="(\d)"/g),
  ];
  const tooltips = new Map(
    [...html.matchAll(/for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)].map((m) => [m[1], m[2]])
  );
  return cells.map(([, date, id, level]) => ({
    date,
    level: Number(level),
    label: tooltips.get(id) ?? "",
  }));
}

async function fetchYear(year: number) {
  const isCurrent = year === CURRENT_YEAR;
  const url = isCurrent
    ? `https://github.com/users/${USERNAME}/contributions`
    : `https://github.com/users/${USERNAME}/contributions?from=${year}-01-01&to=${year}-12-31`;

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (portfolio-build)" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  const html = await res.text();
  const days = parseCalendar(html);
  if (days.length === 0) throw new Error("No contribution cells found");

  // Each tooltip reads "No contributions on ..." or "N contributions on ...".
  const total = days.reduce((sum, d) => sum + (Number(d.label.match(/^(\d+)/)?.[1]) || 0), 0);

  return { year, days, total };
}

export async function GET() {
  const years = Array.from({ length: CURRENT_YEAR - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i).reverse();

  try {
    const results = await Promise.all(years.map(fetchYear));
    return Response.json({ ok: true, years: results });
  } catch (error) {
    console.error("github-contributions:", error);
    return Response.json({ ok: false });
  }
}
