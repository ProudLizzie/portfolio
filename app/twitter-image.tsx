import { ogSize, ogContentType, renderOgImage } from './shared-og'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Elizabeth Janicek — Mechanical Design Engineer, Robotics & Manufacturing'

export default function TwitterImage() {
  return renderOgImage()
}
