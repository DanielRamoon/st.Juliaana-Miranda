import { AtSign, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Logo } from "@/components/ui/Logo/Logo";
import { SocialIcons } from "@/components/ui/SocialIcons/SocialIcons";
import { getLanding } from "@/data/landing";
import styles from "./Footer.module.css";

export async function Footer() {
  const { contact, WHATSAPP_HREF, footer } = await getLanding();
  const year = new Date().getFullYear();

  const contactLinks = [
    { icon: Phone, label: contact.whatsapp, href: contact.whatsappHref },
    { icon: AtSign, label: contact.instagram, href: contact.instagramHref },
    {
      icon: MapPin,
      label: `${contact.address} · ${contact.city}`,
      href: contact.mapsHref,
    },
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <Logo variant="light" className={styles.logo} />

          <div className={styles.tagline}>
            <p>{footer.tagline}</p>
            <span className={styles.divider} aria-hidden />
          </div>

          <div className={styles.actions}>
            <Button href={WHATSAPP_HREF} size="sm">
              {footer.ctaLabel}
            </Button>
            <SocialIcons instagramHref={contact.instagramHref} />
          </div>
        </div>

        <ul className={styles.contacts}>
          {contactLinks.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contact}
              >
                <Icon aria-hidden />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.copy}>
          © {year} Juliana Miranda. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}
