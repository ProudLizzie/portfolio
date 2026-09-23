import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f7f4ee',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 152,
            height: 152,
            borderRadius: 34,
            border: '7px solid #5d3152',
            color: '#5d3152',
            fontSize: 92,
            fontWeight: 700,
            fontFamily: 'Georgia, serif',
            letterSpacing: -4,
          }}
        >
          EJ
        </div>
      </div>
    ),
    { ...size },
  )
}
