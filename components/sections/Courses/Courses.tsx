import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { courses, coursesIncluded } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import { CourseCard } from "./CourseCard";
import styles from "./Courses.module.css";

export function Courses() {
  return (
    <section id="cursos" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="Formação profissional"
          title={
            <>
              Cursos que formam nail designers
              <br />
              seguras e diferenciadas
            </>
          }
          description="Na formação de profissionais, ofereço cursos pensados para desenvolver técnica, visão e posicionamento, formando nail designers seguras, preparadas e diferenciadas no mercado."
        />

        <ul className={styles.grid}>
          {courses.map((course, index) => (
            <li key={course.title} {...reveal("up", index % 2)}>
              <CourseCard {...course} />
            </li>
          ))}
        </ul>

        <div className={styles.included} {...reveal("zoom")}>
          <div className={styles.includedText}>
            <h3 className={styles.includedTitle}>Todos os cursos incluem</h3>
            <p>
              O <strong>laboratório</strong> é um momento exclusivo onde a aluna
              vivencia um dia real de atendimento ao meu lado, observando de
              perto a rotina, a técnica e o padrão de excelência aplicados na
              prática.
            </p>
          </div>

          <ul className={styles.includedList}>
            {coursesIncluded.map(({ icon: Icon, label }, index) => (
              <li
                key={label}
                className={styles.includedItem}
                {...reveal("up", index + 2)}
              >
                <span className={styles.includedIcon}>
                  <Icon aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
