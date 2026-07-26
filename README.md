# Nefritart — web

Prezentační web řezbáře nefritu **Radka Beneše** (Pardubice).
Stack: **Astro** + **Sveltia CMS** (git-based) + **Cloudflare Pages**.

## Rychlý start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # výstup do dist/
```

## Struktura

| Cesta | Co to je |
|---|---|
| `src/content.config.ts` | Schéma výrobků (validace polí) |
| `src/content/products/` | Výrobky — 1 soubor = 1 kus |
| `public/images/products/` | Optimalizované fotky (do gitu) |
| `public/admin/` | Sveltia CMS (`index.html` + `config.yml`) |
| `scripts/optimize-images.mjs` | Zmenšení fotek pro web |
| `src/pages/index.astro` | **Dočasná** ověřovací stránka — nahradí ji finální vizuál |

## Fotky

Originály jsou v archivu `E:\X\AI_projekty\Radek Beneš web` a **do repa nepatří**.
Do webu jde jen optimalizovaný výstup (max 1600 px, JPEG 80 %):

```bash
node scripts/optimize-images.mjs --limit 50
```

Bez `--limit` zpracuje celý archiv. Na start stačí výběr 30–50 nejlepších.

## Administrace

Běží na `/admin/`. Radek se přihlašuje **GitHub účtem** (musí být collaborator repa).
Workflow: úprava v CMS → commit do repa → automatický build → za 1–2 min živé.

⚠️ Přihlášení vyžaduje **OAuth Worker** na Cloudflare — viz `MANUAL-krok-za-krokem.md`, Fáze 5.
Než bude nasazený, je v `public/admin/config.yml` placeholder `base_url`.

## Dokumentace projektu

Ve složce `E:\X\AI_projekty\Radek Beneš web`:

- `MANUAL-krok-za-krokem.md` — prováděcí manuál (Fáze 0–8)
- `Architektura-Astro-Decap-Cloudflare.md` — architektura a rozhodnutí
- `Macaly-prompt-Nefritart.md` — zadání vizuálu (⛔ zákaz generovaných fotek)
- `Texty-preklady-CS-EN-DE-RU.md` — texty ve 4 jazycích
