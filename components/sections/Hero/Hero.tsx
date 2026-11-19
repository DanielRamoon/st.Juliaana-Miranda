import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { getLanding } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import styles from "./Hero.module.css";

export function Hero() {
  const { site, CTA_HREF, heroHighlights } = getLanding();
  const hero = site.hero;

  return (
    <section id="inicio" className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow} {...reveal("up", 0)}>
            {hero.eyebrow}
          </span>

          <h1 className={styles.title} {...reveal("up", 1)}>
            {hero.titleBefore} <strong>{hero.titleStrong}</strong>{" "}
            {hero.titleMid}{" "}
            <span className={styles.highlight}>{hero.titleHighlight}</span>
          </h1>

          <p className={styles.description} {...reveal("up", 2)}>
            {hero.description}
          </p>

          <div {...reveal("up", 3)}>
            <Button href={CTA_HREF} size="lg">
              {hero.ctaLabel}
            </Button>
          </div>

          <ul className={styles.highlights}>
            {heroHighlights.map(({ icon: Icon, label }, index) => (
              <li
                key={label}
                className={styles.highlightItem}
                {...reveal("up", 4 + index)}
              >
                <span className={styles.highlightIcon}>
                  <Icon aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <div className={styles.wood} aria-hidden {...reveal("right", 1)} />
          <Image
            src={hero.photo}
            alt={`${site.about.name}, nail designer e educadora`}
            width={1024}
            height={1536}
            priority
            sizes="(min-width: 1024px) 420px, 80vw"
            className={styles.photo}
            {...reveal("up", 2)}
          />
          <p className={styles.script} {...reveal("fade", 6)}>
            {hero.script.split("\n").map((line, index, lines) => (
              <span key={line}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}
