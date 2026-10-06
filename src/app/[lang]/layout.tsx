import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import LoadingProvider from "@/components/LoadingProvider";
import LocaleProvider from "@/i18n/LocaleProvider";
import { hasLocale, localePath, locales } from "@/i18n/config";
import { dictionary } from "@/i18n/dictionary";
import "../globals.css";

// Umami (self-hosted, cookie-less visit counter). Read at runtime (not NEXT_PUBLIC_, so
// Coolify can set it without a rebuild); with either unset, nothing is loaded.
const umamiSrc = process.env.UMAMI_SRC;
const umamiId = process.env.UMAMI_ID;

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = dictionary[lang];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localePath(lang),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l)])),
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {umamiSrc && umamiId && (
          <Script
            src={umamiSrc}
            data-website-id={umamiId}
            strategy="afterInteractive"
          />
        )}
        <LocaleProvider locale={lang}>
          <LoadingProvider>
            <Starfield />
            <Nav />
            <div className="relative z-10 flex min-h-full flex-1 flex-col">
              {children}
            </div>
          </LoadingProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
