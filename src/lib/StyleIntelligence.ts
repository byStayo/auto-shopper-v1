import { CLOSET_ITEMS, SPRING_26_CATALOG } from './mockData'
import type { ClosetItem, ItemCategory, Product } from './mockData'

export interface OutfitMatch {
  base: ClosetItem
  pants?: Product
  shoes?: Product
  rationale: string
}

export interface StyleProfile {
  archetype: string
  palette: Array<string>
  keywords: Array<string>
  summary: string
}

function styleOverlap(a: Array<string>, b: Array<string>): number {
  const set = new Set(a)
  return b.reduce((score, tag) => (set.has(tag) ? score + 1 : score), 0)
}

function bestMatch(
  base: ClosetItem,
  category: ItemCategory,
  catalog: Array<Product>,
): Product | undefined {
  const candidates = catalog.filter((p) => p.category === category)
  if (candidates.length === 0) {
    return undefined
  }

  return [...candidates].sort(
    (a, b) =>
      styleOverlap(base.style, b.style) - styleOverlap(base.style, a.style),
  )[0]
}

/**
 * Placeholder style-matching engine. Scores catalog products by how many style
 * tags they share with the selected closet item and returns the strongest
 * pants + shoes pairing. Swap for a real model later.
 */
export function buildOutfit(
  base: ClosetItem,
  catalog: Array<Product> = SPRING_26_CATALOG,
): OutfitMatch {
  const pants = bestMatch(base, 'Pants', catalog)
  const shoes = bestMatch(base, 'Shoes', catalog)

  const shared = [
    ...new Set([
      ...(pants ? pants.style.filter((s) => base.style.includes(s)) : []),
      ...(shoes ? shoes.style.filter((s) => base.style.includes(s)) : []),
    ]),
  ]

  const rationale =
    shared.length > 0
      ? `Matched on a shared ${shared.join(', ')} mood.`
      : 'A balanced contrast pairing to round out the look.'

  return { base, pants, shoes, rationale }
}

export function generateStyleProfile(
  items: Array<ClosetItem> = CLOSET_ITEMS,
): StyleProfile {
  const tally = new Map<string, number>()
  for (const item of items) {
    for (const tag of item.style) {
      tally.set(tag, (tally.get(tag) ?? 0) + 1)
    }
  }

  const keywords = [...tally.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
    .slice(0, 4)

  const palette = [...new Set(items.map((i) => i.swatch))].slice(0, 6)

  const archetype = keywords.includes('minimal')
    ? 'Refined Minimalist'
    : keywords.includes('earthy')
      ? 'Earthy Modernist'
      : 'Relaxed Tailoring'

  return {
    archetype,
    palette,
    keywords,
    summary: `Your wardrobe leans ${keywords.slice(0, 3).join(', ')} — a ${archetype.toLowerCase()} signature.`,
  }
}
