import type { AtmosphereScene } from "@/components/layout/SectionAtmosphere/SectionAtmosphere";
import type { SiteContent } from "./types";

const SELECTORS: Record<string, string> = {
  hero: "#inicio",
  curriculum: "#curso",
  courses: "#cursos",
  audience: "#beneficios",
  about: "#profissional",
  services: "#atendimentos",
  testimonials: "#depoimentos",
  pricing: "#investimento",
  faq: "#duvidas",
};

const FALLBACKS: Record<string, string> = {
  hero: "/assets/img/madeira.jpg",
  curriculum: "/assets/img/cursos/preparacao.jpg",
  courses: "/assets/img/cursos/alongamento.jpg",
  audience: "/assets/img/cursos/tecnicas.jpg",
  about: "/assets/img/img.jm2.png",
  services: "/assets/img/atendimento-spa-pes.jpg",
  testimonials: "/assets/img/resultados-maos.jpg",
  pricing: "/assets/img/profissao-nail.jpg",
  faq: "/assets/img/cursos/modelagem.jpg",
};

const LABELS: Record<string, string> = {
  hero: "Topo",
  curriculum: "Conteúdo",
  courses: "Cursos",
  audience: "Público",
  about: "Profissional",
  services: "Atendimentos",
  testimonials: "Depoimentos",
  pricing: "Investimento",
  faq: "Dúvidas",
};

function imageForSection(site: SiteContent, id: string) {
  switch (id) {
    case "hero":
      return FALLBACKS.hero;
    case "curriculum":
      return site.curriculum.lessons[0]?.image || FALLBACKS.curriculum;
    case "courses":
      return site.curriculum.lessons[1]?.image || FALLBACKS.courses;
    case "audience":
      return site.curriculum.lessons[2]?.image || FALLBACKS.audience;
    case "about":
      return site.about.photo || FALLBACKS.about;
    case "services":
      return site.services.image || FALLBACKS.services;
    case "testimonials":
      return site.testimonials.resultsImage || FALLBACKS.testimonials;
    case "pricing":
      return site.pricing.image || FALLBACKS.pricing;
    case "faq":
      return FALLBACKS.faq;
    default: {
      const custom = site.customSections.find((section) => section.id === id);
      return custom?.image || FALLBACKS.hero;
    }
  }
}

export function buildAtmosphereScenes(site: SiteContent): AtmosphereScene[] {
  return site.sectionsOrder
    .filter((id) => site.sectionVisibility[id] !== false)
    .map((id) => {
      const custom = site.customSections.find((section) => section.id === id);
      if (custom && !custom.enabled) return null;

      return {
        id,
        selector: SELECTORS[id] || `#${id}`,
        image: imageForSection(site, id),
        label: LABELS[id] || custom?.title || id,
      };
    })
    .filter((scene): scene is AtmosphereScene => Boolean(scene));
}
