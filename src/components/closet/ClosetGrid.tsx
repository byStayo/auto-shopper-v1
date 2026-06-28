import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { ClosetItem } from '../../lib/mockData'
import { useHaptics } from '../../hooks/useHaptics'

interface ClosetGridProps {
  items: Array<ClosetItem>
  selectedId?: string
  onSelect?: (item: ClosetItem) => void
}

/** Visual grid of scanned wardrobe items. */
export default function ClosetGrid({
  items,
  selectedId,
  onSelect,
}: ClosetGridProps) {
  const { vibrate } = useHaptics()

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const active = item.id === selectedId
        return (
          <motion.button
            key={item.id}
            type="button"
            layout
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              vibrate('select')
              onSelect?.(item)
            }}
            aria-pressed={active}
            className={`glass-card glass-refract gpu flex flex-col p-2.5 text-left transition ${
              active ? 'ring-2 ring-[var(--lagoon)]' : ''
            }`}
          >
            <div
              className="relative mb-2 grid aspect-square place-items-center overflow-hidden rounded-lg"
              style={{
                background: `linear-gradient(160deg, ${item.swatch}, color-mix(in oklab, ${item.swatch} 55%, white))`,
              }}
            >
              <span className="text-4xl drop-shadow-sm">{item.emoji}</span>
              {active ? (
                <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--lagoon-deep)] text-white">
                  <Check size={12} />
                </span>
              ) : null}
            </div>
            <span className="text-xs font-semibold text-[var(--sea-ink)]">
              {item.name}
            </span>
            <span className="text-[11px] text-[var(--sea-ink-soft)]">
              {item.category} · {item.color}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
