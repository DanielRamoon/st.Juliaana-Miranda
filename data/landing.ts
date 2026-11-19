import { getIcon } from "@/lib/content/icons";
import {
  getDerivedLinks,
  getSiteContent,
} from "@/lib/content/store";
import type { SiteContent } from "@/lib/content/types";
import type { LucideIcon } from "lucide-react";

export type NavLink = { label: string; href: string };
export type IconItem = { icon: LucideIcon; label: string };
export type Lesson = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
};
export type Testimonial = {
  name: string;
  quote: string;
  avatar: string;
  rating: number;
};
export type Faq = { question: string; answer: string };
export type Course = {
  badge: string;
  title: string;
  description: string[];
  includesLabel: string;
  includes: string[];
  featured?: boolean;
};
export type Service = { icon: LucideIcon; name: string; detail?: string };

function mapIcons<T extends { icon: string }>(items: T[]) {
  return items.map((item) => ({ ...item, icon: getIcon(item.icon) }));
}

export function getLanding() {
  const site = getSiteContent();
  const links = getDerivedLinks(site);

  return {
    site,
    contact: {
      whatsapp: site.contact.whatsapp,
      whatsappHref: links.whatsappHref,
      instagram: site.contact.instagram,
      instagramHref: site.contact.instagramHref,
      address: site.contact.address,
      city: site.contact.city,
      mapsHref: links.mapsHref,
    },
    WHATSAPP_HREF: links.whatsappHref,
    CTA_HREF: links.ctaHref,
    navLinks: site.navLinks,
    heroHighlights: mapIcons(site.hero.highlights),
    lessons: mapIcons(site.curriculum.lessons),
    courses: site.courses.items,
    coursesIncluded: mapIcons(site.courses.included),
    services: mapIcons(site.services.items),
    audience: site.audience.items,
    benefits: mapIcons(site.audience.benefits),
    teacher: {
      name: site.about.name,
      role: site.about.role,
      intro: site.about.intro,
      highlights: mapIcons(site.about.highlights),
      quote: site.about.quote,
      studentsLabel: site.about.studentsLabel,
      photo: site.about.photo,
      pillars: mapIcons(site.about.pillars),
      closing: site.about.closing,
      mission: site.about.mission,
      welcome: site.about.welcome,
    },
    testimonials: site.testimonials.items,
    pricing: {
      course: site.pricing.course,
      highlight: site.pricing.highlight,
      note: site.pricing.note,
      included: site.pricing.included,
      bonus: site.pricing.bonus,
      image: site.pricing.image,
      ctaLabel: site.pricing.ctaLabel,
      tag: site.pricing.tag,
      eyebrow: site.pricing.eyebrow,
      title: site.pricing.title,
      description: site.pricing.description,
      includedTitle: site.pricing.includedTitle,
    },
    faqs: site.faq.items,
    footer: site.footer,
    customSections: site.customSections,
    isSectionVisible: (id: string) => site.sectionVisibility[id] !== false,
    sectionsOrder: site.sectionsOrder,
  };
}

export type Landing = ReturnType<typeof getLanding>;

export function getCustomSection(site: SiteContent, id: string) {
  return site.customSections.find((section) => section.id === id);
}
