/**
 * Avatar styling logic and helper functions
 */

export const ZONES = ['Headwear', 'Top', 'Bottoms', 'Shoes'];

export function getDefaultOutfit() {
  return {
    Top: 'p-oxford-white',
    Bottoms: 'p-trouser-olive',
    Shoes: 'p-loafer-brown'
  };
}

export function getVibeOutfit(vibe: string, occasions: any[], getProductById: (id: string) => any) {
  const vibeMap: Record<string, string> = {
    All: 'occ-weekend',
    Casual: 'occ-weekend',
    'Date Night': 'occ-dinner',
    Work: 'occ-office',
    Gym: 'occ-weekend'
  };

  const occasionId = vibeMap[vibe] || vibeMap['All'];
  const occasion = occasions.find(o => o.id === occasionId);
  const outfit: Record<string, string> = {};

  if (occasion) {
    for (const productId of occasion.productIds) {
      const product = getProductById(productId);
      if (product) {
        const zone = getZoneForCategory(product.category);
        outfit[zone] = product.id;
      }
    }
  }

  return outfit;
}

function getZoneForCategory(category: string) {
  if (category === 'Tops' || category === 'Outerwear') return 'Top';
  if (category === 'Bottoms') return 'Bottoms';
  if (category === 'Shoes') return 'Shoes';
  return 'Top';
}

export function calculateOutfitTotal(outfit: Record<string, string>, getProductById: (id: string) => any) {
  return Object.values(outfit)
    .filter(Boolean)
    .map(id => getProductById(id))
    .filter(Boolean)
    .reduce((sum, p) => sum + (p.price || 0), 0);
}
