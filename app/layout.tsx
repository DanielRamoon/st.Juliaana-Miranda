import type { Metadata } from "next";
import { Caveat, Lora, Montserrat } from "next/font/google";
import { INTRO_STORAGE_KEY } from "@/components/layout/Intro/constants";
import { getSiteContent } from "@/lib/content/store";
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

export async function generateMetadata(): Promise<Metadata> {
  try {
    const site = await getSiteContent();
    return {
      title: site.meta.title,
      description: site.meta.description,
    };
  } catch {
    return {
      title: "Juliana Miranda",
      description:
        "Nail designer, educadora e fundadora. Cursos de alongamento de unhas e atendimentos em Juazeiro - BA.",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body>{children}</body>
    </html>
  );
}
