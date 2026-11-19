import Image from "next/image";
import { Heart } from "lucide-react";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { getLanding } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import { TestimonialCard } from "./TestimonialCard";
import styles from "./Testimonials.module.css";

export function Testimonials() {
  const { site, testimonials } = getLanding();
  const data = site.testimonials;

  return (
    <section id="depoimentos" className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.main}>
          <SectionHeading eyebrow={data.eyebrow} title={data.title} />
          <ul className={styles.grid}>
            {testimonials.map((testimonial, index) => (
              <li key={testimonial.name} {...reveal("up", index)}>
                <TestimonialCard {...testimonial} />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.results} {...reveal("right", 2)}>
          <p className={styles.script}>
            {data.script.split("\n").map((line, index, lines) => (
              <span key={line}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </span>
            ))}
            <Heart className={styles.heart} aria-hidden />
          </p>
          <div className={styles.photo}>
            <Image
              src={data.resultsImage}
              alt="Mãos com alongamento de unhas finalizado"
              fill
              sizes="(min-width: 1200px) 320px, 90vw"
              className={styles.image}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
