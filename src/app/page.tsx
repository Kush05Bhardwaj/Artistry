import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StyleShowcase } from "@/components/home/StyleShowcase";
import { BeforeAfterShowcase } from "@/components/home/BeforeAfterShowcase";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { ProductMatching } from "@/components/home/ProductMatching";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { InspirationGallery } from "@/components/home/InspirationGallery";
import { StatsSection } from "@/components/home/StatsSection";
import { CTASection } from "@/components/home/CTASection";
import { PremiumFooter } from "@/components/home/PremiumFooter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustBar />
      <HowItWorks />
      <StyleShowcase />
      <BeforeAfterShowcase />
      <FeatureGrid />
      <ProductMatching />
      <TestimonialCarousel />
      <InspirationGallery />
      <StatsSection />
      <CTASection />
      <PremiumFooter />
    </main>
  );
}