'use client'

import type { ChangeEvent, ReactNode } from 'react'

/* Shared styled primitives for the admin forms, kept in one place so the
   "Add project" and "Media mentions" forms stay visually consistent. */

export const inputClass =
  'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40'

export function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-serif text-lg font-semibold text-foreground">{children}</h2>
}

export function FileInput({
  id,
  accept,
  onChange,
  fileName,
}: {
  id: string
  accept: string
  onChange: (file: File | null) => void
  fileName?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label
        htmlFor={id}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
      >
        Choose file
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.files?.[0] ?? null)}
      />
      <span className="min-w-0 truncate text-sm text-muted-foreground">
        {fileName || 'No file selected'}
      </span>
    </div>
  )
}
