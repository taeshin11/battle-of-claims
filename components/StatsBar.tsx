interface Claim { status: string }

export default function StatsBar({ claims }: { claims: Claim[] }) {
  const total = claims.length
  const trueCount = claims.filter(c => c.status === 'true').length
  const falseCount = claims.filter(c => c.status === 'false').length
  const misleadingCount = claims.filter(c => c.status === 'misleading').length
  const unverifiedCount = claims.filter(c => c.status === 'unverified').length

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-4 text-white text-center shadow-lg">
        <div className="text-2xl font-bold">{total}</div>
        <div className="text-slate-300 text-xs mt-1">Total Claims</div>
      </div>
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white text-center shadow-lg shadow-red-500/25">
        <div className="text-2xl font-bold">{falseCount}</div>
        <div className="text-red-100 text-xs mt-1">Debunked False</div>
      </div>
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white text-center shadow-lg shadow-orange-500/25">
        <div className="text-2xl font-bold">{misleadingCount}</div>
        <div className="text-orange-100 text-xs mt-1">Misleading</div>
      </div>
      <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl p-4 text-white text-center shadow-lg">
        <div className="text-2xl font-bold">{unverifiedCount}</div>
        <div className="text-slate-200 text-xs mt-1">Unverified</div>
      </div>
    </div>
  )
}
