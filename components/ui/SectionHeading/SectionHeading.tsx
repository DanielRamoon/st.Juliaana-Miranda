import type { ReactNode } from "react";
import { reveal } from "@/lib/reveal";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2";
  divider?: boolean;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  divider = true,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${styles.heading} ${styles[align]} ${className}`}
      {...reveal("up")}
    >
      <span className={styles.eyebrow}>{eyebrow}</span>
      <Tag className={styles.title}>{title}</Tag>
      {description && <p className={styles.description}>{description}</p>}
      {divider && <span className={styles.divider} aria-hidden />}
    </div>
  );
}
