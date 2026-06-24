import { useState } from 'react'

export function ImageWithFallback({ src, alt = '', className = '', fallback = '/placeholder.png' }) {
  const [ok, setOk] = useState(true)
  return (
    <img
      src={ok ? src : fallback}
      alt={alt}
      className={className}
      onError={() => setOk(false)}
    />
  )
}