'use client'
import { useState, useMemo } from 'react'
import StatusBadge from './StatusBadge'
import Link from 'next/link'

interface Claim {
  id: string
  date: string
  conflict: string
  claim: string
  status: string
  source: string
  source_url: string
  summary: string
}

interface Props {
  claims: Claim[]
  locale: string
}

const CONFLICTS = ['ukraine-russia', 'israel-hamas', 'sudan', 'myanmar']

export default function ClaimsTable({ claims, locale }: Props) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [conflictFilter, setConflictFilter] = useState('all')

  const filtered = useMemo(() => {
    return claims.filter(c => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false
      if (conflictFilter !== 'all' && c.conflict !== conflictFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return c.claim.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.conflict.includes(q)
      }
      return true
    })
  }, [claims, search, statusFilter, conflictFilter])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search claims..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="true">True</option>
          <option value="false">False</option>
          <option value="misleading">Misleading</option>
          <option value="unverified">Unverified</option>
        </select>
        <select
          value={conflictFilter}
          onChange={e => setConflictFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
        >
          <option value="all">All Conflicts</option>
          {CONFLICTS.map(c => <option key={c} value={c}>{c.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}
        </select>
      </div>

      <p className="text-sm text-gray-500 mb-3">{filtered.length} claims found</p>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left w-24">Date</th>
                <th className="px-4 py-3 text-left">Claim</th>
                <th className="px-4 py-3 text-left w-28">Status</th>
                <th className="px-4 py-3 text-left w-32">Conflict</th>
                <th className="px-4 py-3 text-left w-32">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(claim => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{claim.date}</td>
                  <td className="px-4 py-3">
                    <Link href={`/${locale}/claim/${claim.id}`} className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2">
                      {claim.claim}
                    </Link>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={claim.status} /></td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    <Link href={`/${locale}/conflict/${claim.conflict}`} className="hover:text-blue-600">
                      {claim.conflict.replace('-', ' ')}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <a href={claim.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                      {claim.source}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
