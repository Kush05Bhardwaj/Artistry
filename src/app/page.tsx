import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { CTASection } from "@/components/home/CTASection";
import { PremiumFooter } from "@/components/home/PremiumFooter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <FeatureGrid />
      <TestimonialCarousel />
      <CTASection />
      <PremiumFooter />
    </main>
  );
}