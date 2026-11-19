"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../admin.module.css";
import { SECTION_LABELS } from "@/lib/content/labels";
import type { CustomSection, SiteContent } from "@/lib/content/types";

export default function AdminHomePage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data: SiteContent) => setContent(data));
  }, []);

  async function save(next: SiteContent, okMessage = "Alterações salvas") {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Erro ao salvar");
      setContent(next);
      setMessage(okMessage);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  function toggle(id: string) {
    if (!content) return;
    const next = {
      ...content,
      sectionVisibility: {
        ...content.sectionVisibility,
        [id]: content.sectionVisibility[id] === false ? true : false,
      },
    };
    if (id.startsWith("custom-")) {
      next.customSections = content.customSections.map((section) =>
        section.id === id
          ? { ...section, enabled: next.sectionVisibility[id] !== false }
          : section,
      );
    }
    void save(next, next.sectionVisibility[id] === false ? "Seção ocultada" : "Seção ativada");
  }

  function move(id: string, direction: -1 | 1) {
    if (!content) return;
    const order = [...content.sectionsOrder];
    const index = order.indexOf(id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= order.length) return;
    [order[index], order[target]] = [order[target], order[index]];
    void save({ ...content, sectionsOrder: order }, "Ordem atualizada");
  }

  function addCustomSection() {
    if (!content) return;
    const id = `custom-${Date.now()}`;
    const section: CustomSection = {
      id,
      type: "custom",
      enabled: true,
      title: "Nova seção",
      eyebrow: "Destaque",
      description: "Escreva aqui o texto da nova seção.",
      image: "",
      buttonLabel: "Falar no WhatsApp",
      buttonHref: "",
    };
    void save(
      {
        ...content,
        customSections: [...content.customSections, section],
        sectionsOrder: [...content.sectionsOrder, id],
        sectionVisibility: { ...content.sectionVisibility, [id]: true },
      },
      "Seção criada",
    );
  }

  function removeCustom(id: string) {
    if (!content) return;
    if (!confirm("Excluir esta seção permanentemente?")) return;
    const visibility = { ...content.sectionVisibility };
    delete visibility[id];
    void save(
      {
        ...content,
        customSections: content.customSections.filter((s) => s.id !== id),
        sectionsOrder: content.sectionsOrder.filter((item) => item !== id),
        sectionVisibility: visibility,
      },
      "Seção excluída",
    );
  }

  if (!content) {
    return <p>Carregando painel…</p>;
  }

  return (
    <div>
      <h1 className={styles.title}>Conteúdo do site</h1>
      <p className={styles.subtitle}>
        Edite textos e imagens, oculte seções, mude a ordem ou crie uma seção
        nova. Em cada imagem o admin mostra o tamanho ideal.
      </p>

      <div className={styles.row} style={{ marginBottom: "1rem" }}>
        <button
          type="button"
          className={styles.button}
          onClick={addCustomSection}
          disabled={saving}
        >
          + Nova seção
        </button>
        {message ? <p className={styles.success}>{message}</p> : null}
      </div>

      <div className={styles.sectionList}>
        {content.sectionsOrder.map((id) => {
          const custom = content.customSections.find((s) => s.id === id);
          const label = custom?.title || SECTION_LABELS[id] || id;
          const visible = content.sectionVisibility[id] !== false;
          return (
            <div key={id} className={styles.sectionItem}>
              <div className={styles.sectionMeta}>
                <strong>{label}</strong>
                <span className={styles.badge}>
                  {custom ? "Seção nova" : "Seção do site"} ·{" "}
                  {visible ? "Visível" : "Oculta"}
                </span>
              </div>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.ghost}
                  onClick={() => move(id, -1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={styles.ghost}
                  onClick={() => move(id, 1)}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={styles.ghost}
                  onClick={() => toggle(id)}
                >
                  {visible ? "Ocultar" : "Mostrar"}
                </button>
                <Link className={styles.button} href={`/admin/secoes/${id}`}>
                  Editar
                </Link>
                {custom ? (
                  <button
                    type="button"
                    className={styles.danger}
                    onClick={() => removeCustom(id)}
                  >
                    Excluir
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
