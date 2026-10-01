import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { lessons } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import { LessonCard } from "./LessonCard";
import styles from "./Curriculum.module.css";

export function Curriculum() {
  return (
    <section id="curso" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="O que você vai aprender"
          title={
            <>
              Conteúdo completo,
              <br />
              com foco na prática
            </>
          }
          description="Do básico ao avançado, você vai aprender todas as etapas para realizar alongamentos com segurança, beleza e durabilidade."
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
