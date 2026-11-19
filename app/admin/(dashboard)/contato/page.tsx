"use client";

import { useEffect, useState } from "react";
import { TextField } from "@/components/admin/Field";
import type { SiteContent } from "@/lib/content/types";
import styles from "../../admin.module.css";

export default function ContactAdminPage() {
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
      setMessage("Contato salvo");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  if (!content) return <p>Carregando…</p>;

  const contact = content.contact;

  return (
    <div>
      <h1 className={styles.title}>Contato e rodapé</h1>
      <p className={styles.subtitle}>
        WhatsApp, Instagram, endereço e textos do rodapé.
      </p>

      <div className={styles.card}>
        <div className={styles.twoCol}>
          <TextField
            label="WhatsApp (exibição)"
            value={contact.whatsapp}
            onChange={(whatsapp) =>
              setContent({ ...content, contact: { ...contact, whatsapp } })
            }
          />
          <TextField
            label="Instagram (exibição)"
            value={contact.instagram}
            onChange={(instagram) =>
              setContent({ ...content, contact: { ...contact, instagram } })
            }
          />
        </div>
        <TextField
          label="Link do Instagram"
          value={contact.instagramHref}
          onChange={(instagramHref) =>
            setContent({ ...content, contact: { ...contact, instagramHref } })
          }
        />
        <TextField
          label="Mensagem padrão do WhatsApp"
          value={contact.whatsappMessage}
          onChange={(whatsappMessage) =>
            setContent({ ...content, contact: { ...contact, whatsappMessage } })
          }
          multiline
        />
        <TextField
          label="Mensagem do botão Quero me inscrever"
          value={contact.ctaMessage}
          onChange={(ctaMessage) =>
            setContent({ ...content, contact: { ...contact, ctaMessage } })
          }
          multiline
        />
        <div className={styles.twoCol}>
          <TextField
            label="Endereço"
            value={contact.address}
            onChange={(address) =>
              setContent({ ...content, contact: { ...contact, address } })
            }
          />
          <TextField
            label="Cidade"
            value={contact.city}
            onChange={(city) =>
              setContent({ ...content, contact: { ...contact, city } })
            }
          />
        </div>
        <TextField
          label="Frase do rodapé"
          value={content.footer.tagline}
          onChange={(tagline) =>
            setContent({ ...content, footer: { ...content.footer, tagline } })
          }
        />
        <TextField
          label="Botão do rodapé"
          value={content.footer.ctaLabel}
          onChange={(ctaLabel) =>
            setContent({ ...content, footer: { ...content.footer, ctaLabel } })
          }
        />
        <TextField
          label="Título da aba do navegador"
          value={content.meta.title}
          onChange={(title) =>
            setContent({ ...content, meta: { ...content.meta, title } })
          }
        />
        <TextField
          label="Descrição do site (SEO)"
          value={content.meta.description}
          onChange={(description) =>
            setContent({ ...content, meta: { ...content.meta, description } })
          }
          multiline
        />

        <div className={styles.row}>
          <button
            type="button"
            className={styles.button}
            onClick={save}
            disabled={saving}
          >
            {saving ? "Salvando…" : "Salvar contato"}
          </button>
          {message ? <p className={styles.success}>{message}</p> : null}
        </div>
      </div>
    </div>
  );
}
