import Image from "next/image";
import { Heart, Users } from "lucide-react";
import { Container } from "@/components/ui/Container/Container";
import { teacher } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="profissional" className={styles.section}>
      <Container>
        <div className={styles.top}>
          <div className={styles.photo} {...reveal("left")}>
            <Image
              src="/assets/img/img.jm2.png"
              alt="Juliana Miranda sentada, de blusa branca e calça verde"
              fill
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 90vw"
              className={styles.image}
            />
          </div>

          <div className={styles.content} {...reveal("up", 1)}>
            <span className={styles.eyebrow}>Sobre a profissional</span>
            <h2 className={styles.name}>{teacher.name}</h2>
            <p className={styles.role}>{teacher.role}</p>
            {teacher.intro.map((paragraph) => (
              <p key={paragraph} className={styles.bio}>
                {paragraph}
              </p>
            ))}

            <ul className={styles.highlights}>
              {teacher.highlights.map(({ icon: Icon, label }) => (
                <li key={label} className={styles.highlight}>
                  <Icon aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <aside className={styles.card} {...reveal("right", 2)}>
            <p className={styles.script}>{teacher.quote}</p>
            <Heart className={styles.heart} aria-hidden />

            <div className={styles.stat}>
              <Users className={styles.statIcon} aria-hidden />
              <p>
                <strong>+ de 2.000</strong>
                <span>alunas formadas</span>
              </p>
            </div>
          </aside>
        </div>

        <ul className={styles.pillars}>
          {teacher.pillars.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className={styles.pillar} {...reveal("up", index)}>
              <span className={styles.pillarIcon}>
                <Icon aria-hidden />
              </span>
              <h3 className={styles.pillarTitle}>{title}</h3>
              <p className={styles.pillarText}>{text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.closing}>
          {teacher.closing.map((paragraph, index) => (
            <p
              key={paragraph}
              className={styles.closingText}
              {...reveal("up", index)}
            >
              {paragraph}
            </p>
          ))}
          <blockquote className={styles.mission} {...reveal("zoom")}>
            {teacher.mission}
          </blockquote>
          <p className={styles.welcome} {...reveal("up", 2)}>
            {teacher.welcome}
          </p>
        </div>
      </Container>
    </section>
  );
}
