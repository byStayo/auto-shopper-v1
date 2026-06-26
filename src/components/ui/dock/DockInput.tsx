import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mic, Send } from 'lucide-react'
import { useHaptics } from '../../../hooks/useHaptics'

interface DockInputProps {
  onSubmit: (prompt: string) => void
  onBack: () => void
}

/** AI command field that the dock morphs into — mic + send actions. */
export default function DockInput({ onSubmit, onBack }: DockInputProps) {
  const { vibrate } = useHaptics()
  const [value, setValue] = useState('')
  const [listening, setListening] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const submit = () => {
    if (!value.trim()) {
      return
    }
    onSubmit(value)
    setValue('')
  }

  return (
    <motion.form
      layout
      className="flex w-full items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <button
        type="button"
        aria-label="Back to navigation"
        onClick={() => {
          vibrate('select')
          onBack()
        }}
        className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-[var(--glass-line)] bg-white/30 text-[var(--sea-ink)] transition hover:bg-white/50"
      >
        <ArrowLeft size={18} />
      </button>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        enterKeyHint="send"
        placeholder="Ask the stylist…"
        aria-label="AI command"
        className="min-w-0 flex-1 bg-transparent px-1 text-[var(--sea-ink)] outline-none placeholder:text-[var(--sea-ink-soft)]"
      />

      <button
        type="button"
        aria-label={listening ? 'Stop voice input' : 'Start voice input'}
        aria-pressed={listening}
        onClick={() => {
          vibrate(listening ? 'select' : 'impact')
          setListening((l) => !l)
        }}
        className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border transition ${
          listening
            ? 'border-transparent bg-[var(--lagoon)] text-white shadow-[0_0_0_4px_var(--glass-glow)]'
            : 'border-[var(--glass-line)] bg-white/30 text-[var(--sea-ink)] hover:bg-white/50'
        }`}
      >
        <Mic size={18} />
      </button>

      <button
        type="submit"
        aria-label="Send command"
        disabled={!value.trim()}
        className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[var(--lagoon-deep)] text-white transition hover:brightness-110 disabled:opacity-40"
      >
        <Send size={18} />
      </button>
    </motion.form>
  )
}
