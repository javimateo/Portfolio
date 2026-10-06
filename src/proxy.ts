import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/i18n/config";

// Spanish is served at "/" (internally the prerendered /es page) and English at "/en".
// First-time visitors whose browser prefers English over Spanish are sent to /en; an
// explicit choice from the language switch (the cookie) always wins.
function prefersEnglish(request: NextRequest) {
  const choice = request.cookies.get(LOCALE_COOKIE)?.value;
  if (choice === "es" || choice === "en") return choice === "en";

  const languages = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((l) => l.lang)
    .sort((a, b) => b.q - a.q);
  const first = languages.find((l) => l.lang === "es" || l.lang === "en");
  // Neither listed (e.g. a German browser): English is the safer bet.
  if (!first) return languages.length > 0;
  return first.lang === "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // /es is an implementation detail: keep a single public URL for the Spanish page.
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url);
  }

  if (pathname === "/") {
    if (prefersEnglish(request)) {
      url.pathname = "/en";
      return NextResponse.redirect(url);
    }
    url.pathname = "/es";
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ["/", "/es", "/es/:path*"],
};
