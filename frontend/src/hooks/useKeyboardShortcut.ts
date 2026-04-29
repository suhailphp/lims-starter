/* REUSABLE — Global keyboard shortcut hook.
 *
 * Listens on `window` for a single key chord (modifier + key). Skips
 * firing when focus is in an editable element UNLESS `allowInInputs` is
 * set (the search-page refocus shortcut wants to fire even when the
 * input is focused). */
import { useEffect } from 'react'

interface ShortcutOpts {
  /** Require Cmd (mac) or Ctrl (win/linux). Default true. */
  meta?: boolean
  /** Require Shift. Default false. */
  shift?: boolean
  /** Require Alt. Default false. */
  alt?: boolean
  /** Fire even when focus is inside an input/textarea/contenteditable. */
  allowInInputs?: boolean
}

function isEditableTarget(t: EventTarget | null): boolean {
  if (!(t instanceof HTMLElement)) return false
  const tag = t.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (t.isContentEditable) return true
  return false
}

export function useKeyboardShortcut(
  key: string,
  handler: (e: KeyboardEvent) => void,
  opts: ShortcutOpts = {},
) {
  useEffect(() => {
    const { meta = true, shift = false, alt = false, allowInInputs = true } = opts
    const lowered = key.toLowerCase()

    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== lowered) return
      if (meta && !(e.metaKey || e.ctrlKey)) return
      if (!meta && (e.metaKey || e.ctrlKey)) return
      if (shift !== e.shiftKey) return
      if (alt !== e.altKey) return
      if (!allowInInputs && isEditableTarget(e.target)) return

      e.preventDefault()
      handler(e)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [key, handler, opts])
}
