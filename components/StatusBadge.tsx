const statusStyles: Record<string, string> = {
  true: 'bg-green-100 text-green-800',
  false: 'bg-red-100 text-red-800',
  misleading: 'bg-orange-100 text-orange-800',
  unverified: 'bg-gray-100 text-gray-700',
}

const statusLabels: Record<string, string> = {
  true: 'True',
  false: 'False',
  misleading: 'Misleading',
  unverified: 'Unverified',
}

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] ?? 'bg-gray-100 text-gray-700'}`}>
      {statusLabels[status] ?? status}
    </span>
  )
}
