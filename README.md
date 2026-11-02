# Tavira Gems

Source of [taviragems.com](https://taviragems.com), an encyclopedia of gemstones, decorative stones and rare minerals.

- **Website:** Astro (static site), hosted on Cloudflare Pages
- **Admin panel:** Sveltia CMS at `/admin/`
- **Content:** `src/content/stones/` (stones) and `src/content/articles/` (guides, comparisons, journal)
- **Homepage text and settings:** `src/data/home.json`, `src/data/site.json`
- **Categories, colors, months, rarity:** `src/data/taxonomy.ts` (after changing it, run `node scripts/build-admin-config.mjs`)

## Commands
- `npm install`: install
- `npm run dev`: local preview
- `npm run build`: build the site and search index into `dist/`

## Cloudflare Pages settings
- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION` = `22`
