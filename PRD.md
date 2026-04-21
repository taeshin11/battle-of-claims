# Battle of Claims — PRD

> **Short Title**: Tracking Viral Claims in Wartime
> **Tagline**: One place to check what's true, false, or still uncertain in wartime information warfare.
> **Last Updated**: 2026-04-14

---

## 1. Overview

Battle of Claims is a minimal Next.js fact-tracking dashboard that maintains a searchable, filterable table of viral claims circulating during active conflicts. Each entry shows the claim text, verification status (True / False / Unverified / Misleading), primary source, debunk URL, date, and conflict tag. The site targets fact-check enthusiasts, journalists, researchers, and citizens trying to navigate wartime information warfare.

### Target Users

| Segment | Need |
|---|---|
| General public | Quickly check whether a viral claim is verified |
| Journalists | Citable reference with sourced debunks |
| Researchers | Structured dataset of wartime misinformation |
| Educators | Teaching media literacy with real examples |
| OSINT community | Cross-reference with their own investigations |

### Traffic Keywords

- war misinformation tracker
- ukraine claims fact check
- war propaganda tracker
- conflict fact check
- wartime fake news list
- ukraine russia false claims
- war disinformation database
- viral war claims debunked

---

## 2. Tech Stack

| Layer | Choice | Cost |
|---|---|---|
| Framework | Next.js 14 (App Router) | Free |
| Styling | Tailwind CSS | Free |
| i18n | next-intl | Free |
| Table / Filter | Client-side React state (no library) | Free |
| Static Data | claims.json in /public/data | Free |
| Hosting | Vercel (free tier) | Free |
| Analytics / Counter | Google Sheets via webhook | Free |
| Ads | Adsterra | Revenue |
| Repo | GitHub + gh CLI | Free |

> Intentionally minimal code. No database, no server. Data updated by editing claims.json and pushing to Git.

---

## 3. Pages & Routes

```
/                          → Home: stats summary + recent claims table preview
/claims                    → Full searchable/filterable claims table
/claims/[slug]             → Single claim detail: full context, sources, debunk
/conflicts                 → Conflict tag index (ukraine, gaza, sudan, myanmar…)
/conflicts/[tag]           → Claims filtered to one conflict
/status/[status]           → Claims filtered by status (true/false/unverified/misleading)
/about                     → Methodology, source standards, contribution guide
/api/visit                 → POST: log visit to Google Sheets
/sitemap.xml
/robots.txt
```

---

## 4. Data Model

### `/public/data/claims.json`

