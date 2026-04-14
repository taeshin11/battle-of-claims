interface Claim { status: string }

export default function StatsBar({ claims }: { claims: Claim[] }) {
  const total = claims.length
  const trueCount = claims.filter(c => c.status === 'true').length
  const falseCount = claims.filter(c => c.status === 'false').length
  const misleadingCount = claims.filter(c => c.status === 'misleading').length
  const unverifiedCount = claims.filter(c => c.status === 'unverified').length

  const stats = [
    { label: 'Total Claims', value: total, color: 'bg-gray-50 border-gray-200 text-gray-800' },
    { label: 'Verified True', value: trueCount, color: 'bg-green-50 border-green-200 text-green-800' },
    { label: 'Debunked False', value: falseCount, color: 'bg-red-50 border-red-200 text-red-800' },
    { label: 'Misleading', value: misleadingCount, color: 'bg-orange-50 border-orange-200 text-orange-800' },
    { label: 'Unverified', value: unverifiedCount, color: 'bg-gray-50 border-gray-200 text-gray-700' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
      {stats.map(s => (
        <div key={s.label} className={`rounded-lg border p-4 ${s.color}`}>
          <div className="text-2xl font-bold">{s.value}</div>
          <div className="text-xs mt-1 opacity-70">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
