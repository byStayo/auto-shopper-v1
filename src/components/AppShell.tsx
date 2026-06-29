import { Link } from '@tanstack/react-router'
import { Sparkles } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import CommandDock from './ui/dock/CommandDock'

/**
 * Mobile-first app shell: a slim glass top bar, the routed page content, and the
 * floating Liquid Glass Command Dock. The `viewport-fit=cover` meta + safe-area
 * padding (set in __root / styles.css) keep content clear of the notch + dock.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="safe-top sticky top-0 z-40 px-3 pb-2">
        <div className="glass glass-refract mx-auto flex w-full max-w-md items-center justify-between rounded-2xl px-3 py-2">
          <Link
            to="/"
            className="flex items-center gap-2 no-underline"
            aria-label="Closet Shopper home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[linear-gradient(150deg,var(--lagoon),var(--lagoon-deep))] text-white">
              <Sparkles size={16} />
            </span>
            <span className="text-sm font-bold tracking-tight text-[var(--sea-ink)]">
              Closet Shopper
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="dock-safe-area mx-auto w-full max-w-md flex-1 px-3 pt-2 pb-32">
        {children}
      </main>

      <CommandDock />
    </div>
  )
}
