import { createFileRoute, Link } from '@tanstack/react-router'
import { Camera, Gift, Shirt, Sparkles, ShoppingBag } from 'lucide-react'
import { generateStyleProfile } from '../lib/StyleIntelligence'
import { CLOSET_ITEMS } from '../lib/mockData'

export const Route = createFileRoute('/')({ component: Home })

const SHORTCUTS = [
  { to: '/closet', label: 'My Closet', icon: Shirt, desc: 'Scanned wardrobe' },
  {
    to: '/style',
    label: 'Style Profile',
    icon: Sparkles,
    desc: 'Your signature',
  },
  {
    to: '/shop',
    label: 'Shop Spring ’26',
    icon: ShoppingBag,
    desc: 'Matched picks',
  },
  { to: '/gifts', label: 'Gift Edit', icon: Gift, desc: 'Curated ideas' },
] as const

function Home() {
  const profile = generateStyleProfile(CLOSET_ITEMS)

  return (
    <div className="flex flex-col gap-4">
      <section className="glass glass-refract rise-in relative overflow-hidden p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--kicker)]">
          Closet Shopper
        </p>
        <h1 className="display-title mt-2 text-3xl font-bold leading-tight text-[var(--sea-ink)]">
          Your wardrobe, styled by AI.
        </h1>
        <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">
          Scan your closet, discover your style signature, and shop Spring ’26
          pieces matched to what you already own.
        </p>
        <Link
          to="/closet"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--lagoon-deep)] px-4 py-2.5 text-sm font-semibold text-white no-underline transition hover:brightness-110"
        >
          <Camera size={16} /> Scan a piece
        </Link>
      </section>

      <section className="glass-card glass-refract rise-in p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--kicker)]">
            Style signature
          </p>
          <Link
            to="/style"
            className="text-xs font-semibold text-[var(--lagoon-deep)] no-underline"
          >
            View
          </Link>
        </div>
        <p className="mt-1 text-lg font-bold text-[var(--sea-ink)]">
          {profile.archetype}
        </p>
        <div className="mt-3 flex gap-1.5">
          {profile.palette.map((c) => (
            <span
              key={c}
              className="h-6 w-6 rounded-full border border-[var(--glass-line)]"
              style={{ background: c }}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {SHORTCUTS.map(({ to, label, icon: Icon, desc }) => (
          <Link
            key={to}
            to={to}
            className="glass-card glass-refract rise-in flex flex-col gap-2 p-4 no-underline"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/40 text-[var(--lagoon-deep)]">
              <Icon size={20} />
            </span>
            <span className="text-sm font-semibold text-[var(--sea-ink)]">
              {label}
            </span>
            <span className="text-xs text-[var(--sea-ink-soft)]">{desc}</span>
          </Link>
        ))}
      </section>
    </div>
  )
}
