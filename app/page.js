import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import DeveloperTerminal from "@/components/DeveloperTerminal";
import TechStack from "@/components/TechStack";
import InteractivePlayground from "@/components/InteractivePlayground";
import ProjectsSection from "@/components/ProjectsSection";
import MongoArchitecture from "@/components/MongoArchitecture";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import HireEstimator from "@/components/HireEstimator";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <DeveloperTerminal />
      <TechStack />
      <InteractivePlayground />
      <ProjectsSection />
      <MongoArchitecture />
      <ExperienceTimeline />
      <HireEstimator />
      <Testimonials />
      <ContactSection />
    </>
  );
}
