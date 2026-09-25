import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import SkillsGrid from "@/components/SkillsGrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6">
      <Hero />
      <About />
      <Projects />
      <SkillsGrid />
      <Contact />
      <Footer />
    </main>
  );
}
