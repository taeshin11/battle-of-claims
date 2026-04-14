import { NextResponse } from 'next/server'
export const runtime = 'edge'
let total = 0, today = 0, lastDate = ''
export async function GET() {
  return NextResponse.json({ total, today })
}
export async function POST() {
  const d = new Date().toDateString()
  if (d !== lastDate) { today = 0; lastDate = d }
  total++; today++
  return NextResponse.json({ total, today })
}
