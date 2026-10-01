import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { contact, services, WHATSAPP_HREF } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="atendimentos" className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.visual} {...reveal("left")}>
          <Image
            src="/assets/img/atendimento-spa-pes.jpg"
            alt="Atendimento de spa dos pés no estúdio"
            fill
            sizes="(min-width: 1024px) 460px, 90vw"
            className={styles.image}
          />
          <p className={styles.script} {...reveal("fade", 4)}>
            Acolhimento,
            <br />
            paz e valor.
          </p>
        </div>

        <div className={styles.content}>
          <SectionHeading
            eyebrow="Atendimentos"
            title={
              <>
                Estética, naturalidade
                <br />e durabilidade
              </>
            }
            description="Nos atendimentos, oferecemos serviços pensados para unir estética, naturalidade e durabilidade."
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
            Cada procedimento é realizado com atenção aos detalhes, priorizando
            saúde, resistência e um acabamento sofisticado, respeitando a
            essência de cada cliente.
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
            <Button href={WHATSAPP_HREF}>Agendar meu horário</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
