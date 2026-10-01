import {
  Award,
  BadgeCheck,
  BookOpen,
  BookOpenCheck,
  Brush,
  CalendarHeart,
  CircleAlert,
  Clock,
  Droplet,
  FileText,
  Flower2,
  Gem,
  Globe,
  GraduationCap,
  Hand,
  HandHeart,
  Headset,
  Layers,
  NotebookText,
  Palette,
  PenTool,
  Presentation,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";

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

const whatsappLink = (message: string) =>
  `https://wa.me/5574981324663?text=${encodeURIComponent(message)}`;

export const contact = {
  whatsapp: "(74) 98132-4663",
  whatsappHref: whatsappLink(
    "Olá, Juliana! Vim pelo site e gostaria de mais informações.",
  ),
  instagram: "@jumirandanailmaster",
  instagramHref: "https://www.instagram.com/jumirandanailmaster",
  address: "Rua Fernandes da Cunha, Centro",
  city: "Juazeiro - BA",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Rua+Fernandes+da+Cunha,+Centro,+Juazeiro+-+BA",
};

export const WHATSAPP_HREF = contact.whatsappHref;

export const CTA_HREF = whatsappLink(
  "Olá, Juliana! Vim pelo site e quero me inscrever em um curso.",
);

export const navLinks: NavLink[] = [
  { label: "Início", href: "#inicio" },
  { label: "Cursos", href: "#cursos" },
  { label: "Profissional", href: "#profissional" },
  { label: "Atendimentos", href: "#atendimentos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Investimento", href: "#investimento" },
];

export const heroHighlights: IconItem[] = [
  { icon: Award, label: "Certificado incluso" },
  { icon: Headset, label: "Suporte durante o curso" },
  { icon: BookOpen, label: "Material de apoio" },
];

export const lessons: Lesson[] = [
  {
    title: "Preparação das unhas",
    description: "Higienização, cutículas e estrutura da unha natural.",
    image: "/assets/img/cursos/preparacao.jpg",
    icon: Hand,
  },
  {
    title: "Alongamento",
    description: "Técnicas e formatos mais utilizados.",
    image: "/assets/img/cursos/alongamento.jpg",
    icon: Sparkles,
  },
  {
    title: "Técnicas de aplicação",
    description: "Fibra, gel, tips e molde.",
    image: "/assets/img/cursos/tecnicas.jpg",
    icon: PenTool,
  },
  {
    title: "Modelagem",
    description: "Formato perfeito e acabamento impecável.",
    image: "/assets/img/cursos/modelagem.jpg",
    icon: Brush,
  },
  {
    title: "Esmaltação e acabamento",
    description: "Cores, técnicas e brilho duradouro.",
    image: "/assets/img/cursos/esmaltacao.jpg",
    icon: Palette,
  },
  {
    title: "Manutenção",
    description: "Como prolongar a durabilidade do alongamento.",
    image: "/assets/img/cursos/manutencao.jpg",
    icon: Wrench,
  },
  {
    title: "Biossegurança",
    description: "Higienização, esterilização e cuidados essenciais.",
    image: "/assets/img/cursos/biosseguranca.jpg",
    icon: ShieldCheck,
  },
  {
    title: "Como evitar erros comuns",
    description: "Dicas práticas para mais segurança e resultados.",
    image: "/assets/img/cursos/erros-comuns.jpg",
    icon: CircleAlert,
  },
];

export const courses: Course[] = [
  {
    badge: "Para quem já atua",
    title: "Curso de Aperfeiçoamento",
    description: [
      "Voltado para profissionais que já atuam na área e desejam elevar o nível dos seus atendimentos com mais precisão, acabamento e naturalidade.",
      "Totalmente personalizado: a aluna escolhe exatamente o que precisa aprimorar dentro da sua técnica, de acordo com a sua necessidade individual.",
      "O objetivo é elevar o padrão do trabalho já existente, trazendo mais segurança, consistência e excelência nos resultados.",
    ],
    includesLabel: "O que trabalhamos",
    includes: [
      "Refinamento de aplicação",
      "Estrutura",
      "Acabamento",
      "Simetria",
      "Correções específicas",
    ],
  },
  {
    badge: "Ideal para iniciantes",
    title: "Formação 6 em 1",
    description: [
      "Um curso completo, ideal para quem deseja começar com o pé direito e já entrar no mercado dominando tudo o que é essencial em mesa.",
      "Aqui a aluna aprende desde a base até as técnicas mais procuradas, saindo preparada para atender com segurança, confiança e qualidade profissional.",
    ],
    includesLabel: "Inclui",
    includes: [
      "Alongamento em fibra de vidro",
      "Banho em gel",
      "Esmaltação em gel",
      "Blindagem",
      "Técnicas de formatos",
      "Unhas encapsuladas",
    ],
    featured: true,
  },
  {
    badge: "Técnica",
    title: "Curso de Molde F1",
    description: [
      "Focado no domínio da técnica com molde F1, proporcionando praticidade, padronização e resultados elegantes.",
    ],
    includesLabel: "Inclui também",
    includes: [
      "Banho em gel no molde F1",
      "Esmaltação em gel",
      "Blindagem",
      "Técnicas de formatos",
      "Unhas encapsuladas",
    ],
  },
  {
    badge: "Técnica",
    title: "Curso de Molde Sanduíche",
    description: [
      "Técnica voltada para estrutura e resistência, ideal para profissionais que buscam oferecer unhas mais duráveis com acabamento refinado.",
    ],
    includesLabel: "Mesmas bases técnicas do molde F1",
    includes: [
      "Banho em gel no molde",
      "Esmaltação em gel",
      "Blindagem",
      "Técnicas de formatos",
      "Unhas encapsuladas",
    ],
  },
];

export const coursesIncluded: IconItem[] = [
  { icon: NotebookText, label: "Apostila" },
  { icon: Presentation, label: "Aula teórica" },
  { icon: Hand, label: "Aula prática" },
  { icon: CalendarHeart, label: "Laboratório" },
];

export const services: Service[] = [
  { icon: Sparkles, name: "Alongamento em Fibra de Vidro" },
  { icon: PenTool, name: "Alongamento com Molde F1" },
  { icon: Droplet, name: "Banho em Gel" },
  { icon: Palette, name: "Esmaltação em Gel", detail: "Mãos e pés" },
  { icon: Hand, name: "Manicure Clássica", detail: "Mãos e pés" },
  { icon: Waves, name: "Escalda-Pés" },
  { icon: Flower2, name: "Spa dos Pés" },
];

export const audience: string[] = [
  "Quem está começando do zero",
  "Profissionais que querem aperfeiçoamento",
  "Quem quer trabalhar com unhas",
  "Quem deseja aumentar a renda",
];

export const benefits: IconItem[] = [
  { icon: Layers, label: "Aprenda passo a passo, do básico ao avançado" },
  { icon: BookOpenCheck, label: "Técnicas práticas e atualizadas" },
  { icon: FileText, label: "Material de apoio completo" },
  { icon: BadgeCheck, label: "Certificado de conclusão" },
  { icon: Headset, label: "Suporte durante o curso" },
];

export const teacher = {
  name: "Juliana Miranda",
  role: "Nail designer, educadora e fundadora",
  intro: [
    "Meu nome é Juliana Miranda, sou nail designer, educadora e fundadora de um espaço que nasceu com propósito: cuidar de pessoas através dos detalhes.",
    "Há mais de 6 anos atuo na área da beleza, e há mais de 5 anos ensino outras mulheres a viverem dessa profissão com excelência, identidade e verdade. Ao longo desse caminho, já formei mais de 2.000 alunas espalhadas pelo mundo, levando não apenas técnica, mas visão, posicionamento e direção.",
  ],
  highlights: [
    { icon: Clock, label: "Mais de 6 anos na área da beleza" },
    { icon: GraduationCap, label: "Mais de 5 anos formando profissionais" },
    { icon: Globe, label: "Alunas espalhadas pelo mundo" },
  ] satisfies IconItem[],
  quote: "Cuidar de pessoas através dos detalhes.",
  pillars: [
    {
      icon: Gem,
      title: "Minha essência",
      text: "Acredito que unhas vão além da estética. Elas carregam presença, identidade e cuidado. Por isso, meu trabalho é baseado em naturalidade, resistência e elegância: um padrão elevado que respeita a essência de cada cliente.",
    },
    {
      icon: HandHeart,
      title: "No atendimento",
      text: "Cada detalhe é pensado para proporcionar uma experiência única. Não é apenas sobre o resultado final, mas sobre o que a cliente sente enquanto está aqui: acolhimento, paz e valor.",
    },
    {
      icon: Users,
      title: "Nos cursos",
      text: "Meu compromisso é formar profissionais seguras, capacitadas e conscientes do seu diferencial. Ensino técnica, mas também ensino visão, porque crescer na área exige mais do que saber fazer, exige saber quem você é.",
    },
  ],
  closing: [
    "Este espaço foi construído com intenção. Aqui, tudo comunica: excelência, propósito e um cuidado que vem de dentro.",
    "Sou esposa, mãe da Maria Júlia e uma mulher que carrega sua fé como base de tudo o que constrói.",
  ],
  mission:
    "Quando há propósito, excelência e direção, o trabalho deixa de ser apenas profissão e se torna missão.",
  welcome: "Seja bem-vinda. 🤍",
};

export const testimonials: Testimonial[] = [
  {
    name: "Fernanda Souza",
    quote:
      "O curso superou todas as minhas expectativas! A Juliana ensina com tanto carinho e clareza que dá para aprender de verdade.",
    avatar: "/assets/img/depoimentos/fernanda.jpg",
    rating: 5,
  },
  {
    name: "Camila Oliveira",
    quote:
      "Hoje já tenho minha própria agenda e sou muito grata por ter feito esse curso. Foi o melhor investimento que já fiz!",
    avatar: "/assets/img/depoimentos/camila.jpg",
    rating: 5,
  },
  {
    name: "Larissa Rodrigues",
    quote:
      "Eu não tinha nenhuma experiência e consegui aprender tudo. As aulas são muito bem explicadas e o suporte é excelente!",
    avatar: "/assets/img/depoimentos/larissa.jpg",
    rating: 5,
  },
];

export const pricing = {
  course: "Curso de Alongamento de Unhas",
  highlight: "Vagas limitadas",
  note: "Consulte valores, datas das próximas turmas e formas de pagamento direto com a Juliana pelo WhatsApp.",
  included: [
    "Aulas práticas e teóricas",
    "Material de apoio completo",
    "Certificado de conclusão",
    "Suporte durante o curso",
  ],
  bonus: "guia de fornecedores",
};

export const faqs: Faq[] = [
  {
    question: "Preciso ter experiência na área?",
    answer:
      "Não. A Formação 6 em 1 começa do zero e é ideal para iniciantes. Para quem já atua, o Curso de Aperfeiçoamento é personalizado de acordo com o que você precisa aprimorar.",
  },
  {
    question: "Como funcionam as aulas?",
    answer:
      "Todos os cursos incluem apostila, aula teórica, aula prática e laboratório: um dia real de atendimento ao lado da Juliana, observando de perto a rotina, a técnica e o padrão de excelência.",
  },
  {
    question: "Recebo certificado?",
    answer:
      "Sim! Ao concluir todas as aulas você recebe um certificado de conclusão para comprovar sua formação.",
  },
  {
    question: "Qual curso é ideal para mim?",
    answer:
      "Se você está começando, a Formação 6 em 1. Se já atua e quer elevar o nível, o Aperfeiçoamento. Se quer dominar uma técnica específica, os cursos de Molde F1 ou Molde Sanduíche. Na dúvida, fale com a gente pelo WhatsApp.",
  },
  {
    question: "Quais materiais preciso ter?",
    answer:
      "Logo no início você recebe uma lista completa dos materiais, com indicações para começar gastando pouco, além do guia de fornecedores.",
  },
];
