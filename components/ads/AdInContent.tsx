'use client'
import { useEffect, useRef } from 'react'

export default function AdInContent() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return
    ref.current.dataset.loaded = '1'
    const s = document.createElement('script')
    s.src = 'https://pl29155374.profitablecpmratenetwork.com/35c181d5ea090057c0a8bd8da780cdde/invoke.js'
    s.async = true
    s.setAttribute('data-cfasync', 'false')
    ref.current.appendChild(s)
  }, [])
  return (
    <div className="w-full my-4">
      <div id="container-35c181d5ea090057c0a8bd8da780cdde" ref={ref} />
    </div>
  )
}
