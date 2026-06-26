import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import ProductCard from '../components/shop/ProductCard'
import { SPRING_26_CATALOG } from '../lib/mockData'
import type { ItemCategory, Product } from '../lib/mockData'
import { useHaptics } from '../hooks/useHaptics'

export const Route = createFileRoute('/shop')({ component: Shop })

const FILTERS: Array<'All' | ItemCategory> = [
  'All',
  'Shirts',
  'Pants',
  'Shoes',
  'Outerwear',
]

function Shop() {
  const { vibrate } = useHaptics()
  const [filter, setFilter] = useState<'All' | ItemCategory>('All')
  const [bag, setBag] = useState<Array<Product>>([])
  const [checkout, setCheckout] = useState(false)

  const products = useMemo(
    () =>
      filter === 'All'
        ? SPRING_26_CATALOG
        : SPRING_26_CATALOG.filter((p) => p.category === filter),
    [filter],
  )

  const total = bag.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="flex flex-col gap-4">
      <section className="glass glass-refract rise-in p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--kicker)]">
          Shopify · Spring ’26
        </p>
        <h1 className="display-title mt-1 text-2xl font-bold text-[var(--sea-ink)]">
          Shop the Feed
        </h1>
        <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
          Personalized picks matched to your wardrobe.
        </p>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              vibrate('select')
              setFilter(f)
            }}
            className={`flex-shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
              filter === f
                ? 'border-transparent bg-[var(--lagoon-deep)] text-white'
                : 'border-[var(--glass-line)] bg-white/35 text-[var(--sea-ink)]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onBuy={(prod) => setBag((b) => [...b, prod])}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {bag.length > 0 && !checkout ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => {
              vibrate('impact')
              setCheckout(true)
            }}
            className="glass glass-glow fixed bottom-28 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[var(--sea-ink)]"
          >
            <ShoppingBag size={16} /> Checkout · {bag.length} · ${total}
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {checkout ? (
          <CheckoutSheet
            count={bag.length}
            total={total}
            onClose={() => setCheckout(false)}
            onDone={() => {
              setCheckout(false)
              setBag([])
            }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

interface CheckoutSheetProps {
  count: number
  total: number
  onClose: () => void
  onDone: () => void
}

function CheckoutSheet({ count, total, onClose, onDone }: CheckoutSheetProps) {
  const { vibrate } = useHaptics()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="glass glass-refract w-full max-w-md rounded-b-none p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-[var(--sea-ink)]">
            Shop checkout
          </h2>
          <button
            type="button"
            aria-label="Close checkout"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-[var(--sea-ink-soft)] hover:bg-white/40"
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-sm text-[var(--sea-ink-soft)]">
          Sign in to Shop to complete your order of {count} item
          {count === 1 ? '' : 's'}.
        </p>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--glass-line)] bg-white/30 px-4 py-3">
          <span className="text-sm font-semibold text-[var(--sea-ink)]">
            Order total
          </span>
          <span className="text-lg font-bold text-[var(--sea-ink)]">
            ${total}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            vibrate('success')
            onDone()
          }}
          className="mt-4 w-full rounded-full bg-[#5a31f4] py-3 text-sm font-bold text-white transition hover:brightness-110"
        >
          Continue with Shop
        </button>
      </motion.div>
    </motion.div>
  )
}
