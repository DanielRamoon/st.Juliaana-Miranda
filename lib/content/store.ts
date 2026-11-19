import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { SiteContent } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CONTENT_FILE = path.join(CONTENT_DIR, "site.json");

export function getSiteContent(): SiteContent {
  const raw = readFileSync(CONTENT_FILE, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export function saveSiteContent(content: SiteContent) {
  mkdirSync(CONTENT_DIR, { recursive: true });
  const temp = `${CONTENT_FILE}.tmp`;
  writeFileSync(temp, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  renameSync(temp, CONTENT_FILE);
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
