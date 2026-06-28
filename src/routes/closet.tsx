import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, Loader2 } from 'lucide-react'
import ClosetGrid from '../components/closet/ClosetGrid'
import ProductCard from '../components/shop/ProductCard'
import { buildOutfit } from '../lib/StyleIntelligence'
import { CLOSET_ITEMS } from '../lib/mockData'
import type { ClosetItem } from '../lib/mockData'
import { useHaptics } from '../hooks/useHaptics'

export const Route = createFileRoute('/closet')({ component: Closet })

function Closet() {
  const { vibrate } = useHaptics()
  const [selected, setSelected] = useState<ClosetItem | null>(null)
  const [scanning, setScanning] = useState(false)

  const outfit = selected ? buildOutfit(selected) : null

  const runScan = () => {
    vibrate('impact')
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      vibrate('success')
    }, 1600)
  }

  return (
    <div className="flex flex-col gap-4">
      <section className="glass glass-refract rise-in p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--kicker)]">
          Wardrobe Scanner
        </p>
        <h1 className="display-title mt-1 text-2xl font-bold text-[var(--sea-ink)]">
          My Closet
        </h1>
        <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
          {CLOSET_ITEMS.length} pieces scanned. Tap a piece to auto-match an
          outfit.
        </p>
        <button
          type="button"
          onClick={runScan}
          disabled={scanning}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--lagoon-deep)] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {scanning ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Analyzing…
            </>
          ) : (
            <>
              <Camera size={16} /> Scan new piece
            </>
          )}
        </button>
      </section>

      <ClosetGrid
        items={CLOSET_ITEMS}
        selectedId={selected?.id}
        onSelect={(item) =>
          setSelected((prev) => (prev?.id === item.id ? null : item))
        }
      />

      <AnimatePresence>
        {outfit ? (
          <motion.section
            key={outfit.base.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="glass glass-refract p-4"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--kicker)]">
              Outfit match
            </p>
            <h2 className="mt-1 text-base font-bold text-[var(--sea-ink)]">
              Styled around {outfit.base.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
              {outfit.rationale}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {outfit.pants ? <ProductCard product={outfit.pants} /> : null}
              {outfit.shoes ? <ProductCard product={outfit.shoes} /> : null}
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
