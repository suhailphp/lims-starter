/* DOMAIN — Top search input on /search.
 *
 * Autofocuses on mount + exposes a refocus method via ref so ⌘K from the
 * page itself just refocuses (matches the locked decision: "⌘K when
 * already on /search → refocus, no navigation").
 *
 * Layout: a single rounded input with a neutral search-icon button
 * inside the right edge. Click icon OR press Enter fires `onSubmit`. */
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { IconSearch } from '@tabler/icons-react'

interface SearchInputProps {
  value: string
  onChange: (v: string) => void
  /** Fired on Enter or submit-icon click. The page wires this to an
   *  immediate URL update so it skips the debounce. */
  onSubmit?: (v: string) => void
  placeholder?: string
}

export interface SearchInputHandle {
  focus: () => void
  isFocused: () => boolean
}

const MIN_LENGTH = 2

export const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(
  function SearchInput(
    {
      value,
      onChange,
      onSubmit,
      placeholder = 'Search customers, tests, equipment, and more…',
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus()
        inputRef.current?.select()
      },
      isFocused: () => document.activeElement === inputRef.current,
    }))

    useEffect(() => {
      inputRef.current?.focus()
    }, [])

    const submit = () => {
      if (!onSubmit) return
      const v = value.trim()
      if (v.length < MIN_LENGTH) return
      onSubmit(v)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      submit()
    }

    const submitDisabled = value.trim().length < MIN_LENGTH

    return (
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          aria-label="Search"
          className="form-input ps-4 pe-12 py-2.5 text-dark bg-light w-full border border-border-color rounded-lg focus:ring-0 focus:border-primary"
        />
        <button
          type="button"
          onClick={submit}
          disabled={submitDisabled}
          aria-label="Search"
          title={submitDisabled ? 'Type at least 2 characters' : 'Search'}
          className="cursor-pointer w-8 h-8 bg-light text-default flex items-center justify-center absolute end-2 top-1/2 -translate-y-1/2 rounded-md hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-default"
        >
          <IconSearch size={18} />
        </button>
      </div>
    )
  },
)
