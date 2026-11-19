import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { getLanding } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import styles from "./Services.module.css";

export async function Services() {
  const { site, services, contact, WHATSAPP_HREF } = await getLanding();
  const data = site.services;

  return (
    <section id="atendimentos" className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.visual} {...reveal("left")}>
          <Image
            src={data.image}
            alt="Atendimento de spa dos pés no estúdio"
            fill
            sizes="(min-width: 1024px) 460px, 90vw"
            className={styles.image}
          />
          <p className={styles.script} {...reveal("fade", 4)}>
            {data.script.split("\n").map((line, index, lines) => (
              <span key={line}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>

        <div className={styles.content}>
          <SectionHeading
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
          />

          <ul className={styles.list}>
            {services.map(({ icon: Icon, name, detail }, index) => (
              <li key={name} className={styles.item} {...reveal("up", index)}>
                <span className={styles.icon}>
                  <Icon aria-hidden />
                </span>
                <span>
                  <span className={styles.name}>{name}</span>
                  {detail && <span className={styles.detail}>{detail}</span>}
                </span>
              </li>
            ))}
          </ul>

          <p className={styles.note} {...reveal("up")}>
            {data.note}
          </p>

          <a
            href={contact.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.address}
            {...reveal("up", 1)}
          >
            <MapPin aria-hidden />
            <span>
              <strong>{contact.address}</strong>
              {contact.city}
            </span>
          </a>

          <div {...reveal("up", 2)}>
            <Button href={WHATSAPP_HREF}>{data.ctaLabel}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
