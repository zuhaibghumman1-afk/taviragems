import { getCollection, type CollectionEntry } from 'astro:content';
import { getCategory, getColor, getRarity, months, allCategories } from '../data/taxonomy';

export type Stone = CollectionEntry<'stones'>;
export type Article = CollectionEntry<'articles'>;

export async function getStones(): Promise<Stone[]> {
  const all = await getCollection('stones', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export async function getArticles(kind?: string): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => !data.draft && (!kind || data.kind === kind));
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const stoneUrl = (s: Stone) => `/stones/${s.id}/`;
export const articleUrl = (a: Article) => `/${a.data.kind}/${a.id}/`;
export const categoryUrl = (slug: string) => {
  const c = getCategory(slug);
  return c ? `/${c.section}/${c.slug}/` : '/stones/';
};

export function num(n: number) {
  return String(Math.round(n * 10) / 10);
}

export function hardnessText(s: Stone) {
  const { hardness_min: min, hardness_max: max } = s.data;
  if (min == null) return '';
  if (max == null || max === min) return num(min);
  return `${num(min)}–${num(max)}`;
}

export function primaryCategory(s: Stone) {
  return s.data.categories.map(getCategory).find(Boolean);
}

export function specLine(s: Stone) {
  const d = s.data;
  const parts: string[] = [];
  if (d.section === 'decorative-stones') {
    if (d.rock_type) parts.push(d.rock_type);
    if (d.main_sources) parts.push(d.main_sources.split(';')[0].trim());
  } else {
    if (d.mineral_family) parts.push(d.mineral_family);
    const h = hardnessText(s);
    if (h) parts.push(`Hardness ${h}`);
  }
  return parts.join(' · ');
}

export function rarityOf(s: Stone) {
  return getRarity(s.data.rarity ?? undefined);
}

/** Al2O3 -> Al<sub>2</sub>O<sub>3</sub> (input is escaped first). */
export function formulaHtml(f: string) {
  const esc = f.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/(?<=[A-Za-z)\]])(\d+)/g, '<sub>$1</sub>');
}

export function monthName(slug: string) {
  return months.find((m) => m.slug === slug)?.name ?? slug;
}

export function categoryName(slug: string) {
  return allCategories.find((c) => c.slug === slug)?.name ?? slug;
}

export function readingMinutes(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}

/* ------------------------------------------------------------------ Placeholder art */

export function gemSvg(c: readonly string[]) {
  const pt = (r: number, a: number) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return [50 + r * Math.cos(rad), 50 + r * Math.sin(rad)];
  };
  const poly = (ps: number[][], fill: string, extra = '') =>
    `<polygon points="${ps.map((p) => p.map((v) => v.toFixed(2)).join(',')).join(' ')}" fill="${fill}" stroke="rgba(255,255,255,.18)" stroke-width=".25"${extra}/>`;
  const q = [1, 3, 2, 4, 0, 2, 3, 1, 4, 2, 1, 3, 0, 2, 4, 3];
  let s = '';
  for (let i = 0; i < 8; i++) {
    const a = i * 45;
    const t1 = pt(22, a), t2 = pt(22, a + 45), st = pt(35, a + 22.5);
    const ga = pt(48, a), gm = pt(48, a + 22.5), gb = pt(48, a + 45), sp = pt(35, a - 22.5);
    s += poly([t1, sp, ga, st], c[q[i] % 5]);
    s += poly([st, ga, gm], c[q[i + 8] % 5]);
    s += poly([st, gm, gb], c[(q[i] + 2) % 5]);
    s += poly([t1, t2, st], c[(q[i + 4] + 1) % 5]);
  }
  s += poly([0, 1, 2, 3, 4, 5, 6, 7].map((i) => pt(22, i * 45)), c[2]);
  s += poly([pt(22, 0), pt(22, 45), pt(22, 90)], c[4], ' opacity=".35"');
  return `<svg class="tg-art tg-art--gem" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${s}</svg>`;
}

let marbleCount = 0;
export function marbleSvg(seed = 11) {
  const id = `m${++marbleCount}`;
  return `<svg class="tg-art tg-art--marble" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs><filter id="${id}f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.005 0.018" numOctaves="5" seed="${seed}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.41  0 0 0 0 0.35  0 0 0 -2.2 1.25" result="v"/><feComponentTransfer in="v"><feFuncA type="table" tableValues="0 0 0 0 0.85 0 0 0 0 0.45 0 0"/></feComponentTransfer></filter><linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FBF8F2"/><stop offset="1" stop-color="#ECE5D8"/></linearGradient></defs><rect width="300" height="240" fill="url(#${id}g)"/><rect width="300" height="240" filter="url(#${id}f)" fill="#000"/></svg>`;
}

export function crystalSvg() {
  const c = getColor('purple')!.shades;
  const poly = (pts: string, f: string) => `<polygon points="${pts}" fill="${f}" stroke="rgba(255,255,255,.18)" stroke-width=".25"/>`;
  const one = (cx: number, w: number, h: number, base: number, tilt: number) => {
    const tip = base - h, l = cx - w / 2, r = cx + w / 2, sh = w * 0.9, y1 = tip + sh * 0.4, y2 = tip + sh;
    return `<g transform="rotate(${tilt} ${cx} ${base})">${poly(`${l},${base} ${cx},${base + 3} ${cx},${y1} ${l},${y2}`, c[1])}${poly(`${cx},${base + 3} ${r},${base} ${r},${y2} ${cx},${y1}`, c[3])}${poly(`${l},${y2} ${cx},${y1} ${cx},${tip}`, c[2])}${poly(`${cx},${y1} ${r},${y2} ${cx},${tip}`, c[4])}</g>`;
  };
  return `<svg class="tg-art tg-art--gem" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${one(30, 16, 52, 92, -22)}${one(72, 16, 56, 92, 20)}${one(50, 22, 80, 94, 0)}</svg>`;
}

export function pearlSvg() {
  return `<svg class="tg-art tg-art--gem" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs><radialGradient id="pg" cx=".38" cy=".34" r=".7"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" stop-color="#EDE6DA"/><stop offset=".8" stop-color="#C9BFB0"/><stop offset="1" stop-color="#8E8578"/></radialGradient></defs><circle cx="50" cy="50" r="40" fill="url(#pg)"/><ellipse cx="38" cy="34" rx="9" ry="5" fill="#fff" opacity=".7" transform="rotate(-30 38 34)"/></svg>`;
}

/** Placeholder art for a stone without a photo. */
export function stoneArt(s: Stone) {
  if (s.data.section === 'decorative-stones') {
    let seed = 0;
    for (const ch of s.id) seed = (seed + ch.charCodeAt(0)) % 50;
    return marbleSvg(seed + 3);
  }
  if (s.data.categories.includes('organic') && s.id.includes('pearl')) return pearlSvg();
  const color = getColor(s.data.colors[0] ?? 'white') ?? getColor('white')!;
  return gemSvg(color.shades);
}
