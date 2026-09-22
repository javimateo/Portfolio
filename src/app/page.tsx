import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6">
      <Hero />
      <Projects />

      <section
        id="skills"
        className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center text-center"
      >
        <h2 className="font-display text-3xl">Skills (pendiente)</h2>
      </section>

      <section
        id="contacto"
        className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center text-center"
      >
        <h2 className="font-display text-3xl">Contacto (pendiente)</h2>
      </section>
    </main>
  );
}
