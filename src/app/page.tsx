import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CustomCursor from '@/components/common/CustomCursor';
import Landing from '@/components/Landing';
import Timeline from '@/components/Timeline';
import SkillMap from '@/components/SkillMap';
import Projects from '@/components/Projects';
import AIPlayground from '@/components/AIPlayground';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900">
      <CustomCursor />
      <Navbar />
      <main>
        <Landing />
        <div id="timeline">
          <Timeline />
        </div>
        <div id="skills">
          <SkillMap />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <AIPlayground />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
