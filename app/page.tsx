import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { About } from "@/components/sections/About/About";
import { AudienceBenefits } from "@/components/sections/AudienceBenefits/AudienceBenefits";
import { Courses } from "@/components/sections/Courses/Courses";
import { Curriculum } from "@/components/sections/Curriculum/Curriculum";
import { Faq } from "@/components/sections/Faq/Faq";
import { Hero } from "@/components/sections/Hero/Hero";
import { Pricing } from "@/components/sections/Pricing/Pricing";
import { Services } from "@/components/sections/Services/Services";
import { Testimonials } from "@/components/sections/Testimonials/Testimonials";
import { BackToTop } from "@/components/ui/BackToTop/BackToTop";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Curriculum />
        <Courses />
        <AudienceBenefits />
        <About />
        <Services />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
