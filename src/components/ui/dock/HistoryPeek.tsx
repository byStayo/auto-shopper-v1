import { AnimatePresence, motion } from 'framer-motion'
import { Clock, X } from 'lucide-react'
import type { DockSession } from '../../../hooks/useLiquidDock'

interface HistoryPeekProps {
  open: boolean
  sessions: Array<DockSession>
  onClose: () => void
  onSelect: (prompt: string) => void
}

function timeAgo(at: number): string {
  const mins = Math.round((Date.now() - at) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.round(hrs / 24)}d ago`
}

/** Recent AI sessions revealed by dragging the dock upward. */
export default function HistoryPeek({
  open,
  sessions,
  onClose,
  onSelect,
}: HistoryPeekProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="history"
          layout
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="glass glass-refract gpu mb-3 w-full overflow-hidden p-3"
        >
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--kicker)]">
              <Clock size={13} /> Recent sessions
            </span>
            <button
              type="button"
              aria-label="Close history"
              onClick={onClose}
              className="grid h-7 w-7 place-items-center rounded-full text-[var(--sea-ink-soft)] transition hover:bg-white/40 hover:text-[var(--sea-ink)]"
            >
              <X size={15} />
            </button>
          </div>

          <ul className="flex flex-col gap-1.5">
            {sessions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSelect(s.prompt)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--glass-line)] bg-white/25 px-3 py-2 text-left transition hover:bg-white/45"
                >
                  <span className="truncate text-sm text-[var(--sea-ink)]">
                    {s.prompt}
                  </span>
                  <span className="flex-shrink-0 text-xs text-[var(--sea-ink-soft)]">
                    {timeAgo(s.at)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
