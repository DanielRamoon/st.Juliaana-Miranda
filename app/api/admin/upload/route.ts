import { randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Arquivo obrigatório" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Use JPG, PNG, WEBP ou GIF" },
      { status: 400 },
    );
  }

  if (file.size > 6 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Imagem muito grande (máx. 6 MB)" },
      { status: 400 },
    );
  }

  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : file.type === "image/gif"
          ? "gif"
          : "jpg";

  const dir = path.join(process.cwd(), "public", "uploads");
  mkdirSync(dir, { recursive: true });

  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
