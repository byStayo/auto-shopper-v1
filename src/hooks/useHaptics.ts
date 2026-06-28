import { useCallback } from 'react'

export type HapticPattern = 'tap' | 'select' | 'impact' | 'success' | 'warning'

const PATTERNS: Record<HapticPattern, number | Array<number>> = {
  tap: 8,
  select: 12,
  impact: 24,
  success: [12, 40, 18],
  warning: [24, 60, 24, 60],
}

function canVibrate(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    typeof navigator.vibrate === 'function'
  )
}

/**
 * Thin wrapper around the Vibration API with named patterns.
 * No-ops gracefully on platforms (incl. iOS Safari) without support.
 */
export function useHaptics() {
  const vibrate = useCallback((pattern: HapticPattern = 'tap') => {
    if (!canVibrate()) {
      return false
    }

    try {
      return navigator.vibrate(PATTERNS[pattern])
    } catch {
      return false
    }
  }, [])

  return { vibrate, supported: canVibrate() }
}
