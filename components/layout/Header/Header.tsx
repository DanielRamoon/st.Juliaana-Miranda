"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Logo } from "@/components/ui/Logo/Logo";
import { CTA_HREF, navLinks } from "@/data/landing";
import styles from "./Header.module.css";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo className={styles.logo} priority />

        <nav
          id="menu-principal"
          className={`${styles.nav} ${isOpen ? styles.open : ""}`}
          aria-label="Menu principal"
        >
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={CTA_HREF} size="sm" className={styles.mobileCta}>
            Quero me inscrever
          </Button>
        </nav>

        <Button href={CTA_HREF} size="sm" className={styles.desktopCta}>
          Quero me inscrever
        </Button>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="menu-principal"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </Container>
    </header>
  );
}
