import HeroSection from "@/components/landing/HeroSection";
import TickerSection from "@/components/landing/TickerSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import ProcessSection from "@/components/landing/ProcessSection";
import ProblemsFixSection from "@/components/landing/ProblemsFixSection";
import ResourcesSection from "@/components/landing/ResourcesSection";
import FinalCTASection from "@/components/landing/FinalCTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TickerSection />
      <ProblemSection />
      <SolutionSection />
      <WhyUsSection />
      <SocialProofSection />
      <ProcessSection />
      <ProblemsFixSection />
      <ResourcesSection />
      <FinalCTASection />
    </main>
  );
}
