import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { getLanding } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import { LessonCard } from "./LessonCard";
import styles from "./Curriculum.module.css";

export async function Curriculum() {
  const { site, lessons } = await getLanding();
  const { curriculum } = site;

  return (
    <section id="curso" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow={curriculum.eyebrow}
          title={curriculum.title}
          description={curriculum.description}
        />

        <ul className={styles.grid}>
          {lessons.map((lesson, index) => (
            <li key={lesson.title} {...reveal("up", index % 4)}>
              <LessonCard {...lesson} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
