import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/data/landing";
import styles from "./TestimonialCard.module.css";

export function TestimonialCard({ name, quote, avatar, rating }: Testimonial) {
  return (
    <figure className={styles.card}>
      <Image
        src={avatar}
        alt={name}
        width={52}
        height={52}
        className={styles.avatar}
      />
      <blockquote className={styles.quote}>“{quote}”</blockquote>
      <figcaption className={styles.footer}>
        <span className={styles.name}>{name}</span>
        <span className={styles.stars} aria-label={`${rating} de 5 estrelas`}>
          {Array.from({ length: rating }, (_, i) => (
            <Star key={i} aria-hidden />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
