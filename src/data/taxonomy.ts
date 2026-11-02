// Single source of truth for sections, categories, colors, months and rarity.
// The admin panel (public/admin/config.yml) uses the same slugs.

export const sections = [
  {
    slug: 'gemstones',
    name: 'Gemstones',
    description: 'Precious, semi-precious, rare collector stones and organic gems such as pearl and amber.',
    categories: [
      { slug: 'precious', name: 'Precious' },
      { slug: 'semi-precious', name: 'Semi-Precious' },
      { slug: 'rare', name: 'Rare & Collector' },
      { slug: 'organic', name: 'Organic' },
    ],
  },
  {
    slug: 'decorative-stones',
    name: 'Decorative Stones',
    description: 'Marble, granite, onyx and quartzite: the luxury stones of architecture and interiors.',
    categories: [
      { slug: 'marble', name: 'Marble' },
      { slug: 'granite', name: 'Granite' },
      { slug: 'onyx', name: 'Onyx' },
      { slug: 'quartzite', name: 'Quartzite' },
      { slug: 'limestone-travertine', name: 'Limestone & Travertine' },
      { slug: 'semi-precious-slabs', name: 'Semi-Precious Slabs' },
    ],
  },
  {
    slug: 'crystals-minerals',
    name: 'Crystals & Minerals',
    description: 'Carving stones, crystal specimens and unusual finds, from jade to meteorites.',
    categories: [
      { slug: 'carving-ornamental', name: 'Carving & Ornamental' },
      { slug: 'crystals-specimens', name: 'Crystals & Specimens' },
      { slug: 'unique-unusual', name: 'Unique & Unusual' },
    ],
  },
] as const;

export type SectionSlug = (typeof sections)[number]['slug'];

export const allCategories = sections.flatMap((s) =>
  s.categories.map((c) => ({ ...c, section: s.slug as string, sectionName: s.name as string })),
);

export function getSection(slug: string) {
  return sections.find((s) => s.slug === slug);
}
export function getCategory(slug: string) {
  return allCategories.find((c) => c.slug === slug);
}

export const colors = [
  { slug: 'red', name: 'Red', swatch: '#B3122E', shades: ['#3A0610', '#7A0C22', '#B3122E', '#E0435C', '#FFB3C0'] },
  { slug: 'pink', name: 'Pink', swatch: '#E6A6B8', shades: ['#4A1428', '#8E3A5E', '#D47A9A', '#EBA6BE', '#FFE0EA'] },
  { slug: 'orange', name: 'Orange', swatch: '#D2691E', shades: ['#4A1E05', '#8A3A0E', '#D2691E', '#F09A4A', '#FFD6AD'] },
  { slug: 'yellow', name: 'Yellow', swatch: '#E8B23A', shades: ['#5A3A05', '#9A6A0E', '#D9A21E', '#F2C94C', '#FFF0B3'] },
  { slug: 'green', name: 'Green', swatch: '#0F7A4A', shades: ['#04291B', '#0A5135', '#0F7A4A', '#3FB27C', '#A8EBC6'] },
  { slug: 'blue', name: 'Blue', swatch: '#1C3F94', shades: ['#0B1C4A', '#16328A', '#2A55C4', '#5E86E8', '#A9C2FF'] },
  { slug: 'purple', name: 'Purple', swatch: '#6B3FA0', shades: ['#2A1747', '#4B2A7E', '#6B3FA0', '#9B74D0', '#D6C4F5'] },
  { slug: 'brown', name: 'Brown', swatch: '#8A5A36', shades: ['#2E1A0E', '#5A3620', '#8A5A36', '#B98A60', '#E6CBAE'] },
  { slug: 'black', name: 'Black', swatch: '#1E1C20', shades: ['#0A0A0C', '#1E1E22', '#34343A', '#55555E', '#8A8A94'] },
  { slug: 'white', name: 'White & Colorless', swatch: '#F3F1EC', shades: ['#2A2D33', '#6B7280', '#B8C0CC', '#E5E9F0', '#FFFFFF'] },
  { slug: 'multicolor', name: 'Multicolor', swatch: 'conic-gradient(#B3122E,#E8B23A,#0F7A4A,#1C3F94,#6B3FA0,#B3122E)', shades: ['#2B4C7E', '#3FB27C', '#E8B23A', '#C04A8A', '#E9F3FF'] },
  { slug: 'color-change', name: 'Color-Change', swatch: 'linear-gradient(135deg,#2E6B5A 50%,#7A2F5A 50%)', shades: ['#1E1435', '#3B2466', '#2E6B5A', '#7A4FA8', '#C9B6F0'] },
] as const;

export function getColor(slug: string) {
  return colors.find((c) => c.slug === slug);
}

export const months = [
  { slug: 'january', name: 'January', text: 'Garnet is the birthstone for January. It is best known in deep red, but the garnet family also includes vivid greens and warm oranges.' },
  { slug: 'february', name: 'February', text: 'Amethyst, the purple variety of quartz, is the birthstone for February. Its color ranges from soft lilac to deep royal purple.' },
  { slug: 'march', name: 'March', text: 'March has two birthstones: aquamarine, the sea-blue variety of beryl, and bloodstone, a dark green stone flecked with red.' },
  { slug: 'april', name: 'April', text: 'Diamond is the birthstone for April. It is the hardest natural material and a symbol of lasting love.' },
  { slug: 'may', name: 'May', text: 'Emerald, the green variety of beryl, is the birthstone for May. The finest stones show a rich, slightly bluish green.' },
  { slug: 'june', name: 'June', text: 'June has three birthstones: pearl, moonstone and the color-changing alexandrite.' },
  { slug: 'july', name: 'July', text: 'Ruby, the red variety of corundum, is the birthstone for July. It is one of the four traditional precious stones.' },
  { slug: 'august', name: 'August', text: 'August has three birthstones: lime-green peridot, spinel and banded sardonyx.' },
  { slug: 'september', name: 'September', text: 'Sapphire is the birthstone for September. It is best known in blue, but appears in almost every color except red.' },
  { slug: 'october', name: 'October', text: 'October has two birthstones: opal, famous for its play of color, and tourmaline, which comes in more colors than almost any other gem.' },
  { slug: 'november', name: 'November', text: 'November has two birthstones in warm golden tones. Topaz is one of the hardest silicate minerals, while citrine is a golden variety of quartz that is rare in nature.' },
  { slug: 'december', name: 'December', text: 'December has several birthstones in shades of blue: turquoise, zircon and tanzanite.' },
] as const;

export const rarityLevels = [
  { slug: 'common', name: 'Common', level: 1 },
  { slug: 'uncommon', name: 'Uncommon', level: 2 },
  { slug: 'rare', name: 'Rare', level: 3 },
  { slug: 'extremely-rare', name: 'Extremely Rare', level: 4 },
] as const;

export function getRarity(slug?: string) {
  return rarityLevels.find((r) => r.slug === slug);
}

export const articleKinds = [
  { slug: 'learn', name: 'Learn', title: 'Guides', intro: 'Clear, expert guides to how stones form, how they are graded and how to choose them.' },
  { slug: 'compare', name: 'Compare', title: 'Comparisons', intro: 'Side-by-side comparisons of stones that look alike, so you know exactly what you are looking at.' },
  { slug: 'journal', name: 'Journal', title: 'Journal', intro: 'Stories of famous stones, historic mines, royal jewels and the people who loved them.' },
] as const;
