import Image from "next/image";
import { Check, Gift, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { getLanding } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import styles from "./Pricing.module.css";

export function Pricing() {
  const { CTA_HREF, pricing } = getLanding();

  return (
    <section id="investimento" className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <SectionHeading
            eyebrow={pricing.eyebrow}
            title={pricing.title}
            description={pricing.description}
            divider={false}
            className={styles.heading}
          />

          <div className={styles.included} {...reveal("up", 1)}>
            <h3 className={styles.includedTitle}>{pricing.includedTitle}</h3>
            <ul className={styles.includedList}>
              {pricing.included.map((item) => (
                <li key={item}>
                  <Check aria-hidden />
                  {item}
                </li>
              ))}
              <li>
                <Check aria-hidden />
                <span>
                  <strong>Bônus:</strong> {pricing.bonus}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.card} {...reveal("zoom", 2)}>
          <span className={styles.tag}>{pricing.tag}</span>
          <h3 className={styles.course}>{pricing.course}</h3>
          <p className={styles.highlight}>{pricing.highlight}</p>
          <p className={styles.note}>{pricing.note}</p>

          <Button href={CTA_HREF} size="lg" fullWidth className={styles.cta}>
            {pricing.ctaLabel}
          </Button>

          <ul className={styles.guarantees}>
            <li>
              <Lock aria-hidden />
              Pagamento seguro
            </li>
            <li>
              <ShieldCheck aria-hidden />
              Garantia de 7 dias
            </li>
          </ul>
        </div>

        <div className={styles.visual} {...reveal("right", 3)}>
          <Image
            src={pricing.image}
            alt="Nail designer aplicando alongamento de unhas em uma cliente"
            fill
            sizes="(min-width: 1024px) 360px, 90vw"
            className={styles.image}
          />
          <div className={styles.brand}>
            <Image
              src="/assets/img/logo.JM.png"
              alt=""
              width={2169}
              height={725}
              sizes="200px"
            />
          </div>
          <span className={styles.bonus}>
            <Gift aria-hidden />
            Bônus
            <small>exclusivos</small>
          </span>
        </div>
      </Container>
    </section>
  );
}
