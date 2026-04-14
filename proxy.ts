import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export function proxy(request: NextRequest) {
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (sheetsUrl && !request.nextUrl.pathname.startsWith('/api')) {
    fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        page: request.nextUrl.pathname,
        country: (request as any).geo?.country ?? 'unknown',
        referrer: request.headers.get('referer') ?? '',
      }),
    }).catch(() => {})
  }
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
