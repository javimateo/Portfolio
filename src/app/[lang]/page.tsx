import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import SkillsGrid from "@/components/SkillsGrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { hasLocale } from "@/i18n/config";
import { cvFiles } from "@/data/cv";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  // Checked at build time, so the button only appears once the PDF is in public/cv.
  const cv = existsSync(path.join(process.cwd(), "public", cvFiles[lang])) ? cvFiles[lang] : undefined;

  return (
    <main className="flex flex-1 flex-col items-center px-5 sm:px-6">
      <Hero cv={cv} />
      <About />
      <Projects />
      <SkillsGrid />
      <Contact cv={cv} />
      <Footer />
    </main>
  );
}
