# st.Juliaana-Miranda

Site institucional e landing page de Juliana Miranda, nail designer e educadora em Juazeiro - BA.

Feito com Next.js (App Router), React, TypeScript e CSS Modules.

## Rodando localmente

Requer Node.js 22 (veja `.nvmrc`).

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Painel admin

Acesse [http://localhost:3000/admin](http://localhost:3000/admin).

- Senha padrão (desenvolvimento): `juliana2024`
- Defina `ADMIN_PASSWORD` e `ADMIN_SECRET` no `.env.local` antes de publicar

No admin você pode:

- Editar textos de todas as seções
- Trocar imagens (com o tamanho ideal mostrado em cada campo)
- Ocultar ou reordenar seções
- Criar seções novas e excluí-las
- Atualizar WhatsApp, Instagram, endereço e rodapé

O conteúdo editável fica em `content/site.json`. As imagens enviadas vão para `public/uploads/`.

### Produção na Vercel (obrigatório para o admin funcionar)

Na Vercel o disco é somente leitura. Para ordenar, editar e enviar imagens em produção:

1. No projeto da Vercel: **Storage → Create / Connect Blob**
2. Conecte o Blob ao projeto (isso cria `BLOB_READ_WRITE_TOKEN`)
3. Faça um novo deploy

Com o token, o conteúdo e os uploads passam a ser salvos no **Vercel Blob** e persistem entre deploys.

## Estrutura

- `app/(site)/`: página pública
- `app/admin/`: painel de edição
- `content/site.json`: textos e configuração do site
- `components/`: layout, seções e UI
- `public/assets/img/`: imagens fixas
- `public/uploads/`: imagens enviadas pelo admin
