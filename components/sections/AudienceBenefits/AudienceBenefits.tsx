import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { audience, benefits } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import styles from "./AudienceBenefits.module.css";

export function AudienceBenefits() {
  return (
    <section id="beneficios" className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.column}>
          <SectionHeading
            eyebrow="Para quem é o curso?"
            title={
              <>
                Seja qual for o seu momento,
                <br />
                esse curso é para você!
              </>
            }
          />
          <ul className={styles.list}>
            {audience.map((item, index) => (
              <li key={item} className={styles.item} {...reveal("left", index)}>
                <span className={styles.check}>
                  <Check aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <SectionHeading
            eyebrow="Benefícios"
            title={
              <>
                Mais que um curso,
                <br />
                uma oportunidade real.
              </>
            }
          />
          <ul className={styles.list}>
            {benefits.map(({ icon: Icon, label }, index) => (
              <li
                key={label}
                className={styles.item}
                {...reveal("right", index)}
              >
                <span className={styles.benefitIcon}>
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
