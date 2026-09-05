// Client-side helpers for publishing a new project straight to the GitHub repo
// that backs this site. Everything here runs in the browser: the visitor
// supplies a personal access token (kept only in their browser), we upload any
// selected assets into /public via the GitHub contents API, then commit an
// updated lib/portfolio-data.ts with the new project object appended.
//
// No token is ever hardcoded or persisted server-side.

import type { Project } from '@/lib/portfolio-data'

const OWNER = 'ProudLizzie'
const REPO = 'portfolio'
const BRANCH = 'main'
const DATA_PATH = 'lib/portfolio-data.ts'
const PROJECTS_ANCHOR = 'export const projects: Project[] = ['

const TOKEN_KEY = 'portfolio-admin-gh-token'

export function getStoredToken(): string {
  if (typeof window === 'undefined') return ''
  try {
    return window.localStorage.getItem(TOKEN_KEY) ?? ''
  } catch {
    return ''
  }
}

export function setStoredToken(token: string) {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token)
    else window.localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore storage failures (private mode, etc.) */
  }
}

/* ------------------------------------------------------------------ */
/* Encoding helpers                                                    */
/* ------------------------------------------------------------------ */

function base64ToUtf8(b64: string): string {
  const binary = atob(b64.replace(/\s/g, ''))
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary)
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1] ?? '')
    }
    reader.onerror = () => reject(new Error(`Could not read file "${file.name}".`))
    reader.readAsDataURL(file)
  })
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function assetFileName(slug: string, file: File): string {
  const dot = file.name.lastIndexOf('.')
  const ext = dot > -1 ? file.name.slice(dot + 1).toLowerCase() : ''
  const base =
    (dot > -1 ? file.name.slice(0, dot) : file.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'file'
  const unique = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
  return `${slug || 'project'}-${base}-${unique}${ext ? `.${ext}` : ''}`
}

function encodePath(path: string): string {
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

/* ------------------------------------------------------------------ */
/* GitHub API                                                          */
/* ------------------------------------------------------------------ */

async function ghFetch(path: string, token: string, init?: RequestInit) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  if (!res.ok) {
    let detail = ''
    try {
      const body = await res.json()
      if (body?.message) detail = `: ${body.message}`
    } catch {
      /* ignore */
    }
    if (res.status === 401) {
      throw new Error('GitHub rejected the token (401). Check that it is valid and not expired.')
    }
    if (res.status === 404) {
      throw new Error(
        'GitHub returned 404. The token likely lacks "Contents: read and write" access to this repository.',
      )
    }
    throw new Error(`GitHub API error ${res.status}${detail}`)
  }

  return res.json()
}

async function putFile(
  token: string,
  path: string,
  base64Content: string,
  message: string,
  sha?: string,
) {
  return ghFetch(`/repos/${OWNER}/${REPO}/contents/${encodePath(path)}`, token, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: base64Content,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  })
}

// Uploads a binary asset into /public/<folder> and returns the site-relative
// path (e.g. "/images/foo.png") to reference from the project data.
export async function uploadAsset(
  token: string,
  file: File,
  folder: 'images' | 'pdfs',
  slug: string,
): Promise<string> {
  const name = assetFileName(slug, file)
  const repoPath = `public/${folder}/${name}`
  const base64 = await fileToBase64(file)
  await putFile(token, repoPath, base64, `Add asset ${name} via admin`)
  return `/${folder}/${name}`
}

async function getDataFile(token: string): Promise<{ content: string; sha: string }> {
  const json = await ghFetch(
    `/repos/${OWNER}/${REPO}/contents/${encodePath(DATA_PATH)}?ref=${BRANCH}`,
    token,
    { method: 'GET' },
  )
  return { content: base64ToUtf8(json.content), sha: json.sha }
}

/* ------------------------------------------------------------------ */
/* Serialization                                                       */
/* ------------------------------------------------------------------ */

function pad(depth: number): string {
  return '  '.repeat(depth)
}

// Serializes a plain value into TypeScript source that matches the data file.
// Strings go through JSON.stringify so arbitrary user text (quotes, newlines,
// unicode) is always escaped correctly.
function serializeValue(value: unknown, depth: number): string {
  if (value === null || value === undefined) return 'undefined'

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    const items = value
      .map((item) => pad(depth + 1) + serializeValue(item, depth + 1))
      .join(',\n')
    return `[\n${items},\n${pad(depth)}]`
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    const items = entries
      .map(([key, val]) => `${pad(depth + 1)}${key}: ${serializeValue(val, depth + 1)}`)
      .join(',\n')
    return `{\n${items},\n${pad(depth)}}`
  }

  if (typeof value === 'string') return JSON.stringify(value)

  return String(value)
}

// Produces the source for a single array element indented to sit at the top of
// the `projects` array (one indent level, trailing comma included).
function serializeProject(project: Project): string {
  return `${pad(1)}${serializeValue(project, 1)},`
}

// Fetches the data file, inserts the new project at the top of the projects
// array, and commits the result. Returns the commit's html_url.
export async function commitNewProject(token: string, project: Project): Promise<string> {
  const { content, sha } = await getDataFile(token)

  const idx = content.indexOf(PROJECTS_ANCHOR)
  if (idx === -1) {
    throw new Error('Could not locate the projects array in the data file. It may have changed.')
  }

  const insertAt = idx + PROJECTS_ANCHOR.length
  const updated =
    content.slice(0, insertAt) + '\n' + serializeProject(project) + content.slice(insertAt)

  const result = await putFile(
    token,
    DATA_PATH,
    utf8ToBase64(updated),
    `Add project: ${project.title} via admin`,
    sha,
  )

  return result?.commit?.html_url ?? ''
}
