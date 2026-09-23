import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

async function loadGoogleFont(font: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    font,
  )}:wght@${weight}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)
  if (resource) {
    const res = await fetch(resource[1])
    if (res.status === 200) return res.arrayBuffer()
  }
  throw new Error(`failed to load font ${font}`)
}

const NAME = 'Elizabeth Janicek'
const TAGLINE = 'Mechanical Design Engineer — Robotics & Manufacturing'
const KICKER = 'PORTFOLIO'

export async function renderOgImage() {
  const [playfair, inter] = await Promise.all([
    loadGoogleFont('Playfair Display', 700, NAME),
    loadGoogleFont('Inter', 500, TAGLINE + KICKER),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#f7f4ee',
          padding: '96px 100px',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 10,
            color: '#5d3152',
            fontWeight: 500,
          }}
        >
          {KICKER}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 128,
            lineHeight: 1.02,
            fontFamily: 'Playfair Display',
            fontWeight: 700,
            color: '#322b34',
            letterSpacing: -2,
          }}
        >
          {NAME}
        </div>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div style={{ width: 72, height: 5, background: '#5d3152', borderRadius: 4 }} />
          <div style={{ fontSize: 38, color: '#5f5563', fontWeight: 500 }}>{TAGLINE}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Playfair Display', data: playfair, style: 'normal', weight: 700 },
        { name: 'Inter', data: inter, style: 'normal', weight: 500 },
      ],
    },
  )
}
