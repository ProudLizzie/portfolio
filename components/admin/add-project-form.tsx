'use client'

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Project, ProjectBlock, ProjectCategory } from '@/lib/portfolio-data'
import {
  commitNewProject,
  getStoredToken,
  setStoredToken,
  slugify,
  uploadAsset,
} from '@/lib/github-publish'

/* ------------------------------------------------------------------ */
/* Local (pre-upload) block model                                      */
/* ------------------------------------------------------------------ */

type DraftBlock =
  | { id: string; kind: 'text'; text: string }
  | { id: string; kind: 'image'; file: File | null; caption: string }
  | {
      id: string
      kind: 'imagePair'
      fileA: File | null
      captionA: string
      fileB: File | null
      captionB: string
    }
  | {
      id: string
      kind: 'imageText'
      file: File | null
      caption: string
      text: string
      imageSide: 'left' | 'right'
    }

type DraftPdf = { id: string; file: File | null; title: string; caption: string }
type DraftSpec = { id: string; label: string; value: string }

const CATEGORIES: ProjectCategory[] = ['Personal', 'Academic', 'Professional', 'WIP']

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

/* ------------------------------------------------------------------ */
/* Small styled primitives                                             */
/* ------------------------------------------------------------------ */

const inputClass =
  'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40'

function Field({
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

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-serif text-lg font-semibold text-foreground">{children}</h2>
  )
}

