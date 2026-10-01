import { AtSign, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Logo } from "@/components/ui/Logo/Logo";
import { SocialIcons } from "@/components/ui/SocialIcons/SocialIcons";
import { contact, WHATSAPP_HREF } from "@/data/landing";
import styles from "./Footer.module.css";

const contactLinks = [
  { icon: Phone, label: contact.whatsapp, href: contact.whatsappHref },
  { icon: AtSign, label: contact.instagram, href: contact.instagramHref },
  {
    icon: MapPin,
    label: `${contact.address} · ${contact.city}`,
    href: contact.mapsHref,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <Logo variant="light" className={styles.logo} />

          <div className={styles.tagline}>
            <p>
              Beleza, técnica e<br />
              independência financeira.
            </p>
            <span className={styles.divider} aria-hidden />
          </div>

          <div className={styles.actions}>
            <Button href={WHATSAPP_HREF} size="sm">
              Falar no WhatsApp
            </Button>
            <SocialIcons />
          </div>
        </div>

        <ul className={styles.contact}>
          {contactLinks.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <Icon aria-hidden />
                {label}
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.copyright}>
          © {year} Juliana Miranda. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}
