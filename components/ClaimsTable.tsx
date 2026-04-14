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
          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Statuses</option>
          <option value="true">Verified True</option>
          <option value="false">False</option>
          <option value="misleading">Misleading</option>
          <option value="unverified">Unverified</option>
        </select>
        <select
          value={conflictFilter}
          onChange={e => setConflictFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Conflicts</option>
          {CONFLICTS.map(c => <option key={c} value={c}>{c.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}
        </select>
      </div>

      <p className="text-sm text-slate-500 mb-3"><span className="font-semibold text-slate-700">{filtered.length}</span> claims found</p>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Claim</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Conflict</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(claim => (
                <tr key={claim.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap text-xs">{claim.date}</td>
                  <td className="px-4 py-3.5">
                    <Link href={`/${locale}/claim/${claim.id}`} className="font-medium text-slate-800 hover:text-purple-600 transition-colors line-clamp-2">
                      {claim.claim}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge status={claim.status} /></td>
                  <td className="px-4 py-3.5 text-xs">
                    <Link href={`/${locale}/conflict/${claim.conflict}`} className="text-slate-500 hover:text-purple-600 transition-colors capitalize">
                      {claim.conflict.replace('-', ' ')}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5">
                    <a href={claim.source_url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 text-xs font-medium transition-colors">
                      {claim.source} ↗
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
