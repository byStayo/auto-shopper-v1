export type ItemCategory =
  | 'Shirts'
  | 'Pants'
  | 'Shoes'
  | 'Outerwear'
  | 'Accessories'

export interface ClosetItem {
  id: string
  name: string
  category: ItemCategory
  color: string
  swatch: string
  style: Array<string>
  emoji: string
}

export interface Product {
  id: string
  name: string
  brand: string
  category: ItemCategory
  price: number
  color: string
  swatch: string
  style: Array<string>
  emoji: string
}

export const CLOSET_ITEMS: Array<ClosetItem> = [
  {
    id: 'c-1',
    name: 'Washed Linen Shirt',
    category: 'Shirts',
    color: 'Sand',
    swatch: '#e7ddc7',
    style: ['minimal', 'warm', 'relaxed'],
    emoji: '👕',
  },
  {
    id: 'c-2',
    name: 'Oversized Knit',
    category: 'Shirts',
    color: 'Sage',
    swatch: '#b9c6ad',
    style: ['cozy', 'earthy'],
    emoji: '🧶',
  },
  {
    id: 'c-3',
    name: 'Tailored Trousers',
    category: 'Pants',
    color: 'Graphite',
    swatch: '#3f444a',
    style: ['minimal', 'sharp'],
    emoji: '👖',
  },
  {
    id: 'c-4',
    name: 'Olive Wide Leg',
    category: 'Pants',
    color: 'Olive',
    swatch: '#6b6a3a',
    style: ['earthy', 'relaxed'],
    emoji: '👖',
  },
  {
    id: 'c-5',
    name: 'Suede Loafers',
    category: 'Shoes',
    color: 'Tobacco',
    swatch: '#8a5a36',
    style: ['warm', 'sharp'],
    emoji: '👞',
  },
  {
    id: 'c-6',
    name: 'Canvas Low-Tops',
    category: 'Shoes',
    color: 'Bone',
    swatch: '#ece7dd',
    style: ['minimal', 'relaxed'],
    emoji: '👟',
  },
]

export const SPRING_26_CATALOG: Array<Product> = [
  {
    id: 'p-1',
    name: 'Pleated Crepe Trouser',
    brand: 'Atelier Marlow',
    category: 'Pants',
    price: 148,
    color: 'Greige',
    swatch: '#cabfa9',
    style: ['minimal', 'sharp'],
    emoji: '👖',
  },
  {
    id: 'p-2',
    name: 'Garment-Dyed Chino',
    brand: 'North Field',
    category: 'Pants',
    price: 98,
    color: 'Olive',
    swatch: '#6b6a3a',
    style: ['earthy', 'relaxed'],
    emoji: '👖',
  },
  {
    id: 'p-3',
    name: 'Italian Leather Derby',
    brand: 'Vello',
    category: 'Shoes',
    price: 215,
    color: 'Espresso',
    swatch: '#4b3422',
    style: ['sharp', 'warm'],
    emoji: '👞',
  },
  {
    id: 'p-4',
    name: 'Featherweight Runner',
    brand: 'Kessler',
    category: 'Shoes',
    price: 132,
    color: 'Bone',
    swatch: '#ece7dd',
    style: ['minimal', 'relaxed'],
    emoji: '👟',
  },
  {
    id: 'p-5',
    name: 'Linen Camp Shirt',
    brand: 'Atelier Marlow',
    category: 'Shirts',
    price: 88,
    color: 'Sand',
    swatch: '#e7ddc7',
    style: ['minimal', 'warm', 'relaxed'],
    emoji: '👕',
  },
  {
    id: 'p-6',
    name: 'Merino Overshirt',
    brand: 'North Field',
    category: 'Outerwear',
    price: 168,
    color: 'Sage',
    swatch: '#b9c6ad',
    style: ['earthy', 'cozy'],
    emoji: '🧥',
  },
]

export interface GiftIdea {
  id: string
  name: string
  recipient: string
  price: number
  emoji: string
  note: string
}

export const GIFT_IDEAS: Array<GiftIdea> = [
  {
    id: 'g-1',
    name: 'Silk Twill Scarf',
    recipient: 'For the minimalist',
    price: 64,
    emoji: '🧣',
    note: 'Pairs with the Tailored Trousers in your closet.',
  },
  {
    id: 'g-2',
    name: 'Leather Card Holder',
    recipient: 'Everyday carry',
    price: 48,
    emoji: '👛',
    note: 'Espresso leather matches the Suede Loafers.',
  },
  {
    id: 'g-3',
    name: 'Cashmere Beanie',
    recipient: 'For cool evenings',
    price: 72,
    emoji: '🧢',
    note: 'Sage tone complements the Oversized Knit.',
  },
]
