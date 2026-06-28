import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { generateStyleProfile } from '../lib/StyleIntelligence'
import { CLOSET_ITEMS } from '../lib/mockData'

export const Route = createFileRoute('/style')({ component: Style })

function Style() {
  const profile = generateStyleProfile(CLOSET_ITEMS)

  return (
    <div className="flex flex-col gap-4">
      <section className="glass glass-refract rise-in p-6">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--kicker)]">
          Style Profile
        </p>
        <h1 className="display-title mt-1 text-3xl font-bold text-[var(--sea-ink)]">
          {profile.archetype}
        </h1>
        <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">
          {profile.summary}
        </p>
      </section>

      <section className="glass-card glass-refract p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--kicker)]">
          Palette
        </p>
        <div className="mt-3 flex gap-2">
          {profile.palette.map((c) => (
            <motion.span
              key={c}
              whileTap={{ scale: 0.9 }}
              className="h-12 flex-1 rounded-xl border border-[var(--glass-line)]"
              style={{ background: c }}
            />
          ))}
        </div>
      </section>

      <section className="glass-card glass-refract p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--kicker)]">
          Keywords
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.keywords.map((k) => (
            <span
              key={k}
              className="rounded-full border border-[var(--glass-line)] bg-white/35 px-3 py-1.5 text-sm font-semibold capitalize text-[var(--sea-ink)]"
            >
              {k}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
