"use client";

import { useState } from "react";
import {
  formatImageSize,
  IMAGE_SPECS,
} from "@/lib/content/image-specs";
import type { ImageSpec } from "@/lib/content/types";
import styles from "@/app/admin/admin.module.css";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  specKey: keyof typeof IMAGE_SPECS;
  wide?: boolean;
};

export function ImageField({
  label,
  value,
  onChange,
  specKey,
  wide,
}: ImageFieldProps) {
  const spec: ImageSpec = IMAGE_SPECS[specKey];
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Falha no upload");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={styles.field}>
      <label>{label}</label>
      <p className={styles.hint}>
        Tamanho ideal: <strong>{formatImageSize(spec)}</strong>. {spec.tip}
      </p>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className={`${styles.imagePreview} ${wide ? styles.imagePreviewWide : ""}`}
        />
      ) : null}
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/assets/img/..."
      />
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => handleUpload(e.target.files?.[0] ?? null)}
        disabled={uploading}
      />
      {uploading ? <p className={styles.hint}>Enviando imagem…</p> : null}
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
