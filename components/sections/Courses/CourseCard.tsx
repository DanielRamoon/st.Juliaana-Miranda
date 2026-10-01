import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { WHATSAPP_HREF, type Course } from "@/data/landing";
import styles from "./CourseCard.module.css";

export function CourseCard({
  badge,
  title,
  description,
  includesLabel,
  includes,
  featured = false,
}: Course) {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <span className={styles.badge}>{badge}</span>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.description}>
        {description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className={styles.includes}>
        <span className={styles.includesLabel}>{includesLabel}</span>
        <ul className={styles.tags}>
          {includes.map((item) => (
            <li key={item} className={styles.tag}>
              <Check aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Button
        href={WHATSAPP_HREF}
        variant={featured ? "light" : "primary"}
        className={styles.cta}
      >
        Quero saber mais
      </Button>
    </article>
  );
}
