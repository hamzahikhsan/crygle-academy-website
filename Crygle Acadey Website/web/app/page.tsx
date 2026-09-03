import { HeroSection } from '@/components/home/HeroSection.jsx';
import { ProgramSection } from '@/components/home/ProgramSection.jsx';
import { AboutSection } from '@/components/home/AboutSection.jsx';
import { PopularClassesSection } from '@/components/home/PopularClassesSection.jsx';
import { AlumniShowcaseSection } from '@/components/home/AlumniShowcaseSection.jsx';
import { TestimonialSection } from '@/components/home/TestimonialSection.jsx';
import { MentorSection } from '@/components/home/MentorSection.jsx';
import { FaqSection } from '@/components/home/FaqSection.jsx';
import { FinalCtaSection } from '@/components/home/FinalCtaSection.jsx';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProgramSection />
      <AboutSection />
      <PopularClassesSection />
      <AlumniShowcaseSection />
      <TestimonialSection />
      <MentorSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
