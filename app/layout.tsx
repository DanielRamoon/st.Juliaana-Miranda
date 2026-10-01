import type { Metadata } from "next";
import { Caveat, Lora, Montserrat } from "next/font/google";
import { Intro } from "@/components/layout/Intro/Intro";
import { INTRO_STORAGE_KEY } from "@/components/layout/Intro/constants";
import { ScrollReveal } from "@/components/layout/ScrollReveal/ScrollReveal";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Juliana Miranda",
  description:
    "Nail designer, educadora e fundadora. Cursos de alongamento de unhas e atendimentos em Juazeiro - BA.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${lora.variable} ${montserrat.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.dataset.reveal="ready";try{if(sessionStorage.getItem("${INTRO_STORAGE_KEY}"))d.dataset.intro="seen"}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <Intro />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
