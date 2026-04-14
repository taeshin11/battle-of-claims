'use client'
import { useEffect, useState } from 'react'
export default function VisitorCounter() {
  const [c, setC] = useState({ today: 0, total: 0 })
  useEffect(() => {
    fetch('/api/visitor', { method: 'POST' }).then(r => r.json()).then(setC)
  }, [])
  return (
    <div className="text-xs text-gray-400 flex gap-3">
      <span>Today: <strong className="text-gray-600">{c.today.toLocaleString()}</strong></span>
      <span>Total: <strong className="text-gray-600">{c.total.toLocaleString()}</strong></span>
    </div>
  )
}
