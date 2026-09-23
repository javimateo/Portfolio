import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SkillsGrid from "@/components/SkillsGrid";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6">
      <Hero />
      <About />
      <Projects />
      <Skills />
      {/* Temporary: grid alternative shown below the constellation for comparison */}
      <SkillsGrid />

      <section
        id="contacto"
        className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center text-center"
      >
        <h2 className="font-display text-3xl">Contacto (pendiente)</h2>
      </section>
    </main>
  );
}
