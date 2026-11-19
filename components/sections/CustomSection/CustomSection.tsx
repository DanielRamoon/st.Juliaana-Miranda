import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import type { CustomSection as CustomSectionData } from "@/lib/content/types";
import { reveal } from "@/lib/reveal";
import styles from "./CustomSection.module.css";

export function CustomSection({ section }: { section: CustomSectionData }) {
  return (
    <section id={section.id} className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.content} {...reveal("up")}>
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
          />
          {section.buttonLabel && section.buttonHref ? (
            <div {...reveal("up", 1)}>
              <Button href={section.buttonHref}>{section.buttonLabel}</Button>
            </div>
          ) : null}
        </div>

        {section.image ? (
          <div className={styles.visual} {...reveal("right", 1)}>
            <Image
              src={section.image}
              alt=""
              fill
              sizes="(min-width: 900px) 480px, 90vw"
              className={styles.image}
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
