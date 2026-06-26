import { AnimatePresence, motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { Gift, Home, Shirt, ShoppingBag, Sparkles, Wand2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLiquidDock } from '../../../hooks/useLiquidDock'
import { useHaptics } from '../../../hooks/useHaptics'
import DockInput from './DockInput'
import HistoryPeek from './HistoryPeek'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: Array<NavItem> = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/closet', label: 'Closet', icon: Shirt },
  { to: '/style', label: 'Style', icon: Sparkles },
  { to: '/shop', label: 'Shop', icon: ShoppingBag },
  { to: '/gifts', label: 'Gifts', icon: Gift },
]

const SWIPE_DISTANCE = 56
const SWIPE_VELOCITY = 480

export default function CommandDock() {
  const dock = useLiquidDock()
  const { vibrate } = useHaptics()

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    const horizontal = Math.abs(offset.x) > Math.abs(offset.y)

    if (horizontal) {
      if (
        Math.abs(offset.x) > SWIPE_DISTANCE ||
        Math.abs(velocity.x) > SWIPE_VELOCITY
      ) {
        dock.toggleMode()
      }
      return
    }

    if (offset.y < -SWIPE_DISTANCE || velocity.y < -SWIPE_VELOCITY) {
      dock.openHistory()
    } else if (offset.y > SWIPE_DISTANCE || velocity.y > SWIPE_VELOCITY) {
      dock.closeHistory()
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto flex w-full max-w-md flex-col items-stretch">
        <HistoryPeek
          open={dock.historyOpen}
          sessions={dock.sessions}
          onClose={dock.closeHistory}
          onSelect={(prompt) => {
            dock.closeHistory()
            dock.toCommand()
            dock.submitCommand(prompt)
          }}
        />

        <motion.div
          layout
          drag
          dragSnapToOrigin
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.35}
          onDragEnd={handleDragEnd}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          className="glass glass-refract glass-glow gpu flex min-h-[var(--dock-height)] cursor-grab touch-none items-center px-2 py-2 active:cursor-grabbing"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1.5 h-1 w-9 -translate-x-1/2 rounded-full bg-[var(--glass-line)]"
          />

          <AnimatePresence mode="popLayout" initial={false}>
            {dock.mode === 'nav' ? (
              <motion.nav
                key="nav"
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.18 }}
                className="flex w-full items-center justify-between gap-0.5 pt-1"
              >
                {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => vibrate('select')}
                    aria-label={label}
                    className="group flex flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[var(--sea-ink-soft)] transition hover:bg-white/30"
                    activeProps={{
                      className:
                        'flex flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 bg-white/45 text-[var(--lagoon-deep)] shadow-[0_1px_0_var(--glass-edge)_inset]',
                    }}
                    activeOptions={{ exact: to === '/' }}
                  >
                    <Icon size={20} />
                    <span className="text-[10px] font-semibold tracking-wide">
                      {label}
                    </span>
                  </Link>
                ))}

                <button
                  type="button"
                  aria-label="Ask the AI stylist"
                  onClick={dock.toCommand}
                  className="ml-0.5 grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-[linear-gradient(150deg,var(--lagoon),var(--lagoon-deep))] text-white shadow-[0_8px_20px_-6px_var(--glass-glow)] transition hover:brightness-110"
                >
                  <Wand2 size={20} />
                </button>
              </motion.nav>
            ) : (
              <motion.div
                key="command"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="w-full pt-1"
              >
                <DockInput onSubmit={dock.submitCommand} onBack={dock.toNav} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="pointer-events-none mt-1.5 text-center text-[10px] font-medium text-[var(--sea-ink-soft)]">
          {dock.mode === 'nav'
            ? 'Swipe → to ask · drag ↑ for history'
            : 'Swipe ← for navigation'}
        </p>
      </div>
    </div>
  )
}
