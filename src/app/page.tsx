import { FocusProvider } from "@/components/focus-provider";
import BootScreen from "@/components/boot-screen";
import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <FocusProvider>
      <BootScreen />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
      </main>
      <Footer />
    </FocusProvider>
  );
}
