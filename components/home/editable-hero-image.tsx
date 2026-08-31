'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Pencil } from 'lucide-react'

const STORAGE_KEY = 'hero-image-override'

/**
 * Hero portrait that the site owner can swap for their own image.
 *
 * The frame is locked to a square (aspect-square + object-cover), so no matter
 * what proportions the uploaded image has, the arch shape stays exactly the
 * same — the image is cropped to fit rather than reshaping the frame.
 *
 * The chosen image is stored as a data URL in localStorage so it persists
 * across reloads without needing a backend.
 */
export function EditableHeroImage({
  defaultSrc,
  alt,
}: {
  defaultSrc: string
  alt: string
}) {
  const [src, setSrc] = useState(defaultSrc)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSrc(stored)
    } catch {
      // Ignore storage access errors (e.g. private mode).
    }
  }, [])

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result !== 'string') return
      setSrc(result)
      try {
        localStorage.setItem(STORAGE_KEY, result)
      } catch {
        // Ignore quota/access errors; the image still shows this session.
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="group relative aspect-square overflow-hidden rounded-t-[999px] rounded-b-3xl border border-border bg-card shadow-md">
      <Image
        src={src || '/placeholder.svg'}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 80vw, 380px"
        className="object-cover"
        unoptimized={src.startsWith('data:')}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute right-4 top-6 inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-border backdrop-blur transition-opacity hover:bg-background focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <Pencil className="size-4" />
        Edit
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="sr-only"
        aria-label="Upload a new hero image"
      />
    </div>
  )
}
