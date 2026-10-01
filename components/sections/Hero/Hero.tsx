import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { CTA_HREF, heroHighlights } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow} {...reveal("up", 0)}>
            Curso de alongamento de unhas
          </span>

          <h1 className={styles.title} {...reveal("up", 1)}>
            Domine as técnicas de <strong>alongamento</strong> de unhas e
            transforme sua habilidade{" "}
            <span className={styles.highlight}>em uma profissão.</span>
          </h1>

          <p className={styles.description} {...reveal("up", 2)}>
            Aprenda do zero, com uma metodologia prática e passo a passo, e
            conquiste sua independência financeira através da beleza.
          </p>

          <div {...reveal("up", 3)}>
            <Button href={CTA_HREF} size="lg">
              Quero me inscrever
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
            src="/assets/img/img.juliana.png"
            alt="Juliana Miranda, nail designer e educadora"
            width={1024}
            height={1536}
            priority
            sizes="(min-width: 1024px) 420px, 80vw"
            className={styles.photo}
            {...reveal("up", 2)}
          />
          <p className={styles.script} {...reveal("fade", 6)}>
            Mais do que
            <br />
            unhas, é sobre
            <br />a sua liberdade!
          </p>
        </div>
      </Container>
    </section>
  );
}
