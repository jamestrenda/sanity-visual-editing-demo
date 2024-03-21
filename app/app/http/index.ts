import { redirect } from '@remix-run/node'
import { handleRedirects } from './redirects'

export const CACHE_CONTROL = {
  /**
   * Keep it in the browser (and CDN) for 5 minutes so when they click
   * back/forward/etc.  It's super fast, swr for 1 week on CDN so it stays fast
   * but people get typos fixes and stuff, too.
   */
  doc: 'max-age=300, stale-while-revalidate=604800',
}

export async function middleware(request: Request): Promise<void> {
  await ensureSecure(request)
  await removeTrailingSlashes(request)
  await handleRedirects(request)
}

export async function removeTrailingSlashes(request: Request) {
  let url = new URL(request.url)
  if (url.pathname.endsWith('/') && url.pathname !== '/') {
    throw redirect(url.pathname.slice(0, -1) + url.search)
  }
}

export async function ensureSecure(request: Request) {
  let proto = request.headers.get('x-forwarded-proto')
  // this indirectly allows `http://localhost` because there is no
  // "x-forwarded-proto" in the local server headers
  if (proto === 'http') {
    let secureUrl = new URL(request.url)
    secureUrl.protocol = 'https:'
    throw redirect(secureUrl.toString())
  }
}
