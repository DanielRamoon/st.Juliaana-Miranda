import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/content/store";
import type { SiteContent } from "@/lib/content/types";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(await getSiteContent());
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as SiteContent;
    if (!body?.meta?.title || !body?.hero || !Array.isArray(body.sectionsOrder)) {
      return NextResponse.json({ error: "Conteúdo inválido" }, { status: 400 });
    }
    await saveSiteContent(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao salvar conteúdo";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
