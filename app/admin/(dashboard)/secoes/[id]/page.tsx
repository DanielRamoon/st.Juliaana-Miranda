"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LinesField, TextField } from "@/components/admin/Field";
import { ImageField } from "@/components/admin/ImageField";
import { ICON_OPTIONS } from "@/lib/content/icons";
import { SECTION_LABELS } from "@/lib/content/labels";
import type { SiteContent } from "@/lib/content/types";
import styles from "../../../admin.module.css";

export default function SectionEditorPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [content, setContent] = useState<SiteContent | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data: SiteContent) => setContent(data));
  }, []);

  async function save() {
    if (!content) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Erro ao salvar");
      setMessage("Seção salva. Atualize o site para ver as mudanças.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  if (!content) return <p>Carregando editor…</p>;

  const customIndex = content.customSections.findIndex((s) => s.id === id);
  const title =
    customIndex >= 0
      ? content.customSections[customIndex].title
      : SECTION_LABELS[id] || id;

  return (
    <div>
      <div className={styles.row} style={{ marginBottom: "1rem" }}>
        <div>
          <h1 className={styles.title}>Editar: {title}</h1>
          <p className={styles.subtitle}>
            Altere textos e imagens. Nas imagens aparece o tamanho ideal.
          </p>
        </div>
        <Link className={styles.ghost} href="/admin">
          ← Voltar
        </Link>
      </div>

      <div className={styles.card}>
        {id === "hero" ? <HeroEditor content={content} setContent={setContent} /> : null}
        {id === "curriculum" ? (
          <CurriculumEditor content={content} setContent={setContent} />
        ) : null}
        {id === "courses" ? (
          <CoursesEditor content={content} setContent={setContent} />
        ) : null}
        {id === "audience" ? (
          <AudienceEditor content={content} setContent={setContent} />
        ) : null}
        {id === "about" ? (
          <AboutEditor content={content} setContent={setContent} />
        ) : null}
        {id === "services" ? (
          <ServicesEditor content={content} setContent={setContent} />
        ) : null}
        {id === "testimonials" ? (
          <TestimonialsEditor content={content} setContent={setContent} />
        ) : null}
        {id === "pricing" ? (
          <PricingEditor content={content} setContent={setContent} />
        ) : null}
        {id === "faq" ? <FaqEditor content={content} setContent={setContent} /> : null}
        {customIndex >= 0 ? (
          <CustomEditor
            content={content}
            setContent={setContent}
            index={customIndex}
          />
        ) : null}

        {!SECTION_LABELS[id] && customIndex < 0 ? (
          <p>Seção não encontrada.</p>
        ) : (
          <div className={styles.row}>
            <button
              type="button"
              className={styles.button}
              onClick={save}
              disabled={saving}
            >
              {saving ? "Salvando…" : "Salvar seção"}
            </button>
            {message ? <p className={styles.success}>{message}</p> : null}
          </div>
        )}
      </div>
    </div>
  );
}

type EditorProps = {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
};

function HeroEditor({ content, setContent }: EditorProps) {
  const hero = content.hero;
  return (
    <>
      <TextField
        label="Frase pequena (eyebrow)"
        value={hero.eyebrow}
        onChange={(eyebrow) => setContent({ ...content, hero: { ...hero, eyebrow } })}
      />
      <div className={styles.twoCol}>
        <TextField
          label="Título (antes)"
          value={hero.titleBefore}
          onChange={(titleBefore) =>
            setContent({ ...content, hero: { ...hero, titleBefore } })
          }
        />
        <TextField
          label="Título (palavra em negrito)"
          value={hero.titleStrong}
          onChange={(titleStrong) =>
            setContent({ ...content, hero: { ...hero, titleStrong } })
          }
        />
      </div>
      <TextField
        label="Título (meio)"
        value={hero.titleMid}
        onChange={(titleMid) =>
          setContent({ ...content, hero: { ...hero, titleMid } })
        }
      />
      <TextField
        label="Título (destaque verde)"
        value={hero.titleHighlight}
        onChange={(titleHighlight) =>
          setContent({ ...content, hero: { ...hero, titleHighlight } })
        }
      />
      <TextField
        label="Descrição"
        value={hero.description}
        onChange={(description) =>
          setContent({ ...content, hero: { ...hero, description } })
        }
        multiline
      />
      <TextField
        label="Texto do botão"
        value={hero.ctaLabel}
        onChange={(ctaLabel) =>
          setContent({ ...content, hero: { ...hero, ctaLabel } })
        }
      />
      <TextField
        label="Frase manuscrita (use Enter para quebrar linha)"
        value={hero.script}
        onChange={(script) => setContent({ ...content, hero: { ...hero, script } })}
        multiline
      />
      <ImageField
        label="Foto do topo"
        value={hero.photo}
        onChange={(photo) => setContent({ ...content, hero: { ...hero, photo } })}
        specKey="heroPhoto"
      />
      <IconItemsEditor
        label="Destaques"
        items={hero.highlights}
        onChange={(highlights) =>
          setContent({ ...content, hero: { ...hero, highlights } })
        }
      />
    </>
  );
}

function CurriculumEditor({ content, setContent }: EditorProps) {
  const data = content.curriculum;
  return (
    <>
      <TextField
        label="Eyebrow"
        value={data.eyebrow}
        onChange={(eyebrow) =>
          setContent({ ...content, curriculum: { ...data, eyebrow } })
        }
      />
      <TextField
        label="Título"
        value={data.title}
        onChange={(title) =>
          setContent({ ...content, curriculum: { ...data, title } })
        }
      />
      <TextField
        label="Descrição"
        value={data.description}
        onChange={(description) =>
          setContent({ ...content, curriculum: { ...data, description } })
        }
        multiline
      />
      <div className={styles.listEditor}>
        {data.lessons.map((lesson, index) => (
          <div key={index} className={styles.listItem}>
            <TextField
              label={`Aula ${index + 1} · título`}
              value={lesson.title}
              onChange={(title) => {
                const lessons = [...data.lessons];
                lessons[index] = { ...lesson, title };
                setContent({ ...content, curriculum: { ...data, lessons } });
              }}
            />
            <TextField
              label="Descrição"
              value={lesson.description}
              onChange={(description) => {
                const lessons = [...data.lessons];
                lessons[index] = { ...lesson, description };
                setContent({ ...content, curriculum: { ...data, lessons } });
              }}
            />
            <ImageField
              label="Imagem"
              value={lesson.image}
              onChange={(image) => {
                const lessons = [...data.lessons];
                lessons[index] = { ...lesson, image };
                setContent({ ...content, curriculum: { ...data, lessons } });
              }}
              specKey="lessonImage"
              wide
            />
            <IconSelect
              value={lesson.icon}
              onChange={(icon) => {
                const lessons = [...data.lessons];
                lessons[index] = { ...lesson, icon };
                setContent({ ...content, curriculum: { ...data, lessons } });
              }}
            />
            <button
              type="button"
              className={styles.danger}
              onClick={() => {
                const lessons = data.lessons.filter((_, i) => i !== index);
                setContent({ ...content, curriculum: { ...data, lessons } });
              }}
            >
              Remover aula
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.ghost}
        onClick={() =>
          setContent({
            ...content,
            curriculum: {
              ...data,
              lessons: [
                ...data.lessons,
                {
                  title: "Nova aula",
                  description: "Descrição",
                  image: "/assets/img/cursos/preparacao.jpg",
                  icon: "Sparkles",
                },
              ],
            },
          })
        }
      >
        + Adicionar aula
      </button>
    </>
  );
}

function CoursesEditor({ content, setContent }: EditorProps) {
  const data = content.courses;
  return (
    <>
      <TextField
        label="Eyebrow"
        value={data.eyebrow}
        onChange={(eyebrow) =>
          setContent({ ...content, courses: { ...data, eyebrow } })
        }
      />
      <TextField
        label="Título"
        value={data.title}
        onChange={(title) =>
          setContent({ ...content, courses: { ...data, title } })
        }
      />
      <TextField
        label="Título do bloco incluso"
        value={data.includedTitle}
        onChange={(includedTitle) =>
          setContent({ ...content, courses: { ...data, includedTitle } })
        }
      />
      <div className={styles.listEditor}>
        {data.items.map((course, index) => (
          <div key={index} className={styles.listItem}>
            <TextField
              label={`Curso ${index + 1} · título`}
              value={course.title}
              onChange={(title) => {
                const items = [...data.items];
                items[index] = { ...course, title };
                setContent({ ...content, courses: { ...data, items } });
              }}
            />
            <TextField
              label="Selo"
              value={course.badge}
              onChange={(badge) => {
                const items = [...data.items];
                items[index] = { ...course, badge };
                setContent({ ...content, courses: { ...data, items } });
              }}
            />
            <LinesField
              label="Descrição (um parágrafo por linha)"
              value={course.description}
              onChange={(description) => {
                const items = [...data.items];
                items[index] = { ...course, description };
                setContent({ ...content, courses: { ...data, items } });
              }}
            />
            <TextField
              label="Rótulo da lista"
              value={course.includesLabel}
              onChange={(includesLabel) => {
                const items = [...data.items];
                items[index] = { ...course, includesLabel };
                setContent({ ...content, courses: { ...data, items } });
              }}
            />
            <LinesField
              label="Itens inclusos"
              value={course.includes}
              onChange={(includes) => {
                const items = [...data.items];
                items[index] = { ...course, includes };
                setContent({ ...content, courses: { ...data, items } });
              }}
            />
            <label className={styles.hint}>
              <input
                type="checkbox"
                checked={Boolean(course.featured)}
                onChange={(e) => {
                  const items = [...data.items];
                  items[index] = { ...course, featured: e.target.checked };
                  setContent({ ...content, courses: { ...data, items } });
                }}
              />{" "}
              Destacar como principal
            </label>
            <button
              type="button"
              className={styles.danger}
              onClick={() => {
                const items = data.items.filter((_, i) => i !== index);
                setContent({ ...content, courses: { ...data, items } });
              }}
            >
              Remover curso
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.ghost}
        onClick={() =>
          setContent({
            ...content,
            courses: {
              ...data,
              items: [
                ...data.items,
                {
                  badge: "Novo",
                  title: "Novo curso",
                  description: ["Descrição do curso"],
                  includesLabel: "Inclui",
                  includes: ["Item 1"],
                },
              ],
            },
          })
        }
      >
        + Adicionar curso
      </button>
    </>
  );
}

function AudienceEditor({ content, setContent }: EditorProps) {
  const data = content.audience;
  return (
    <>
      <TextField
        label="Eyebrow do público"
        value={data.eyebrow}
        onChange={(eyebrow) =>
          setContent({ ...content, audience: { ...data, eyebrow } })
        }
      />
      <TextField
        label="Título do público"
        value={data.title}
        onChange={(title) =>
          setContent({ ...content, audience: { ...data, title } })
        }
      />
      <LinesField
        label="Lista do público"
        value={data.items}
        onChange={(items) =>
          setContent({ ...content, audience: { ...data, items } })
        }
      />
      <TextField
        label="Eyebrow dos benefícios"
        value={data.benefitsEyebrow}
        onChange={(benefitsEyebrow) =>
          setContent({ ...content, audience: { ...data, benefitsEyebrow } })
        }
      />
      <TextField
        label="Título dos benefícios"
        value={data.benefitsTitle}
        onChange={(benefitsTitle) =>
          setContent({ ...content, audience: { ...data, benefitsTitle } })
        }
      />
      <IconItemsEditor
        label="Benefícios"
        items={data.benefits}
        onChange={(benefits) =>
          setContent({ ...content, audience: { ...data, benefits } })
        }
      />
    </>
  );
}

function AboutEditor({ content, setContent }: EditorProps) {
  const about = content.about;
  return (
    <>
      <TextField
        label="Eyebrow"
        value={about.eyebrow}
        onChange={(eyebrow) =>
          setContent({ ...content, about: { ...about, eyebrow } })
        }
      />
      <div className={styles.twoCol}>
        <TextField
          label="Nome"
          value={about.name}
          onChange={(name) =>
            setContent({ ...content, about: { ...about, name } })
          }
        />
        <TextField
          label="Função"
          value={about.role}
          onChange={(role) =>
            setContent({ ...content, about: { ...about, role } })
          }
        />
      </div>
      <LinesField
        label="Biografia (um parágrafo por linha)"
        value={about.intro}
        onChange={(intro) =>
          setContent({ ...content, about: { ...about, intro } })
        }
      />
      <TextField
        label="Citação"
        value={about.quote}
        onChange={(quote) =>
          setContent({ ...content, about: { ...about, quote } })
        }
      />
      <TextField
        label="Número de alunas (ex.: + de 2.000)"
        value={about.studentsLabel}
        onChange={(studentsLabel) =>
          setContent({ ...content, about: { ...about, studentsLabel } })
        }
      />
      <ImageField
        label="Foto da profissional"
        value={about.photo}
        onChange={(photo) =>
          setContent({ ...content, about: { ...about, photo } })
        }
        specKey="aboutPhoto"
      />
      <IconItemsEditor
        label="Destaques"
        items={about.highlights}
        onChange={(highlights) =>
          setContent({ ...content, about: { ...about, highlights } })
        }
      />
      <LinesField
        label="Fechamento (parágrafos)"
        value={about.closing}
        onChange={(closing) =>
          setContent({ ...content, about: { ...about, closing } })
        }
      />
      <TextField
        label="Missão"
        value={about.mission}
        onChange={(mission) =>
          setContent({ ...content, about: { ...about, mission } })
        }
        multiline
      />
      <TextField
        label="Boas-vindas"
        value={about.welcome}
        onChange={(welcome) =>
          setContent({ ...content, about: { ...about, welcome } })
        }
      />
      <div className={styles.listEditor}>
        {about.pillars.map((pillar, index) => (
          <div key={index} className={styles.listItem}>
            <TextField
              label={`Pilar ${index + 1} · título`}
              value={pillar.title}
              onChange={(title) => {
                const pillars = [...about.pillars];
                pillars[index] = { ...pillar, title };
                setContent({ ...content, about: { ...about, pillars } });
              }}
            />
            <TextField
              label="Texto"
              value={pillar.text}
              onChange={(text) => {
                const pillars = [...about.pillars];
                pillars[index] = { ...pillar, text };
                setContent({ ...content, about: { ...about, pillars } });
              }}
              multiline
            />
            <IconSelect
              value={pillar.icon}
              onChange={(icon) => {
                const pillars = [...about.pillars];
                pillars[index] = { ...pillar, icon };
                setContent({ ...content, about: { ...about, pillars } });
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function ServicesEditor({ content, setContent }: EditorProps) {
  const data = content.services;
  return (
    <>
      <TextField
        label="Eyebrow"
        value={data.eyebrow}
        onChange={(eyebrow) =>
          setContent({ ...content, services: { ...data, eyebrow } })
        }
      />
      <TextField
        label="Título"
        value={data.title}
        onChange={(title) =>
          setContent({ ...content, services: { ...data, title } })
        }
      />
      <TextField
        label="Descrição"
        value={data.description}
        onChange={(description) =>
          setContent({ ...content, services: { ...data, description } })
        }
        multiline
      />
      <TextField
        label="Nota"
        value={data.note}
        onChange={(note) =>
          setContent({ ...content, services: { ...data, note } })
        }
        multiline
      />
      <TextField
        label="Frase manuscrita"
        value={data.script}
        onChange={(script) =>
          setContent({ ...content, services: { ...data, script } })
        }
        multiline
      />
      <TextField
        label="Texto do botão"
        value={data.ctaLabel}
        onChange={(ctaLabel) =>
          setContent({ ...content, services: { ...data, ctaLabel } })
        }
      />
      <ImageField
        label="Imagem dos atendimentos"
        value={data.image}
        onChange={(image) =>
          setContent({ ...content, services: { ...data, image } })
        }
        specKey="servicesImage"
      />
      <div className={styles.listEditor}>
        {data.items.map((item, index) => (
          <div key={index} className={styles.listItem}>
            <TextField
              label={`Serviço ${index + 1}`}
              value={item.name}
              onChange={(name) => {
                const items = [...data.items];
                items[index] = { ...item, name };
                setContent({ ...content, services: { ...data, items } });
              }}
            />
            <TextField
              label="Detalhe (opcional)"
              value={item.detail || ""}
              onChange={(detail) => {
                const items = [...data.items];
                items[index] = { ...item, detail };
                setContent({ ...content, services: { ...data, items } });
              }}
            />
            <IconSelect
              value={item.icon}
              onChange={(icon) => {
                const items = [...data.items];
                items[index] = { ...item, icon };
                setContent({ ...content, services: { ...data, items } });
              }}
            />
            <button
              type="button"
              className={styles.danger}
              onClick={() => {
                const items = data.items.filter((_, i) => i !== index);
                setContent({ ...content, services: { ...data, items } });
              }}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.ghost}
        onClick={() =>
          setContent({
            ...content,
            services: {
              ...data,
              items: [
                ...data.items,
                { icon: "Sparkles", name: "Novo serviço" },
              ],
            },
          })
        }
      >
        + Adicionar serviço
      </button>
    </>
  );
}

function TestimonialsEditor({ content, setContent }: EditorProps) {
  const data = content.testimonials;
  return (
    <>
      <TextField
        label="Eyebrow"
        value={data.eyebrow}
        onChange={(eyebrow) =>
          setContent({ ...content, testimonials: { ...data, eyebrow } })
        }
      />
      <TextField
        label="Título"
        value={data.title}
        onChange={(title) =>
          setContent({ ...content, testimonials: { ...data, title } })
        }
      />
      <TextField
        label="Frase manuscrita"
        value={data.script}
        onChange={(script) =>
          setContent({ ...content, testimonials: { ...data, script } })
        }
        multiline
      />
      <ImageField
        label="Imagem de resultados"
        value={data.resultsImage}
        onChange={(resultsImage) =>
          setContent({ ...content, testimonials: { ...data, resultsImage } })
        }
        specKey="testimonialsResults"
      />
      <div className={styles.listEditor}>
        {data.items.map((item, index) => (
          <div key={index} className={styles.listItem}>
            <TextField
              label={`Depoimento ${index + 1} · nome`}
              value={item.name}
              onChange={(name) => {
                const items = [...data.items];
                items[index] = { ...item, name };
                setContent({ ...content, testimonials: { ...data, items } });
              }}
            />
            <TextField
              label="Texto"
              value={item.quote}
              onChange={(quote) => {
                const items = [...data.items];
                items[index] = { ...item, quote };
                setContent({ ...content, testimonials: { ...data, items } });
              }}
              multiline
            />
            <ImageField
              label="Foto"
              value={item.avatar}
              onChange={(avatar) => {
                const items = [...data.items];
                items[index] = { ...item, avatar };
                setContent({ ...content, testimonials: { ...data, items } });
              }}
              specKey="testimonialAvatar"
            />
            <button
              type="button"
              className={styles.danger}
              onClick={() => {
                const items = data.items.filter((_, i) => i !== index);
                setContent({ ...content, testimonials: { ...data, items } });
              }}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.ghost}
        onClick={() =>
          setContent({
            ...content,
            testimonials: {
              ...data,
              items: [
                ...data.items,
                {
                  name: "Nova aluna",
                  quote: "Depoimento…",
                  avatar: "/assets/img/depoimentos/fernanda.jpg",
                  rating: 5,
                },
              ],
            },
          })
        }
      >
        + Adicionar depoimento
      </button>
    </>
  );
}

function PricingEditor({ content, setContent }: EditorProps) {
  const data = content.pricing;
  return (
    <>
      <TextField
        label="Eyebrow"
        value={data.eyebrow}
        onChange={(eyebrow) =>
          setContent({ ...content, pricing: { ...data, eyebrow } })
        }
      />
      <TextField
        label="Título"
        value={data.title}
        onChange={(title) =>
          setContent({ ...content, pricing: { ...data, title } })
        }
      />
      <TextField
        label="Descrição"
        value={data.description}
        onChange={(description) =>
          setContent({ ...content, pricing: { ...data, description } })
        }
        multiline
      />
      <TextField
        label="Nome do curso no card"
        value={data.course}
        onChange={(course) =>
          setContent({ ...content, pricing: { ...data, course } })
        }
      />
      <TextField
        label="Destaque (ex.: Vagas limitadas)"
        value={data.highlight}
        onChange={(highlight) =>
          setContent({ ...content, pricing: { ...data, highlight } })
        }
      />
      <TextField
        label="Nota"
        value={data.note}
        onChange={(note) =>
          setContent({ ...content, pricing: { ...data, note } })
        }
        multiline
      />
      <TextField
        label="Título do incluso"
        value={data.includedTitle}
        onChange={(includedTitle) =>
          setContent({ ...content, pricing: { ...data, includedTitle } })
        }
      />
      <LinesField
        label="Itens inclusos"
        value={data.included}
        onChange={(included) =>
          setContent({ ...content, pricing: { ...data, included } })
        }
      />
      <TextField
        label="Bônus"
        value={data.bonus}
        onChange={(bonus) =>
          setContent({ ...content, pricing: { ...data, bonus } })
        }
      />
      <TextField
        label="Selo do card"
        value={data.tag}
        onChange={(tag) => setContent({ ...content, pricing: { ...data, tag } })}
      />
      <TextField
        label="Texto do botão"
        value={data.ctaLabel}
        onChange={(ctaLabel) =>
          setContent({ ...content, pricing: { ...data, ctaLabel } })
        }
      />
      <ImageField
        label="Imagem do investimento"
        value={data.image}
        onChange={(image) =>
          setContent({ ...content, pricing: { ...data, image } })
        }
        specKey="pricingImage"
      />
    </>
  );
}

function FaqEditor({ content, setContent }: EditorProps) {
  const data = content.faq;
  return (
    <>
      <TextField
        label="Eyebrow"
        value={data.eyebrow}
        onChange={(eyebrow) =>
          setContent({ ...content, faq: { ...data, eyebrow } })
        }
      />
      <TextField
        label="Título"
        value={data.title}
        onChange={(title) =>
          setContent({ ...content, faq: { ...data, title } })
        }
      />
      <div className={styles.listEditor}>
        {data.items.map((item, index) => (
          <div key={index} className={styles.listItem}>
            <TextField
              label={`Pergunta ${index + 1}`}
              value={item.question}
              onChange={(question) => {
                const items = [...data.items];
                items[index] = { ...item, question };
                setContent({ ...content, faq: { ...data, items } });
              }}
            />
            <TextField
              label="Resposta"
              value={item.answer}
              onChange={(answer) => {
                const items = [...data.items];
                items[index] = { ...item, answer };
                setContent({ ...content, faq: { ...data, items } });
              }}
              multiline
            />
            <button
              type="button"
              className={styles.danger}
              onClick={() => {
                const items = data.items.filter((_, i) => i !== index);
                setContent({ ...content, faq: { ...data, items } });
              }}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.ghost}
        onClick={() =>
          setContent({
            ...content,
            faq: {
              ...data,
              items: [
                ...data.items,
                { question: "Nova pergunta?", answer: "Resposta…" },
              ],
            },
          })
        }
      >
        + Adicionar pergunta
      </button>
    </>
  );
}

function CustomEditor({
  content,
  setContent,
  index,
}: EditorProps & { index: number }) {
  const section = content.customSections[index];
  return (
    <>
      <TextField
        label="Eyebrow"
        value={section.eyebrow}
        onChange={(eyebrow) => {
          const customSections = [...content.customSections];
          customSections[index] = { ...section, eyebrow };
          setContent({ ...content, customSections });
        }}
      />
      <TextField
        label="Título"
        value={section.title}
        onChange={(title) => {
          const customSections = [...content.customSections];
          customSections[index] = { ...section, title };
          setContent({ ...content, customSections });
        }}
      />
      <TextField
        label="Descrição"
        value={section.description}
        onChange={(description) => {
          const customSections = [...content.customSections];
          customSections[index] = { ...section, description };
          setContent({ ...content, customSections });
        }}
        multiline
      />
      <TextField
        label="Texto do botão"
        value={section.buttonLabel}
        onChange={(buttonLabel) => {
          const customSections = [...content.customSections];
          customSections[index] = { ...section, buttonLabel };
          setContent({ ...content, customSections });
        }}
      />
      <TextField
        label="Link do botão"
        value={section.buttonHref}
        onChange={(buttonHref) => {
          const customSections = [...content.customSections];
          customSections[index] = { ...section, buttonHref };
          setContent({ ...content, customSections });
        }}
      />
      <ImageField
        label="Imagem da seção"
        value={section.image}
        onChange={(image) => {
          const customSections = [...content.customSections];
          customSections[index] = { ...section, image };
          setContent({ ...content, customSections });
        }}
        specKey="customSection"
        wide
      />
    </>
  );
}

function IconSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.field}>
      <label>Ícone</label>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {ICON_OPTIONS.map((icon) => (
          <option key={icon} value={icon}>
            {icon}
          </option>
        ))}
      </select>
    </div>
  );
}

function IconItemsEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: { icon: string; label: string }[];
  onChange: (items: { icon: string; label: string }[]) => void;
}) {
  return (
    <div className={styles.listEditor}>
      <strong>{label}</strong>
      {items.map((item, index) => (
        <div key={index} className={styles.listItem}>
          <TextField
            label={`Item ${index + 1}`}
            value={item.label}
            onChange={(nextLabel) => {
              const next = [...items];
              next[index] = { ...item, label: nextLabel };
              onChange(next);
            }}
          />
          <IconSelect
            value={item.icon}
            onChange={(icon) => {
              const next = [...items];
              next[index] = { ...item, icon };
              onChange(next);
            }}
          />
          <button
            type="button"
            className={styles.danger}
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            Remover
          </button>
        </div>
      ))}
      <button
        type="button"
        className={styles.ghost}
        onClick={() =>
          onChange([...items, { icon: "Sparkles", label: "Novo item" }])
        }
      >
        + Adicionar item
      </button>
    </div>
  );
}
