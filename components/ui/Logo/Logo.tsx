import Image from "next/image";
import styles from "./Logo.module.css";

type LogoProps = {
  variant?: "default" | "light";
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "default",
  className = "",
  priority = false,
}: LogoProps) {
  return (
    <a
      href="#inicio"
      className={`${styles.logo} ${styles[variant]} ${className}`}
      aria-label="Juliana Miranda - Início"
    >
      <Image
        src="/assets/img/logo.JM.png"
        alt="Juliana Miranda"
        width={2169}
        height={725}
        priority={priority}
        sizes="240px"
        className={styles.image}
      />
    </a>
  );
}
