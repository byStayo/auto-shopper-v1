import { useCallback, useMemo, useState } from 'react'
import { useHaptics } from './useHaptics'

export type DockMode = 'nav' | 'command'

export interface DockSession {
  id: string
  prompt: string
  at: number
}

const SEED_SESSIONS: Array<DockSession> = [
  {
    id: 's-3',
    prompt: 'Style a linen shirt for a spring brunch',
    at: Date.now() - 1000 * 60 * 8,
  },
  {
    id: 's-2',
    prompt: 'Find shoes that match my olive trousers',
    at: Date.now() - 1000 * 60 * 42,
  },
  {
    id: 's-1',
    prompt: 'Build a capsule wardrobe from my closet',
    at: Date.now() - 1000 * 60 * 60 * 5,
  },
]

/**
 * State machine for the Liquid Glass Command Dock.
 * - `mode` morphs the dock horizontally between nav pills and the AI input.
 * - `historyOpen` is revealed by a vertical drag gesture.
 */
export function useLiquidDock() {
  const { vibrate } = useHaptics()
  const [mode, setMode] = useState<DockMode>('nav')
  const [historyOpen, setHistoryOpen] = useState(false)
  const [sessions, setSessions] = useState<Array<DockSession>>(SEED_SESSIONS)

  const toCommand = useCallback(() => {
    vibrate('impact')
    setMode('command')
  }, [vibrate])

  const toNav = useCallback(() => {
    vibrate('select')
    setMode('nav')
    setHistoryOpen(false)
  }, [vibrate])

  const toggleMode = useCallback(() => {
    setMode((m) => {
      vibrate(m === 'nav' ? 'impact' : 'select')
      return m === 'nav' ? 'command' : 'nav'
    })
  }, [vibrate])

  const openHistory = useCallback(() => {
    if (!historyOpen) {
      vibrate('tap')
    }
    setHistoryOpen(true)
  }, [historyOpen, vibrate])

  const closeHistory = useCallback(() => {
    setHistoryOpen(false)
  }, [])

  const submitCommand = useCallback(
    (prompt: string) => {
      const trimmed = prompt.trim()
      if (!trimmed) {
        return
      }
      vibrate('success')
      setSessions((prev) => [
        { id: `s-${Date.now()}`, prompt: trimmed, at: Date.now() },
        ...prev,
      ])
    },
    [vibrate],
  )

  return useMemo(
    () => ({
      mode,
      historyOpen,
      sessions,
      toCommand,
      toNav,
      toggleMode,
      openHistory,
      closeHistory,
      submitCommand,
    }),
    [
      mode,
      historyOpen,
      sessions,
      toCommand,
      toNav,
      toggleMode,
      openHistory,
      closeHistory,
      submitCommand,
    ],
  )
}
