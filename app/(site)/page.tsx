import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { About } from "@/components/sections/About/About";
import { AudienceBenefits } from "@/components/sections/AudienceBenefits/AudienceBenefits";
import { Courses } from "@/components/sections/Courses/Courses";
import { Curriculum } from "@/components/sections/Curriculum/Curriculum";
import { CustomSection } from "@/components/sections/CustomSection/CustomSection";
import { Faq } from "@/components/sections/Faq/Faq";
import { Hero } from "@/components/sections/Hero/Hero";
import { Pricing } from "@/components/sections/Pricing/Pricing";
import { Services } from "@/components/sections/Services/Services";
import { Testimonials } from "@/components/sections/Testimonials/Testimonials";
import { BackToTop } from "@/components/ui/BackToTop/BackToTop";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton/WhatsAppButton";
import { getLanding } from "@/data/landing";

export const dynamic = "force-dynamic";

const BUILTIN = {
  hero: Hero,
  curriculum: Curriculum,
  courses: Courses,
  audience: AudienceBenefits,
  about: About,
  services: Services,
  testimonials: Testimonials,
  pricing: Pricing,
  faq: Faq,
} as const;

export default function Home() {
  const landing = getLanding();
  const { site, CTA_HREF, navLinks, isSectionVisible, sectionsOrder } = landing;

  return (
    <>
      <Header
        navLinks={navLinks}
        ctaHref={CTA_HREF}
        ctaLabel={site.hero.ctaLabel}
      />
      <main>
        {sectionsOrder.map((id) => {
          if (!isSectionVisible(id)) return null;

          const Builtin = BUILTIN[id as keyof typeof BUILTIN];
          if (Builtin) {
            const Component = Builtin;
            return <Component key={id} />;
          }

          const custom = site.customSections.find((section) => section.id === id);
          if (!custom || !custom.enabled) return null;
          return <CustomSection key={id} section={custom} />;
        })}
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton href={landing.WHATSAPP_HREF} />
    </>
  );
}
