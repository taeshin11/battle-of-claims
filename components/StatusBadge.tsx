const statusStyles: Record<string, string> = {
  true: 'bg-green-500/10 text-green-600 ring-1 ring-green-500/20',
  false: 'bg-red-500/10 text-red-600 ring-1 ring-red-500/20',
  misleading: 'bg-orange-500/10 text-orange-600 ring-1 ring-orange-500/20',
  unverified: 'bg-slate-500/10 text-slate-600 ring-1 ring-slate-500/20',
}

const statusLabels: Record<string, string> = {
  true: 'Verified True',
  false: 'False',
  misleading: 'Misleading',
  unverified: 'Unverified',
}

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[status] ?? 'bg-slate-100 text-slate-700'}`}>
      {statusLabels[status] ?? status}
    </span>
  )
}
