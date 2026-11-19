import type { ImageSpec } from "./types";

/** Tamanhos recomendados para cada imagem do site (largura × altura em pixels). */
export const IMAGE_SPECS: Record<string, ImageSpec> = {
  heroPhoto: {
    key: "heroPhoto",
    label: "Foto do topo (Hero)",
    width: 1024,
    height: 1536,
    tip: "Retrato vertical da profissional. Fundo transparente ou claro funciona melhor.",
  },
  aboutPhoto: {
    key: "aboutPhoto",
    label: "Foto da profissional",
    width: 900,
    height: 1200,
    tip: "Retrato vertical (proporção 3:4).",
  },
  lessonImage: {
    key: "lessonImage",
    label: "Imagem de aula / conteúdo",
    width: 640,
    height: 420,
    tip: "Horizontal, foto da técnica ou das mãos.",
  },
  testimonialAvatar: {
    key: "testimonialAvatar",
    label: "Foto de depoimento",
    width: 200,
    height: 200,
    tip: "Quadrada. Pode ser selfie ou foto do resultado.",
  },
  servicesImage: {
    key: "servicesImage",
    label: "Imagem dos atendimentos",
    width: 900,
    height: 1100,
    tip: "Vertical, ambiente ou procedimento.",
  },
  testimonialsResults: {
    key: "testimonialsResults",
    label: "Imagem de resultados",
    width: 800,
    height: 900,
    tip: "Vertical, close de unhas finalizadas.",
  },
  pricingImage: {
    key: "pricingImage",
    label: "Imagem do investimento",
    width: 1000,
    height: 1100,
    tip: "Vertical, profissional em atendimento.",
  },
  customSection: {
    key: "customSection",
    label: "Imagem de seção nova",
    width: 1200,
    height: 800,
    tip: "Horizontal (proporção 3:2).",
  },
  logo: {
    key: "logo",
    label: "Logo",
    width: 800,
    height: 270,
    tip: "Logo completa em PNG com fundo transparente.",
  },
};

export function formatImageSize(spec: ImageSpec) {
  return `${spec.width} × ${spec.height} px`;
}
