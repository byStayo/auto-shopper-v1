import { motion } from 'framer-motion'
import { ShoppingBag, Sparkles } from 'lucide-react'
import type { Product } from '../../lib/mockData'
import { useHaptics } from '../../hooks/useHaptics'

interface ProductCardProps {
  product: Product
  onBuy?: (product: Product) => void
}

/** Glassmorphic product card with a "Try on Me" placeholder + Buy action. */
export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const { vibrate } = useHaptics()

  return (
    <motion.article
      layout
      whileTap={{ scale: 0.98 }}
      className="glass-card glass-refract gpu flex flex-col overflow-hidden p-3"
    >
      <div
        className="relative mb-3 grid aspect-[4/5] place-items-center overflow-hidden rounded-xl"
        style={{
          background: `linear-gradient(160deg, ${product.swatch}, color-mix(in oklab, ${product.swatch} 60%, white))`,
        }}
      >
        <span className="text-5xl drop-shadow-sm">{product.emoji}</span>
        <button
          type="button"
          onClick={() => vibrate('impact')}
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md transition hover:bg-black/45"
        >
          <Sparkles size={12} /> Try on Me
        </button>
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--kicker)]">
        {product.brand}
      </p>
      <h3 className="mt-0.5 text-sm font-semibold text-[var(--sea-ink)]">
        {product.name}
      </h3>

      <div className="mt-auto flex items-center justify-between pt-3">
        <span className="text-base font-bold text-[var(--sea-ink)]">
          ${product.price}
        </span>
        <button
          type="button"
          onClick={() => {
            vibrate('success')
            onBuy?.(product)
          }}
          className="flex items-center gap-1.5 rounded-full bg-[var(--lagoon-deep)] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
        >
          <ShoppingBag size={14} /> Buy via Shop
        </button>
      </div>
    </motion.article>
  )
}
