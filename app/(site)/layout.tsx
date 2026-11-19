import { Intro } from "@/components/layout/Intro/Intro";
import { ScrollReveal } from "@/components/layout/ScrollReveal/ScrollReveal";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Intro />
      <ScrollReveal />
      {children}
    </>
  );
}
