'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FileInput, SectionTitle, inputClass, uid } from '@/components/admin/form-primitives'
import { mediaMentions, type MediaMention } from '@/lib/portfolio-data'
import {
  commitMediaMentions,
  getStoredToken,
  setStoredToken,
  slugify,
  uploadAsset,
} from '@/lib/github-publish'

/* Local, pre-upload model. `photoUrl` holds an existing committed path or a
   pasted URL; `photoFile` is a not-yet-uploaded file that takes precedence. */
type Draft = {
  id: string
  title: string
  link: string
  photoUrl: string
  photoFile: File | null
  date: string
  excerpt: string
}

function toDraft(m: MediaMention): Draft {
  return {
    id: m.id,
    title: m.title,
    link: m.link,
    photoUrl: m.photo,
    photoFile: null,
    date: m.date ?? '',
    excerpt: m.excerpt ?? '',
  }
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function validateDraft(d: Draft): string | null {
  if (!d.title.trim()) return 'A title is required.'
  if (!d.link.trim()) return 'A link is required.'
  if (!isValidUrl(d.link.trim())) return 'The link must be a valid http(s) URL.'
  if (!d.photoFile && !d.photoUrl.trim()) return 'A photo (upload or URL) is required.'
  return null
}

function emptyDraft(): Draft {
  return { id: uid(), title: '', link: '', photoUrl: '', photoFile: null, date: '', excerpt: '' }
}

export function MediaMentionsForm() {
  const [token, setToken] = useState(() => getStoredToken())
  const [items, setItems] = useState<Draft[]>(() => mediaMentions.map(toDraft))
  const [adding, setAdding] = useState<Draft>(emptyDraft)
  const [editingId, setEditingId] = useState<string | null>(null)
  // Snapshot of the item as it was when editing began, so Cancel can revert any
  // unsaved changes.
  const [editSnapshot, setEditSnapshot] = useState<Draft | null>(null)

  const [phase, setPhase] = useState<'idle' | 'working' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [commitUrl, setCommitUrl] = useState('')

  const working = phase === 'working'

  function patchAdding(patch: Partial<Draft>) {
    setAdding((prev) => ({ ...prev, ...patch }))
  }
  function patchItem(id: string, patch: Partial<Draft>) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  // Uploads any pending file for a draft and returns its final MediaMention.
  async function resolveMention(d: Draft, authToken: string): Promise<MediaMention> {
    const photo = d.photoFile
      ? await uploadAsset(authToken, d.photoFile, 'images', slugify(d.title) || 'media')
      : d.photoUrl.trim()
    return {
      id: d.id,
      title: d.title.trim(),
      photo,
      link: d.link.trim(),
      ...(d.date.trim() ? { date: d.date.trim() } : {}),
      ...(d.excerpt.trim() ? { excerpt: d.excerpt.trim() } : {}),
    }
  }

  // Uploads pending assets, commits the full array, and syncs local state with
  // the resolved photo paths on success.
  async function persist(nextDrafts: Draft[], summary: string, onSuccess?: () => void) {
    if (!token.trim()) {
      setPhase('error')
      setMessage('A GitHub personal access token is required to publish.')
      setCommitUrl('')
      return
    }

    setPhase('working')
    setMessage('')
    setCommitUrl('')
    setStoredToken(token.trim())

    try {
      const mentions: MediaMention[] = []
      const resolvedDrafts: Draft[] = []
      for (const d of nextDrafts) {
        const mention = await resolveMention(d, token.trim())
        mentions.push(mention)
        resolvedDrafts.push({ ...d, photoUrl: mention.photo, photoFile: null })
      }

      const url = await commitMediaMentions(token.trim(), mentions, summary)

      setItems(resolvedDrafts)
      setPhase('success')
      setCommitUrl(url)
      setMessage(`${summary}. It will appear on the site once GitHub Pages finishes rebuilding.`)
      onSuccess?.()
    } catch (err) {
      setPhase('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong while publishing.')
    }
  }

  function handleAdd() {
    const problem = validateDraft(adding)
    if (problem) {
      setPhase('error')
      setMessage(problem)
      setCommitUrl('')
      return
    }
    void persist([...items, adding], `Add media mention: ${adding.title.trim()}`, () =>
      setAdding(emptyDraft()),
    )
  }

  function handleSaveEdit(id: string) {
    const draft = items.find((it) => it.id === id)
    if (!draft) return
    const problem = validateDraft(draft)
    if (problem) {
      setPhase('error')
      setMessage(problem)
      setCommitUrl('')
      return
    }
    void persist(items, `Update media mention: ${draft.title.trim()}`, () => {
      setEditingId(null)
      setEditSnapshot(null)
    })
  }

  function handleDelete(id: string) {
    const draft = items.find((it) => it.id === id)
    if (!draft) return
    void persist(
      items.filter((it) => it.id !== id),
      `Delete media mention: ${draft.title.trim()}`,
    )
  }

  return (
    <div className="space-y-12">
      {/* Add */}
      <section className="space-y-5">
        <SectionTitle>Add a media mention</SectionTitle>

        <Field label="Title" htmlFor="m-title" hint="Publication/outlet name or the headline.">
          <input
            id="m-title"
            className={inputClass}
            value={adding.title}
            onChange={(e) => patchAdding({ title: e.target.value })}
            placeholder="UW-Madison Engineering feature"
          />
        </Field>

        <Field label="Link" htmlFor="m-link" hint="External URL to the article or mention.">
          <input
            id="m-link"
            className={inputClass}
            value={adding.link}
            onChange={(e) => patchAdding({ link: e.target.value })}
            placeholder="https://example.com/article"
            inputMode="url"
          />
        </Field>

        <Field label="Photo" hint="Upload a thumbnail, or paste an image URL below.">
          <FileInput
            id="m-photo"
            accept="image/*"
            fileName={adding.photoFile?.name}
            onChange={(file) => patchAdding({ photoFile: file })}
          />
        </Field>

        {!adding.photoFile && (
          <Field label="Photo URL" htmlFor="m-photo-url" hint="Optional if you uploaded a file above.">
            <input
              id="m-photo-url"
              className={inputClass}
              value={adding.photoUrl}
              onChange={(e) => patchAdding({ photoUrl: e.target.value })}
              placeholder="https://example.com/image.png"
              inputMode="url"
            />
          </Field>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Date" htmlFor="m-date" hint="Optional. Used for sorting (YYYY-MM-DD).">
            <input
              id="m-date"
              type="date"
              className={inputClass}
              value={adding.date}
              onChange={(e) => patchAdding({ date: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Excerpt" htmlFor="m-excerpt" hint="Optional short pull-quote shown on the About page.">
          <textarea
            id="m-excerpt"
            className={`${inputClass} min-h-20 resize-y`}
            value={adding.excerpt}
            onChange={(e) => patchAdding({ excerpt: e.target.value })}
            placeholder="A short line summarizing the mention…"
          />
        </Field>

        <Button type="button" size="lg" onClick={handleAdd} disabled={working}>
          {working ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Add media mention
        </Button>
      </section>

      {/* Existing list */}
      <section className="space-y-4">
        <SectionTitle>Existing media mentions</SectionTitle>
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">No media mentions yet.</p>
        )}
        <ul className="space-y-4">
          {items.map((it) => {
            const editing = editingId === it.id
            return (
              <li key={it.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                {editing ? (
                  <div className="space-y-4">
                    <Field label="Title" htmlFor={`e-title-${it.id}`}>
                      <input
                        id={`e-title-${it.id}`}
                        className={inputClass}
                        value={it.title}
                        onChange={(e) => patchItem(it.id, { title: e.target.value })}
                      />
                    </Field>
                    <Field label="Link" htmlFor={`e-link-${it.id}`}>
                      <input
                        id={`e-link-${it.id}`}
                        className={inputClass}
                        value={it.link}
                        onChange={(e) => patchItem(it.id, { link: e.target.value })}
                        inputMode="url"
                      />
                    </Field>
                    <Field label="Replace photo" hint="Leave empty to keep the current photo.">
                      <FileInput
                        id={`e-photo-${it.id}`}
                        accept="image/*"
                        fileName={it.photoFile?.name}
                        onChange={(file) => patchItem(it.id, { photoFile: file })}
                      />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Date" htmlFor={`e-date-${it.id}`}>
                        <input
                          id={`e-date-${it.id}`}
                          type="date"
                          className={inputClass}
                          value={it.date}
                          onChange={(e) => patchItem(it.id, { date: e.target.value })}
                        />
                      </Field>
                    </div>
                    <Field label="Excerpt" htmlFor={`e-excerpt-${it.id}`}>
                      <textarea
                        id={`e-excerpt-${it.id}`}
                        className={`${inputClass} min-h-20 resize-y`}
                        value={it.excerpt}
                        onChange={(e) => patchItem(it.id, { excerpt: e.target.value })}
                      />
                    </Field>
                    <div className="flex items-center gap-2">
                      <Button type="button" size="sm" onClick={() => handleSaveEdit(it.id)} disabled={working}>
                        {working ? <Loader2 className="size-3.5 animate-spin" /> : <CheckCircle2 className="size-3.5" />}
                        Save changes
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (editSnapshot) {
                            const snap = editSnapshot
                            setItems((prev) => prev.map((p) => (p.id === it.id ? snap : p)))
                          }
                          setEditSnapshot(null)
                          setEditingId(null)
                        }}
                        disabled={working}
                      >
                        <X className="size-3.5" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                      {it.photoUrl && (
                        <Image
                          src={it.photoUrl || '/placeholder.svg'}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium leading-snug text-foreground">{it.title}</h3>
                      <a
                        href={it.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-sm text-primary underline-offset-2 hover:underline"
                      >
                        <span className="truncate">{it.link}</span>
                        <ExternalLink className="size-3 shrink-0" />
                      </a>
                      {it.date && (
                        <p className="mt-1 text-xs text-muted-foreground">{it.date}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          setEditSnapshot(it)
                          setEditingId(it.id)
                          setPhase('idle')
                          setMessage('')
                        }}
                        aria-label={`Edit ${it.title}`}
                        disabled={working}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDelete(it.id)}
                        aria-label={`Delete ${it.title}`}
                        disabled={working}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      {/* Publish token + status */}
      <section className="space-y-5 border-t border-border pt-8">
        <SectionTitle>Publish</SectionTitle>
        <Field
          label="GitHub personal access token"
          htmlFor="m-token"
          hint="Same token used to add projects. Stored only in this browser."
        >
          <input
            id="m-token"
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
      </section>
    </div>
  )
}