```json
[
  {
    "slug": "russia-ukraine-snake-island-sunk",
    "date": "2022-02-25",
    "claim_text": "Ukrainian soldiers on Snake Island were all killed after refusing to surrender to a Russian warship.",
    "status": "misleading",
    "status_label": "Misleading",
    "source": "Russian Ministry of Defence (initial claim)",
    "source_url": "https://www.bbc.com/news/world-europe-60511118",
    "debunk_url": "https://www.bbc.com/news/world-europe-60511118",
    "debunk_summary": "The soldiers survived and were captured, not killed. Ukrainian president later confirmed they were alive.",
    "conflict_tag": "ukraine",
    "virality": "high",
    "tags": ["snake island", "ukraine", "russian misinformation"],
    "updated": "2022-03-01"
  },
  {
    "slug": "ukraine-ghost-of-kyiv",
    "date": "2022-02-25",
    "claim_text": "A Ukrainian pilot dubbed 'the Ghost of Kyiv' single-handedly shot down 40 Russian aircraft in the first days of the war.",
    "status": "false",
    "status_label": "False",
    "source": "Social media / viral posts",
    "source_url": "https://www.reuters.com/article/factcheck-ukraine-ghost",
    "debunk_url": "https://www.reuters.com/article/factcheck-ukraine-ghost",
    "debunk_summary": "The Ukrainian Air Force officially confirmed the Ghost of Kyiv is a legend, not a real person. Videos circulating were from video games.",
    "conflict_tag": "ukraine",
    "virality": "high",
    "tags": ["ghost of kyiv", "ukraine", "pilot myth"],
    "updated": "2022-04-30"
  },
  {
    "slug": "ukraine-bioweapon-labs-pentagon",
    "date": "2022-03-08",
    "claim_text": "The US operated biological weapons laboratories in Ukraine.",
    "status": "false",
    "status_label": "False",
    "source": "Russian state media (RT, TASS)",
    "source_url": "https://apnews.com/article/russia-ukraine-biological-weapon-fact-check",
    "debunk_url": "https://apnews.com/article/russia-ukraine-biological-weapon-fact-check",
    "debunk_summary": "The US funded Ukrainian public health labs to detect and contain disease outbreaks — standard WHO-aligned work. No weapons programs found.",
    "conflict_tag": "ukraine",
    "virality": "high",
    "tags": ["bioweapons", "ukraine", "russia disinformation"],
    "updated": "2022-03-15"
  },
  {
    "slug": "hamas-beheaded-babies-oct7",
    "date": "2023-10-09",
    "claim_text": "Hamas beheaded 40 babies during the October 7 attack on Israel.",
    "status": "unverified",
    "status_label": "Unverified",
    "source": "Israeli officials (initial report)",
    "source_url": "https://www.cnn.com/2023/10/11/middleeast/israel-hamas-babies-beheaded-claim/index.html",
    "debunk_url": "https://www.cnn.com/2023/10/11/middleeast/israel-hamas-babies-beheaded-claim/index.html",
    "debunk_summary": "CNN and multiple outlets reported the Israeli government could not confirm the 40 beheaded babies figure. Atrocities did occur, but the specific claim remains unverified by independent journalists.",
    "conflict_tag": "gaza",
    "virality": "high",
    "tags": ["october 7", "hamas", "israel", "atrocity claims"],
    "updated": "2023-10-12"
  },
  {
    "slug": "ukraine-shelled-own-city-mariupol",
    "date": "2022-03-02",
    "claim_text": "Ukraine shelled its own city of Mariupol.",
    "status": "false",
    "status_label": "False",
    "source": "Russian Ministry of Defence",
    "source_url": "https://www.snopes.com/fact-check/ukraine-shelling-mariupol/",
    "debunk_url": "https://www.snopes.com/fact-check/ukraine-shelling-mariupol/",
    "debunk_summary": "Satellite imagery and eyewitness accounts confirm Russian forces were responsible for the shelling of Mariupol. The claim was debunked by Snopes, Bellingcat, and multiple verification organizations.",
    "conflict_tag": "ukraine",
    "virality": "medium",
    "tags": ["mariupol", "ukraine", "shelling"],
    "updated": "2022-03-10"
  }
]
```

---

## 5. Component Architecture

```
src/
  app/
    [locale]/
      page.tsx                     ← Home: stats + recent claims preview
      claims/
        page.tsx                   ← Full claims table (SSG)
        [slug]/page.tsx            ← Claim detail
      conflicts/
        page.tsx                   ← Conflict tag index
        [tag]/page.tsx             ← Claims by conflict
      status/[status]/page.tsx     ← Claims by status
      about/page.tsx
    api/
      visit/route.ts
  components/
    ClaimsTable.tsx                ← Searchable, filterable, sortable
    ClaimsTableRow.tsx
    ClaimDetail.tsx
    StatusBadge.tsx
    ViralityBadge.tsx
    ConflictTagBadge.tsx
    ClaimsStats.tsx                ← Summary counts: X false, Y unverified…
    SearchBar.tsx
    FilterBar.tsx                  ← Status filter + conflict filter
    AdBanner.tsx
    AdSidebar.tsx
    AdInContent.tsx
    AdMobileSticky.tsx
    VisitorCounter.tsx
    Header.tsx
    Footer.tsx
    LanguageSwitcher.tsx
  lib/
    sheets.ts
    claims.ts                      ← Filter, sort, group helpers
  messages/
    en.json  ko.json  ja.json  zh.json  es.json  fr.json  de.json  pt.json
  middleware.ts
```

---

## 6. Key Code Snippets

### `src/components/StatusBadge.tsx`