function FileInput({
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

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

export function AddProjectForm() {
  const [token, setToken] = useState(() => getStoredToken())

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<ProjectCategory>('Personal')
  const [year, setYear] = useState(String(new Date().getFullYear()))
  const [description, setDescription] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const [specs, setSpecs] = useState<DraftSpec[]>([])
  const [blocks, setBlocks] = useState<DraftBlock[]>([])
  const [pdfs, setPdfs] = useState<DraftPdf[]>([])

  const [startDate, setStartDate] = useState('')
  const [status, setStatus] = useState('')

  const [phase, setPhase] = useState<'idle' | 'working' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [progress, setProgress] = useState('')
  const [commitUrl, setCommitUrl] = useState('')

  const isWip = category === 'WIP'
  const working = phase === 'working'

  /* --------------------------- tags --------------------------- */

  function addTag(raw: string) {
    const value = raw.trim().replace(/,$/, '').trim()
    if (!value) return
    setTags((prev) => (prev.includes(value) ? prev : [...prev, value]))
    setTagInput('')
  }

  function onTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(tagInput)
    } else if (e.key === 'Backspace' && !tagInput && tags.length) {
      setTags((prev) => prev.slice(0, -1))
    }
  }

  /* --------------------------- specs -------------------------- */

  function addSpec() {
    setSpecs((prev) => [...prev, { id: uid(), label: '', value: '' }])
  }
  function updateSpec(id: string, patch: Partial<DraftSpec>) {
    setSpecs((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }
  function removeSpec(id: string) {
    setSpecs((prev) => prev.filter((s) => s.id !== id))
  }

  /* --------------------------- blocks ------------------------- */

  function addBlock(kind: DraftBlock['kind']) {
    const base = { id: uid() }
    const next: DraftBlock =
      kind === 'text'
        ? { ...base, kind: 'text', text: '' }
        : kind === 'image'
          ? { ...base, kind: 'image', file: null, caption: '' }
          : kind === 'imagePair'
            ? { ...base, kind: 'imagePair', fileA: null, captionA: '', fileB: null, captionB: '' }
            : { ...base, kind: 'imageText', file: null, caption: '', text: '', imageSide: 'left' }
    setBlocks((prev) => [...prev, next])
  }
  function updateBlock(id: string, patch: Partial<DraftBlock>) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? ({ ...b, ...patch } as DraftBlock) : b)))
  }
  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id))
  }
  function moveBlock(id: string, dir: -1 | 1) {
    setBlocks((prev) => {
      const i = prev.findIndex((b) => b.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= prev.length) return prev
      const copy = [...prev]
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
      return copy
    })
  }

  /* --------------------------- pdfs --------------------------- */

  function addPdf() {
    setPdfs((prev) => [...prev, { id: uid(), file: null, title: '', caption: '' }])
  }
  function updatePdf(id: string, patch: Partial<DraftPdf>) {
    setPdfs((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }
  function removePdf(id: string) {
    setPdfs((prev) => prev.filter((p) => p.id !== id))
  }

  /* --------------------------- submit ------------------------- */

  function validate(): string | null {
    if (!token.trim()) return 'A GitHub personal access token is required to publish.'
    if (!title.trim()) return 'Title is required.'
    if (!year.trim()) return 'Year is required.'
    if (!description.trim()) return 'A short description is required.'
    if (!isWip && !coverFile) return 'A cover image is required.'
    for (const b of blocks) {
      if (b.kind === 'image' && !b.file) return 'A full-width image block is missing its image.'
      if (b.kind === 'imagePair' && (!b.fileA || !b.fileB))
        return 'An image-pair block needs both images.'
      if (b.kind === 'imageText' && !b.file)
        return 'An image + text block is missing its image.'
      if (b.kind === 'text' && !b.text.trim()) return 'A text block is empty.'
    }
    for (const p of pdfs) if (!p.file) return 'A PDF block is missing its file.'
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const problem = validate()
    if (problem) {
      setPhase('error')
      setMessage(problem)
      setCommitUrl('')
      return
    }

    setPhase('working')
    setMessage('')
    setCommitUrl('')
    setStoredToken(token.trim())

    const slug = slugify(title)

    try {
      setProgress('Uploading cover image…')
      const image = coverFile ? await uploadAsset(token.trim(), coverFile, 'images', slug) : ''

      const finalBlocks: ProjectBlock[] = []

      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i]
        setProgress(`Uploading content block ${i + 1} of ${blocks.length}…`)
        if (b.kind === 'text') {
          finalBlocks.push({ type: 'text', text: b.text.trim() })
        } else if (b.kind === 'image' && b.file) {
          const src = await uploadAsset(token.trim(), b.file, 'images', slug)
          finalBlocks.push({ type: 'image', src, ...(b.caption.trim() ? { caption: b.caption.trim() } : {}) })
        } else if (b.kind === 'imagePair' && b.fileA && b.fileB) {
          const srcA = await uploadAsset(token.trim(), b.fileA, 'images', slug)
          const srcB = await uploadAsset(token.trim(), b.fileB, 'images', slug)
          finalBlocks.push({
            type: 'imagePair',
            images: [
              { src: srcA, ...(b.captionA.trim() ? { caption: b.captionA.trim() } : {}) },
              { src: srcB, ...(b.captionB.trim() ? { caption: b.captionB.trim() } : {}) },
            ],
          })
        } else if (b.kind === 'imageText' && b.file) {
          const src = await uploadAsset(token.trim(), b.file, 'images', slug)
          finalBlocks.push({
            type: 'imageText',
            src,
            text: b.text.trim(),
            imageSide: b.imageSide,
            ...(b.caption.trim() ? { caption: b.caption.trim() } : {}),
          })
        }
      }

      for (let i = 0; i < pdfs.length; i++) {
        const p = pdfs[i]
        if (!p.file) continue
        setProgress(`Uploading PDF ${i + 1} of ${pdfs.length}…`)
        const src = await uploadAsset(token.trim(), p.file, 'pdfs', slug)
        finalBlocks.push({
          type: 'pdf',
          src,
          ...(p.title.trim() ? { title: p.title.trim() } : {}),
          ...(p.caption.trim() ? { caption: p.caption.trim() } : {}),
        })
      }

      const cleanSpecs = specs
        .filter((s) => s.label.trim() && s.value.trim())
        .map((s) => ({ label: s.label.trim(), value: s.value.trim() }))

      const project: Project = {
        slug,
        title: title.trim(),
        description: description.trim(),
        category,
        tags,
        image,
        year: year.trim(),
        ...(cleanSpecs.length ? { specs: cleanSpecs } : {}),
        ...(isWip && startDate.trim() ? { startDate: startDate.trim() } : {}),
        ...(isWip && status.trim() ? { status: status.trim() } : {}),
        blocks: finalBlocks,
      }

      setProgress('Committing project data…')
      const url = await commitNewProject(token.trim(), project)

      setPhase('success')
      setCommitUrl(url)
      setMessage(
        `"${project.title}" was published. It will appear on the site once GitHub Pages finishes rebuilding.`,
      )
    } catch (err) {
      setPhase('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong while publishing.')
    } finally {
      setProgress('')
    }
  }

  /* --------------------------- render ------------------------- */

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Basics */}
      <section className="space-y-5">
        <SectionTitle>Basics</SectionTitle>

        <Field label="Title" htmlFor="p-title">
          <input
            id="p-title"
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Animatronic Octopus"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category" htmlFor="p-category">
            <select
              id="p-category"
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value as ProjectCategory)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Year" htmlFor="p-year">
            <input
              id="p-year"
              className={inputClass}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2026"
              inputMode="numeric"
            />
          </Field>
        </div>

        <Field label="Short description" htmlFor="p-desc" hint="One line shown on project cards.">
          <textarea
            id="p-desc"
            className={`${inputClass} min-h-20 resize-y`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A 5-DOF animatronic designed to iterate."
          />
        </Field>

        <Field
          label="Cover image"
          hint={isWip ? 'Optional for work-in-progress items.' : 'Shown as the card and hero image.'}
        >
          <FileInput
            id="p-cover"
            accept="image/*"
            fileName={coverFile?.name}
            onChange={setCoverFile}
          />
        </Field>
      </section>

      {/* WIP-only */}
      {isWip && (
        <section className="space-y-5">
          <SectionTitle>Work in progress</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Start date" htmlFor="p-start" hint="Format: YYYY-MM. Orders the WIP timeline.">
              <input
                id="p-start"
                className={inputClass}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="2026-06"
              />
            </Field>
          </div>
          <Field label="Status" htmlFor="p-status" hint="Progress note shown on the WIP card.">
            <textarea
              id="p-status"
              className={`${inputClass} min-h-20 resize-y`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Currently manufacturing the first prototype…"
            />
          </Field>
        </section>
      )}

      {/* Tools / tags */}
      <section className="space-y-3">
        <SectionTitle>Tools &amp; skills</SectionTitle>
        <p className="text-xs text-muted-foreground">Press Enter or comma to add each tag.</p>
        <div className="flex flex-wrap gap-2 rounded-lg border border-input bg-background p-2 shadow-sm">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                className="text-secondary-foreground/60 hover:text-secondary-foreground"
                aria-label={`Remove ${tag}`}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
          <input
            className="min-w-32 flex-1 bg-transparent px-1 py-1 text-sm text-foreground outline-none"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={onTagKeyDown}
            onBlur={() => addTag(tagInput)}
            placeholder={tags.length ? '' : 'SolidWorks, Arduino…'}
          />
        </div>
      </section>

      {/* Specs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <SectionTitle>Specs</SectionTitle>
          <Button type="button" variant="outline" size="sm" onClick={addSpec}>
            <Plus className="size-3.5" />
            Add row
          </Button>
        </div>
        {specs.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Optional label / value rows shown in the detail sidebar.
          </p>
        )}
        <div className="space-y-3">
          {specs.map((spec) => (
            <div key={spec.id} className="flex items-center gap-2">
              <input
                className={inputClass}
                value={spec.label}
                onChange={(e) => updateSpec(spec.id, { label: e.target.value })}
                placeholder="Material"
              />
              <input
                className={inputClass}
                value={spec.value}
                onChange={(e) => updateSpec(spec.id, { value: e.target.value })}
                placeholder="PLA + resin"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeSpec(spec.id)}
                aria-label="Remove spec row"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Content blocks */}
      <section className="space-y-4">
        <div>
          <SectionTitle>Long description</SectionTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Compose the write-up from content blocks, shown in order on the detail page.
          </p>
        </div>

        <div className="space-y-4">
          {blocks.map((block, i) => (
            <div key={block.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {block.kind === 'text'
                    ? 'Text'
                    : block.kind === 'image'
                      ? 'Full-width image'
                      : block.kind === 'imagePair'
                        ? 'Image pair'
                        : 'Image + text'}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={i === 0}
                    onClick={() => moveBlock(block.id, -1)}
                    aria-label="Move block up"
                  >
                    <ArrowUp className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={i === blocks.length - 1}
                    onClick={() => moveBlock(block.id, 1)}
                    aria-label="Move block down"
                  >
                    <ArrowDown className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeBlock(block.id)}
                    aria-label="Remove block"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>

              {block.kind === 'text' && (
                <textarea
                  className={`${inputClass} min-h-28 resize-y`}
                  value={block.text}
                  onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                  placeholder="Write a paragraph…"
                />
              )}

              {block.kind === 'image' && (
                <div className="space-y-3">
                  <FileInput
                    id={`blk-${block.id}`}
                    accept="image/*"
                    fileName={block.file?.name}
                    onChange={(file) => updateBlock(block.id, { file })}
                  />
                  <input
                    className={inputClass}
                    value={block.caption}
                    onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                    placeholder="Caption (optional)"
                  />
                </div>
              )}

              {block.kind === 'imagePair' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <FileInput
                      id={`blk-${block.id}-a`}
                      accept="image/*"
                      fileName={block.fileA?.name}
                      onChange={(file) => updateBlock(block.id, { fileA: file })}
                    />
                    <input
                      className={inputClass}
                      value={block.captionA}
                      onChange={(e) => updateBlock(block.id, { captionA: e.target.value })}
                      placeholder="Caption (optional)"
                    />
                  </div>
                  <div className="space-y-3">
                    <FileInput
                      id={`blk-${block.id}-b`}
                      accept="image/*"
                      fileName={block.fileB?.name}
                      onChange={(file) => updateBlock(block.id, { fileB: file })}
                    />
                    <input
                      className={inputClass}
                      value={block.captionB}
                      onChange={(e) => updateBlock(block.id, { captionB: e.target.value })}
                      placeholder="Caption (optional)"
                    />
                  </div>
                </div>
              )}

              {block.kind === 'imageText' && (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <FileInput
                      id={`blk-${block.id}`}
                      accept="image/*"
                      fileName={block.file?.name}
                      onChange={(file) => updateBlock(block.id, { file })}
                    />
                    <select
                      className={inputClass}
                      value={block.imageSide}
                      onChange={(e) =>
                        updateBlock(block.id, { imageSide: e.target.value as 'left' | 'right' })
                      }
                    >
                      <option value="left">Image on left</option>
                      <option value="right">Image on right</option>
                    </select>
                  </div>
                  <input
                    className={inputClass}
                    value={block.caption}
                    onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                    placeholder="Caption (optional)"
                  />
                  <textarea
                    className={`${inputClass} min-h-24 resize-y`}
                    value={block.text}
                    onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                    placeholder="Paragraph shown beside the image…"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock('text')}>
            <Plus className="size-3.5" />
            Text
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock('image')}>
            <Plus className="size-3.5" />
            Full-width image
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock('imagePair')}>
            <Plus className="size-3.5" />
            Image pair
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock('imageText')}>
            <Plus className="size-3.5" />
            Image + text
          </Button>
        </div>
      </section>

      {/* Supporting PDFs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <SectionTitle>Supporting PDFs</SectionTitle>
          <Button type="button" variant="outline" size="sm" onClick={addPdf}>
            <Plus className="size-3.5" />
            Add PDF
          </Button>
        </div>
        {pdfs.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Optional. Each PDF is embedded at the end of the write-up.
          </p>
        )}
        <div className="space-y-4">
          {pdfs.map((pdf) => (
            <div key={pdf.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-3 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removePdf(pdf.id)}
                  aria-label="Remove PDF"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <FileInput
                  id={`pdf-${pdf.id}`}
                  accept="application/pdf"
                  fileName={pdf.file?.name}
                  onChange={(file) => updatePdf(pdf.id, { file })}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className={inputClass}
                    value={pdf.title}
                    onChange={(e) => updatePdf(pdf.id, { title: e.target.value })}
                    placeholder="Title (optional)"
                  />
                  <input
                    className={inputClass}
                    value={pdf.caption}
                    onChange={(e) => updatePdf(pdf.id, { caption: e.target.value })}
                    placeholder="Caption (optional)"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Publish */}
      <section className="space-y-5 border-t border-border pt-8">
        <SectionTitle>Publish</SectionTitle>
        <Field
          label="GitHub personal access token"
          htmlFor="p-token"
          hint="Needs Contents: read & write on ProudLizzie/portfolio. Stored only in this browser, never committed."
        >
          <input
            id="p-token"
            type="password"
            className={inputClass}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="github_pat_…"
            autoComplete="off"
          />
        </Field>

        {phase === 'success' && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-sage/60 bg-sage/15 p-4 text-sm text-sage-foreground"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
            <div className="space-y-2">
              <p>{message}</p>
              {commitUrl && (
                <a
                  href={commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium underline underline-offset-2"
                >
                  View commit
                  <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        )}

        {phase === 'error' && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-5 shrink-0" />
            <p>{message}</p>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button type="submit" size="lg" disabled={working}>
            {working ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Publishing…
              </>
            ) : (
              'Publish project'
            )}
          </Button>
          {working && progress && (
            <span className="text-sm text-muted-foreground">{progress}</span>
          )}
        </div>
      </section>
    </form>
  )
}
