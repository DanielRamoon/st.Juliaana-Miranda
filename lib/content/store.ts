import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import { cache } from "react";
import type { SiteContent } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CONTENT_FILE = path.join(CONTENT_DIR, "site.json");
const BLOB_PATHNAME = "content/site.json";

function hasBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function readLocalContent(): SiteContent {
  const raw = readFileSync(CONTENT_FILE, "utf8");
  return JSON.parse(raw) as SiteContent;
}

function writeLocalContent(content: SiteContent) {
  mkdirSync(CONTENT_DIR, { recursive: true });
  const temp = `${CONTENT_FILE}.tmp`;
  writeFileSync(temp, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  renameSync(temp, CONTENT_FILE);
}

async function readBlobContent(): Promise<SiteContent | null> {
  const { blobs } = await list({
    prefix: BLOB_PATHNAME,
    limit: 10,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const match =
    blobs.find((blob) => blob.pathname === BLOB_PATHNAME) ?? blobs[0];

  if (!match) return null;

  const response = await fetch(match.url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Falha ao ler conteúdo no Blob (${response.status})`);
  }

  return (await response.json()) as SiteContent;
}

async function writeBlobContent(content: SiteContent) {
  await put(BLOB_PATHNAME, `${JSON.stringify(content, null, 2)}\n`, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (hasBlob()) {
    const fromBlob = await readBlobContent();
    if (fromBlob) return fromBlob;
  }

  return readLocalContent();
});

export async function saveSiteContent(content: SiteContent) {
  if (hasBlob()) {
    await writeBlobContent(content);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Em produção o disco é somente leitura. Configure BLOB_READ_WRITE_TOKEN (Vercel Blob) nas variáveis de ambiente do projeto.",
    );
  }

  writeLocalContent(content);
}

export function whatsappHref(phoneDisplay: string, message: string) {
  const digits = phoneDisplay.replace(/\D/g, "");
  const withCountry = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}`;
}

export function mapsHref(address: string, city: string) {
  const query = `${address}, ${city}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getDerivedLinks(content: SiteContent) {
  const { contact } = content;
  return {
    whatsappHref: whatsappHref(contact.whatsapp, contact.whatsappMessage),
    ctaHref: whatsappHref(contact.whatsapp, contact.ctaMessage),
    mapsHref: mapsHref(contact.address, contact.city),
  };
}

export { SECTION_LABELS } from "./labels";