```tsx
interface StatusBadgeProps {
  status: string;
  label: string;
}

const statusStyles: Record<string, string> = {
  true:        "bg-green-100 text-green-800 border border-green-300",
  false:       "bg-red-100 text-red-800 border border-red-300",
  unverified:  "bg-slate-100 text-slate-700 border border-slate-300",
  misleading:  "bg-amber-100 text-amber-800 border border-amber-300",
};

const statusIcons: Record<string, string> = {
  true: "✓",
  false: "✗",
  unverified: "?",
  misleading: "~",
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const style = statusStyles[status] ?? statusStyles.unverified;
  const icon = statusIcons[status] ?? "?";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${style}`}>
      <span>{icon}</span>
      {label}
    </span>
  );
}
```

### `src/components/ClaimsTable.tsx`

```tsx
"use client";
import { useState, useMemo } from "react";
import claimsData from "@/public/data/claims.json";
import ClaimsTableRow from "./ClaimsTableRow";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

type Claim = (typeof claimsData)[0];

export default function ClaimsTable({ initialClaims = claimsData }: { initialClaims?: Claim[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [conflictFilter, setConflictFilter] = useState("all");
  const [sort, setSort] = useState<"date" | "virality">("date");

  const conflicts = [...new Set(initialClaims.map((c) => c.conflict_tag))];
  const statuses = ["all", "true", "false", "unverified", "misleading"];

  const filtered = useMemo(() => {
    return initialClaims
      .filter((c) => {
        const matchSearch =
          !search ||
          c.claim_text.toLowerCase().includes(search.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        const matchStatus = statusFilter === "all" || c.status === statusFilter;
        const matchConflict = conflictFilter === "all" || c.conflict_tag === conflictFilter;
        return matchSearch && matchStatus && matchConflict;
      })
      .sort((a, b) => {
        if (sort === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
        const viralityScore = { high: 3, medium: 2, low: 1 };
        return (viralityScore[b.virality as keyof typeof viralityScore] ?? 0) -
               (viralityScore[a.virality as keyof typeof viralityScore] ?? 0);
      });
  }, [search, statusFilter, conflictFilter, sort, initialClaims]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search claims, tags…" />
        <FilterBar
          statuses={statuses}
          conflicts={["all", ...conflicts]}
          statusFilter={statusFilter}
          conflictFilter={conflictFilter}
          onStatusChange={setStatusFilter}
          onConflictChange={setConflictFilter}
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-500">{filtered.length} claims found</span>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setSort("date")}
            className={`px-3 py-1 rounded-lg border ${sort === "date" ? "bg-blue-50 border-blue-300 text-blue-700" : "border-slate-200 text-slate-600"}`}
          >
            Newest First
          </button>
          <button
            onClick={() => setSort("virality")}
            className={`px-3 py-1 rounded-lg border ${sort === "virality" ? "bg-blue-50 border-blue-300 text-blue-700" : "border-slate-200 text-slate-600"}`}
          >
            Most Viral
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 w-24">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Claim</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 w-36">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 w-32">Conflict</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 w-20">Source</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((claim, i) => (
              <ClaimsTableRow key={claim.slug} claim={claim} isEven={i % 2 === 0} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-400 text-sm">
                  No claims match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((claim) => (
          <div key={claim.slug} className="bg-neutral-50 rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <time className="text-xs text-slate-400 font-mono">{claim.date}</time>
              <StatusBadge status={claim.status} label={claim.status_label} />
            </div>
            <p className="text-sm text-slate-800 font-medium line-clamp-3 mb-2">{claim.claim_text}</p>
            <a href={`/claims/${claim.slug}`} className="text-xs text-blue-600 hover:underline">View full analysis →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

// Import StatusBadge for mobile cards
import StatusBadge from "./StatusBadge";
```

### `src/components/ClaimsTableRow.tsx`

```tsx
import Link from "next/link";
import StatusBadge from "./StatusBadge";
import ConflictTagBadge from "./ConflictTagBadge";

type Claim = {
  slug: string;
  date: string;
  claim_text: string;
  status: string;
  status_label: string;
  source: string;
  source_url: string;
  debunk_url: string;
  conflict_tag: string;
};

export default function ClaimsTableRow({ claim, isEven }: { claim: Claim; isEven: boolean }) {
  return (
    <tr className={`border-b border-slate-100 hover:bg-blue-50/30 transition-colors ${isEven ? "bg-white" : "bg-slate-50/50"}`}>
      <td className="px-4 py-3 text-xs text-slate-500 font-mono whitespace-nowrap">{claim.date}</td>
      <td className="px-4 py-3">
        <Link href={`/claims/${claim.slug}`} className="text-slate-800 hover:text-blue-700 font-medium text-sm line-clamp-2 transition-colors">
          {claim.claim_text}
        </Link>
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={claim.status} label={claim.status_label} />
      </td>
      <td className="px-4 py-3">
        <ConflictTagBadge tag={claim.conflict_tag} />
      </td>
      <td className="px-4 py-3">
        <a href={claim.source_url} target="_blank" rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline">
          Source →
        </a>
      </td>
    </tr>
  );
}
```

### `src/components/ClaimDetail.tsx`

```tsx
import StatusBadge from "./StatusBadge";
import ConflictTagBadge from "./ConflictTagBadge";
import ViralityBadge from "./ViralityBadge";

type Claim = {
  slug: string;
  date: string;
  claim_text: string;
  status: string;
  status_label: string;
  source: string;
  source_url: string;
  debunk_url: string;
  debunk_summary: string;
  conflict_tag: string;
  virality: string;
  tags: string[];
  updated: string;
};

export default function ClaimDetail({ claim }: { claim: Claim }) {
  return (
    <article className="max-w-2xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <StatusBadge status={claim.status} label={claim.status_label} />
        <ConflictTagBadge tag={claim.conflict_tag} />
        <ViralityBadge level={claim.virality} />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">The Claim</h2>
        <blockquote className="text-lg text-slate-800 font-medium leading-relaxed border-l-4 border-red-400 pl-4">
          "{claim.claim_text}"
        </blockquote>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <span>Claimed by:</span>
          <a href={claim.source_url} target="_blank" rel="noopener noreferrer"
            className="text-blue-600 hover:underline">{claim.source}</a>
          <span>|</span>
          <time>{claim.date}</time>
        </div>
      </div>

      <div className="bg-gray-50 border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Verdict & Analysis</h2>
        <p className="text-slate-700 leading-relaxed">{claim.debunk_summary}</p>
        <a href={claim.debunk_url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-4 text-sm text-blue-600 hover:underline font-medium">
          Read full debunk / source →
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {claim.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      <p className="text-xs text-slate-400">Last updated: {claim.updated}</p>
    </article>
  );
}
```

### `src/components/ClaimsStats.tsx`

```tsx
import claimsData from "@/public/data/claims.json";

export default function ClaimsStats() {
  const total = claimsData.length;
  const counts = claimsData.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    { label: "Total Claims", value: total, color: "text-slate-800" },
    { label: "False", value: counts.false ?? 0, color: "text-red-600" },
    { label: "Misleading", value: counts.misleading ?? 0, color: "text-amber-600" },
    { label: "Unverified", value: counts.unverified ?? 0, color: "text-slate-500" },
    { label: "True", value: counts.true ?? 0, color: "text-green-600" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="bg-neutral-50 rounded-xl border border-slate-200 p-4 text-center shadow-sm">
          <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          <div className="text-xs text-slate-500 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
```

### `src/components/SearchBar.tsx`

```tsx
"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search…" }: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
    </div>
  );
}
```

### `src/components/FilterBar.tsx`

```tsx
"use client";

interface FilterBarProps {
  statuses: string[];
  conflicts: string[];
  statusFilter: string;
  conflictFilter: string;
  onStatusChange: (v: string) => void;
  onConflictChange: (v: string) => void;
}

export default function FilterBar({
  statuses, conflicts, statusFilter, conflictFilter, onStatusChange, onConflictChange
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>{s === "all" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>
      <select
        value={conflictFilter}
        onChange={(e) => onConflictChange(e.target.value)}
        className="px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
      >
        {conflicts.map((c) => (
          <option key={c} value={c}>{c === "all" ? "All Conflicts" : c.charAt(0).toUpperCase() + c.slice(1)}</option>
        ))}
      </select>
    </div>
  );
}
```

### `src/lib/claims.ts`

```ts
import claimsData from "@/public/data/claims.json";

type Claim = (typeof claimsData)[0];

export function getAllClaims(): Claim[] {
  return claimsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getClaimBySlug(slug: string): Claim | undefined {
  return claimsData.find((c) => c.slug === slug);
}

export function getClaimsByStatus(status: string): Claim[] {
  return claimsData.filter((c) => c.status === status);
}

export function getClaimsByConflict(tag: string): Claim[] {
  return claimsData.filter((c) => c.conflict_tag === tag);
}

export function getAllConflictTags(): string[] {
  return [...new Set(claimsData.map((c) => c.conflict_tag))];
}

export function getClaimsStats() {
  const total = claimsData.length;
  const false_count = claimsData.filter((c) => c.status === "false").length;
  const misleading_count = claimsData.filter((c) => c.status === "misleading").length;
  const unverified_count = claimsData.filter((c) => c.status === "unverified").length;
  const true_count = claimsData.filter((c) => c.status === "true").length;
  return { total, false_count, misleading_count, unverified_count, true_count };
}
```

---

## 7. Ads Integration (Adsterra)

### Placement Strategy

| Slot | Component | Position |
|---|---|---|
| Header Banner | `AdBanner` | Below nav — 728x90 desktop / 320x50 mobile |
| Sidebar | `AdSidebar` | Right of claims table on desktop |
| In-Content | `AdInContent` | After stat summary cards, before table |
| Mobile Sticky | `AdMobileSticky` | Fixed bottom, mobile only |

### `src/components/AdBanner.tsx`

```tsx
"use client";
import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    s.src = "//pl00000000.profitablegatecpm.com/YOURHASH/invoke.js";
    document.getElementById("atBannerClaims")?.appendChild(s);
  }, []);
  return <div id="atBannerClaims" className="w-full flex justify-center my-3 min-h-[50px] bg-gray-50" />;
}
```

---

## 8. SEO Strategy

### `generateMetadata` — Claim Detail

```tsx
import { Metadata } from "next";
import { getClaimBySlug } from "@/lib/claims";

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const claim = getClaimBySlug(params.slug);
  if (!claim) return {};
  return {
    title: `${claim.claim_text.slice(0, 60)}… — Battle of Claims`,
    description: `Status: ${claim.status_label}. ${claim.debunk_summary?.slice(0, 140)}`,
    keywords: [
      "war fact check", `${claim.conflict_tag} misinformation`,
      "war claims tracker", "propaganda debunk", ...claim.tags,
    ],
    openGraph: {
      title: `[${claim.status_label.toUpperCase()}] ${claim.claim_text.slice(0, 60)}…`,
      description: claim.debunk_summary,
      type: "article",
      publishedTime: claim.date,
      modifiedTime: claim.updated,
    },
    alternates: {
      languages: Object.fromEntries(
        ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"].map((l) => [l, `/${l}/claims/${params.slug}`])
      ),
    },
  };
}
```

### Structured Data — ClaimReview Schema

This is specifically designed for wartime fact-checking — Google supports rich results for ClaimReview:

```tsx
// In /app/[locale]/claims/[slug]/page.tsx
function buildClaimReviewSchema(claim: typeof claimsData[0]) {
  const ratingMap = { true: 5, misleading: 2, false: 1, unverified: 3 };
  return {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    url: `https://battleofclaims.com/claims/${claim.slug}`,
    claimReviewed: claim.claim_text,
    datePublished: claim.date,
    author: { "@type": "Organization", name: "Battle of Claims" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: ratingMap[claim.status as keyof typeof ratingMap] ?? 3,
      bestRating: 5,
      worstRating: 1,
      alternateName: claim.status_label,
    },
    itemReviewed: {
      "@type": "Claim",
      appearance: { "@type": "CreativeWork", url: claim.source_url, author: { "@type": "Organization", name: claim.source } },
    },
  };
}
```

> Note: `ClaimReview` structured data can earn Google rich result snippets — high SEO value for fact-check sites.

---

## 9. i18n Setup

### `src/messages/en.json`

```json
{
  "nav": {
    "home": "Home",
    "claims": "All Claims",
    "conflicts": "By Conflict",
    "about": "About"
  },
  "home": {
    "hero_title": "Battle of Claims",
    "hero_subtitle": "A tracker of viral wartime claims — verified, debunked, or still uncertain.",
    "stats_heading": "Database Overview",
    "recent_heading": "Recent Claims"
  },
  "status": {
    "true": "True",
    "false": "False",
    "unverified": "Unverified",
    "misleading": "Misleading"
  },
  "claims": {
    "date": "Date",
    "claim": "Claim",
    "status": "Status",
    "conflict": "Conflict",
    "source": "Source",
    "read_more": "View Analysis →",
    "no_results": "No claims match your search.",
    "search_placeholder": "Search claims, tags…"
  },
  "claim_detail": {
    "the_claim": "The Claim",
    "verdict": "Verdict & Analysis",
    "full_source": "Read full source →",
    "claimed_by": "Claimed by",
    "last_updated": "Last updated"
  },
  "footer": {
    "today": "Today",
    "total": "Total Visitors",
    "disclaimer": "All verdicts based on published fact-checks. See individual sources for methodology."
  }
}
```

---

## 10. Google Sheets Webhook

Standard pattern. Additionally, log claim detail page views with the claim slug for popularity tracking:

```ts
// In middleware.ts — enhanced payload for claim pages
const claimSlug = req.nextUrl.pathname.match(/\/claims\/([^/]+)/)?.[1];
fetch(`${req.nextUrl.origin}/api/visit`, {
  method: "POST",
  body: JSON.stringify({
    path: req.nextUrl.pathname,
    locale: ...,
    claim_slug: claimSlug ?? null,   // extra field
  }),
});
```

Google Apps Script: Add `data.claim_slug` as column F in the visits sheet.

---

## 11. Milestones & Git Push Points

### Milestone 0 — Repo Bootstrap

```bash
cd /c/MakingApps/260414/battle-of-claims
gh repo create battle-of-claims --public --source=. --push
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir
npm install next-intl @heroicons/react
mkdir -p research_history public/data src/components src/lib src/messages
git add -A && git commit -m "M0: bootstrap — Next.js, Tailwind, next-intl" && git push
```

**research_history/M0.md**: ClaimReview schema research, existing fact-check sites survey.

---

### Milestone 1 — Data Layer

```bash
# Create public/data/claims.json (min 10 entries)
# Create src/lib/claims.ts helpers
# Create /api/visit/route.ts
git add -A && git commit -m "M1: data — claims.json (10+ entries), lib helpers" && git push
```

**research_history/M1.md**: Claims sourced from AP, Reuters, BBC Verify, Snopes, Bellingcat.

---

### Milestone 2 — Components

```bash
# Build StatusBadge, ViralityBadge, ConflictTagBadge
# Build ClaimsTable with search/filter/sort
# Build ClaimDetail, ClaimsStats
# Build SearchBar, FilterBar
# Build Ad stubs, VisitorCounter, Header, Footer
git add -A && git commit -m "M2: components — claims table, detail, badges, filters" && git push
```

**research_history/M2.md**: Client-side filter performance test, mobile card layout decisions.

---

### Milestone 3 — Pages & i18n

```bash
# All pages under app/[locale]/
# 8 messages/*.json
# middleware.ts with claim_slug tracking
git add -A && git commit -m "M3: pages + i18n — 8 locales, claim detail, conflict pages" && git push
```

**research_history/M3.md**: SSG vs SSR decision (SSG + revalidate=3600).

---

### Milestone 4 — SEO (ClaimReview Priority)

```bash
# generateMetadata + ClaimReview JSON-LD on every claim page
# FAQ schema on home
# sitemap.ts
# robots.txt
git add -A && git commit -m "M4: SEO — ClaimReview schema, sitemap, metadata" && git push
```

**research_history/M4.md**: Google Rich Results test output for ClaimReview, submission to fact-check aggregators.

---

### Milestone 5 — Production Launch

```bash
vercel --prod
# Set GOOGLE_SHEETS_WEBHOOK_URL
git add -A && git commit -m "M5: production launch" && git push
```

**research_history/M5.md**: URL, Lighthouse scores, submit to Duke Reporters' Lab fact-checker index.

---

## 12. Agent Team

| Agent | Responsibilities |
|---|---|
| **Frontend Agent** | ClaimsTable, ClaimDetail, StatusBadge, search/filter UI, mobile cards |
| **Backend/Data Agent** | claims.json population, lib/claims.ts helpers, /api/visit, claim_slug tracking |
| **SEO/Content Agent** | ClaimReview JSON-LD, generateMetadata, sitemap, FAQ schema, i18n files |
| **QA Agent** | Filter edge cases, mobile card layout, ClaimReview structured data test, Lighthouse ≥ 90 |

---

## 13. Harness Files

### `feature_list.json`

```json
{
  "project": "battle-of-claims",
  "features": [
    { "id": "F01", "name": "Claims JSON with 20+ entries across conflicts", "status": "pending" },
    { "id": "F02", "name": "Searchable + filterable claims table", "status": "pending" },
    { "id": "F03", "name": "Claim detail page with full analysis", "status": "pending" },
    { "id": "F04", "name": "StatusBadge (True/False/Unverified/Misleading)", "status": "pending" },
    { "id": "F05", "name": "By-conflict index pages", "status": "pending" },
    { "id": "F06", "name": "By-status filter pages", "status": "pending" },
    { "id": "F07", "name": "ClaimsStats summary component", "status": "pending" },
    { "id": "F08", "name": "ClaimReview structured data on every claim", "status": "pending" },
    { "id": "F09", "name": "Google Sheets visitor + claim view counter", "status": "pending" },
    { "id": "F10", "name": "Adsterra 4-slot ad integration", "status": "pending" },
    { "id": "F11", "name": "8-locale i18n with next-intl", "status": "pending" },
    { "id": "F12", "name": "SEO: sitemap + metadata + FAQ schema", "status": "pending" }
  ]
}
```

### `claude-progress.txt`

```
[2026-04-14] M0 complete — repo bootstrapped
[pending] M1 — data layer
[pending] M2 — components
[pending] M3 — pages + i18n
[pending] M4 — SEO (ClaimReview priority)
[pending] M5 — launch
```

### Session Startup Prompt

```
You are the Frontend Agent for battle-of-claims.
Read feature_list.json and claude-progress.txt for current state.
Read research_history/ for context.
Build the next pending feature per PRD.md.
Priority: ClaimReview structured data is high SEO value — do not skip.
Commit: git add -A && git commit -m "[M#]: [description]" && git push
```

---

## 14. Cost Analysis

| Item | Cost |
|---|---|
| Vercel Hobby | $0/mo |
| Static JSON data | $0 (no external API) |
| Google Sheets webhook | $0 |
| GitHub | $0 |
| Adsterra | Revenue share |
| Domain (optional) | ~$10/yr |
| **Total** | **$0–$10/yr** |

---

## 15. Launch Checklist

- [ ] `gh repo create` complete
- [ ] `vercel --prod` deployed
- [ ] GOOGLE_SHEETS_WEBHOOK_URL env var set
- [ ] claims.json has 20+ entries across at least 3 conflicts
- [ ] Search, status filter, and conflict filter all working
- [ ] ClaimReview JSON-LD present on every /claims/[slug] page
- [ ] Google Rich Results Test shows ClaimReview eligible
- [ ] All 8 locales rendering correctly
- [ ] 4 Adsterra ad slots in place
- [ ] sitemap.xml accessible
- [ ] robots.txt accessible
- [ ] Lighthouse Performance ≥ 90 mobile
- [ ] Submit to Duke Reporters' Lab fact-checker index
- [ ] research_history/ through M5 populated
- [ ] feature_list.json all "done"
