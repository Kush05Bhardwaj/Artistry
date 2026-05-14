import { Metadata } from "next";
import { VisionSection } from "@/components/about/VisionSection";
import { StorySection } from "@/components/about/StorySection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { ContactSection } from "@/components/about/ContactSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Artistry AI - our mission to make interior design accessible, affordable, and beautiful for everyone.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <VisionSection />
      <StorySection />
      <ValuesSection />
      <ContactSection />
    </div>
  );
}