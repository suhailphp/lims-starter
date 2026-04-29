/* REUSABLE — Image picker with vendor's dashed-box pattern.
 *
 * Vendor visual reference:
 *   vendor/src/pages/settings/general-settings/generalSettings.tsx:52
 *   vendor/src/pages/systems-security/tenants/tenantsModal.tsx:35
 *
 * Vendor only wires click-to-browse via an `opacity-0 absolute` file input
 * overlay. We add real drag-and-drop event handlers on top of the same
 * visual so the dashed-border affordance actually works.
 *
 * This component is "uncontrolled" with respect to upload — it just gives
 * the caller the picked File via `onSelect` and previews it. The caller
 * decides when to upload (e.g. defer until form save, then attach the
 * returned attachmentID).
 */
import { useEffect, useRef, useState } from 'react'
import { IconPencil, IconPhoto, IconX } from '@tabler/icons-react'
import { Avatar } from './Avatar'
import type { Attachment } from '@/types/attachment'

const DEFAULT_ACCEPT = 'image/jpeg,image/png,image/webp'
const DEFAULT_MAX = 500 * 1024

interface AttachmentUploadProps {
  /** Existing server-side attachment to display (edit mode). */
  existing?: Attachment | null
  /** Locally-picked file not yet uploaded (preview state). */
  pendingFile?: File | null
  /**
   * Fired when the user picks/drops a file. Validation is done first —
   * if the file is rejected, this is NOT called.
   */
  onSelect: (file: File) => void
  /** Fired when user clicks "Remove". Caller decides whether to clear server FK. */
  onRemove?: () => void
  /** Fallback initials/name for the avatar when no photo. */
  name: string
  /** Disable interaction (during form submit). */
  disabled?: boolean
  /** Override max bytes; default 500 KB. Server enforces too. */
  maxBytes?: number
  /** Override accepted MIME types; default jpeg/png/webp. */
  accept?: string
  /** External error to render under the box. */
  errorMessage?: string
  /**
   * Visual variant. Default `'dashed-box'` is the wide vendor pattern used
   * in the admin UserFormDialog. `'pencil-overlay'` renders just the
   * avatar circle with a small pencil button bottom-right and a tiny
   * remove button top-right when a photo exists — used on the Profile
   * page where space is tight and the visual focus is the avatar itself.
   */
  variant?: 'dashed-box' | 'pencil-overlay'
}

export function AttachmentUpload({
  existing,
  pendingFile,
  onSelect,
  onRemove,
  name,
  disabled = false,
  maxBytes = DEFAULT_MAX,
  accept = DEFAULT_ACCEPT,
  errorMessage,
  variant = 'dashed-box',
}: AttachmentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setDragging] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Keep a blob URL for the pendingFile so we can render it without
  // re-encoding to base64 on the client.
  useEffect(() => {
    if (!pendingFile) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(pendingFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [pendingFile])

  const allowedMimes = accept.split(',').map((s) => s.trim())

  const handleFile = (file: File | undefined) => {
    setLocalError(null)
    if (!file) return
    if (!allowedMimes.includes(file.type)) {
      setLocalError(`Unsupported file type: ${file.type || 'unknown'}.`)
      return
    }
    if (file.size > maxBytes) {
      setLocalError(`File too large. Max ${formatBytes(maxBytes)}.`)
      return
    }
    onSelect(file)
  }

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0])
    // Reset input so picking the SAME file twice still fires onChange.
    e.target.value = ''
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    handleFile(e.dataTransfer.files?.[0])
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (disabled) return
    if (!isDragging) setDragging(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return
    setDragging(false)
  }

  const error = errorMessage ?? localError
  const hasPhoto = !!previewUrl || !!existing?.dataUrl

  if (variant === 'pencil-overlay') {
    return (
      <div className="inline-block">
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={[
            'relative inline-block rounded-full',
            isDragging ? 'ring-4 ring-primary-50' : '',
            error ? 'ring-4 ring-danger-50' : '',
          ].join(' ')}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected"
              className="w-[120px] h-[120px] rounded-full object-cover border border-border-color"
              draggable={false}
            />
          ) : (
            <Avatar photo={existing} name={name} size="xl" />
          )}

          {!disabled && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              aria-label={hasPhoto ? 'Replace photo' : 'Upload photo'}
              className="absolute end-1 bottom-1 w-9 h-9 inline-flex items-center justify-center bg-white border border-border-color rounded-full text-dark hover:bg-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <IconPencil size={16} />
            </button>
          )}

          {hasPhoto && onRemove && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLocalError(null)
                onRemove()
              }}
              aria-label="Remove photo"
              className="absolute end-1 top-1 w-7 h-7 inline-flex items-center justify-center bg-white border border-border-color rounded-full text-default hover:bg-danger hover:border-danger hover:text-white"
            >
              <IconX size={12} />
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={onPick}
            disabled={disabled}
            className="hidden"
          />
        </div>
        {error && <p className="mt-2 text-xs text-danger">{error}</p>}
      </div>
    )
  }

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        className={[
          'relative flex flex-wrap items-center gap-4 p-5 border border-dashed rounded-lg transition cursor-pointer',
          isDragging
            ? 'border-primary bg-primary-50'
            : 'border-border-color bg-white hover:border-primary',
          disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
          error ? 'border-danger' : '',
        ].join(' ')}
      >
        {hasPhoto ? (
          previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected"
              className="w-[64px] h-[64px] rounded-full object-cover border border-border-color"
              draggable={false}
            />
          ) : (
            <Avatar photo={existing} name={name} size="md" />
          )
        ) : (
          <span className="flex items-center justify-center w-[64px] h-[64px] rounded-full bg-light border border-border-color text-default">
            <IconPhoto size={24} />
          </span>
        )}

        <div className="flex-1 min-w-[200px]">
          <p className="text-sm text-dark mb-1 font-medium">
            {hasPhoto ? 'Replace photo: ' : 'Drag & drop an image or '}
            <span className="text-primary">browse files</span>
          </p>
          <p className="text-xs text-default">
            JPG, PNG, WEBP — up to {formatBytes(maxBytes)}.
          </p>
        </div>

        {hasPhoto && onRemove && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLocalError(null)
              onRemove()
            }}
            className="size-8 inline-flex items-center justify-center rounded-full border border-border-color bg-white text-default hover:bg-danger hover:border-danger hover:text-white"
            aria-label="Remove photo"
          >
            <IconX size={14} />
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onPick}
          disabled={disabled}
          className="hidden"
        />
      </div>

      {error && (
        <p className="mt-1 text-xs text-danger">{error}</p>
      )}
    </div>
  )
}

function formatBytes(n: number): string {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`
  if (n >= 1024) return `${Math.round(n / 1024)} KB`
  return `${n} B`
}
