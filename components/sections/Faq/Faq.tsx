import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { getLanding } from "@/data/landing";
import { reveal } from "@/lib/reveal";
import styles from "./Faq.module.css";

export async function Faq() {
  const { site, faqs } = await getLanding();
  const data = site.faq;

  return (
    <section id="duvidas" className={styles.section}>
      <Container className={styles.inner}>
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          divider={false}
        />

        <div className={styles.list}>
          {faqs.map(({ question, answer }, index) => (
            <details
              key={question}
              className={styles.item}
              name="faq"
              {...reveal("up", index % 4)}
            >
              <summary className={styles.question}>
                {question}
                <Plus className={styles.icon} aria-hidden />
              </summary>
              <p className={styles.answer}>{answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
