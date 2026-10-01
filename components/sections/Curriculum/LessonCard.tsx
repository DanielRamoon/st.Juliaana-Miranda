import Image from "next/image";
import type { Lesson } from "@/data/landing";
import styles from "./LessonCard.module.css";

export function LessonCard({ title, description, image, icon: Icon }: Lesson) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
          className={styles.image}
        />
      </div>
      <span className={styles.icon}>
        <Icon aria-hidden />
      </span>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
