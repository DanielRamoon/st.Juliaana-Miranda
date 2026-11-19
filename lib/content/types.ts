export type NavLink = { label: string; href: string };

export type IconItem = { icon: string; label: string };

export type Lesson = {
  title: string;
  description: string;
  image: string;
  icon: string;
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

export type Service = { icon: string; name: string; detail?: string };

export type TeacherPillar = {
  icon: string;
  title: string;
  text: string;
};

export type BuiltInSectionId =
  | "hero"
  | "curriculum"
  | "courses"
  | "audience"
  | "about"
  | "services"
  | "testimonials"
  | "pricing"
  | "faq";

export type CustomSection = {
  id: string;
  type: "custom";
  enabled: boolean;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  buttonLabel: string;
  buttonHref: string;
};

export type SectionMeta = {
  id: BuiltInSectionId | string;
  type: "builtin" | "custom";
  enabled: boolean;
  label: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  contact: {
    whatsapp: string;
    whatsappMessage: string;
    ctaMessage: string;
    instagram: string;
    instagramHref: string;
    address: string;
    city: string;
  };
  navLinks: NavLink[];
  sectionsOrder: string[];
  sectionVisibility: Record<string, boolean>;
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleStrong: string;
    titleMid: string;
    titleHighlight: string;
    description: string;
    ctaLabel: string;
    photo: string;
    script: string;
    highlights: IconItem[];
  };
  curriculum: {
    eyebrow: string;
    title: string;
    description: string;
    lessons: Lesson[];
  };
  courses: {
    eyebrow: string;
    title: string;
    items: Course[];
    includedTitle: string;
    included: IconItem[];
  };
  audience: {
    eyebrow: string;
    title: string;
    items: string[];
    benefitsEyebrow: string;
    benefitsTitle: string;
    benefits: IconItem[];
  };
  about: {
    eyebrow: string;
    photo: string;
    name: string;
    role: string;
    intro: string[];
    highlights: IconItem[];
    quote: string;
    studentsLabel: string;
    pillars: TeacherPillar[];
    closing: string[];
    mission: string;
    welcome: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    script: string;
    note: string;
    ctaLabel: string;
    items: Service[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    script: string;
    resultsImage: string;
    items: Testimonial[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    course: string;
    highlight: string;
    note: string;
    includedTitle: string;
    included: string[];
    bonus: string;
    image: string;
    ctaLabel: string;
    tag: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Faq[];
  };
  footer: {
    tagline: string;
    ctaLabel: string;
  };
  customSections: CustomSection[];
};

export type ImageSpec = {
  key: string;
  label: string;
  width: number;
  height: number;
  tip: string;
};
