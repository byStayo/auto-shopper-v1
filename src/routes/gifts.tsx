import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'
import { GIFT_IDEAS } from '../lib/mockData'
import { useHaptics } from '../hooks/useHaptics'

export const Route = createFileRoute('/gifts')({ component: Gifts })

function Gifts() {
  const { vibrate } = useHaptics()

  return (
    <div className="flex flex-col gap-4">
      <section className="glass glass-refract rise-in p-6">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--kicker)]">
          Gift Edit
        </p>
        <h1 className="display-title mt-1 text-3xl font-bold text-[var(--sea-ink)]">
          Curated for your circle.
        </h1>
        <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">
          Picks that pair with pieces already in your closet.
        </p>
      </section>

      <div className="flex flex-col gap-3">
        {GIFT_IDEAS.map((gift) => (
          <motion.article
            key={gift.id}
            layout
            whileTap={{ scale: 0.99 }}
            className="glass-card glass-refract flex items-center gap-4 p-4"
          >
            <span className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl bg-white/40 text-3xl">
              {gift.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--kicker)]">
                {gift.recipient}
              </p>
              <h2 className="text-sm font-bold text-[var(--sea-ink)]">
                {gift.name}
              </h2>
              <p className="truncate text-xs text-[var(--sea-ink-soft)]">
                {gift.note}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-sm font-bold text-[var(--sea-ink)]">
                ${gift.price}
              </span>
              <button
                type="button"
                onClick={() => vibrate('success')}
                aria-label={`Gift ${gift.name}`}
                className="flex items-center gap-1 rounded-full bg-[var(--lagoon-deep)] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
              >
                <Gift size={13} /> Gift
              </button>
            </div>
          </motion.article>
        ))}
      </div>
      
      {/* Spacer to ensure last card and dock hint text are visible above the floating dock */}
      <div className="h-16" aria-hidden="true" />
    </div>
  )
}
