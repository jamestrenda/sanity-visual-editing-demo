import type { Redirect, Redirects } from '~/types/redirect'

import { REDIRECTS_QUERY } from '~/sanity/queries'
import { loadQuery } from '@sanity/react-loader'
import { invariantResponse } from '../utils/misc'
import { redirect } from '@remix-run/node'

/**
 * Super basic redirects handling with a redirects file.
 *
 * ```
 * # from   to    status
 * /cheese  /taco  302
 *
 * # very, very, very basic support for trailing splat
 * /docs/*  /api/*
 * ```
 *
 * @param request Web Fetch Request to possibly redirect
 */
export async function handleRedirects(request: Request): Promise<void> {
  let initial = await loadQuery<Redirects>(REDIRECTS_QUERY)

  const redirects: Redirect[] = initial.data?.reduce((redirects, next) => {
    let splat = false
    let { _key, _type, from, to, permanent } = next

    // super basic support for splats
    if (from.endsWith('/*')) {
      from = from.slice(0, -2)
      splat = true
    }
    redirects.push({ _key, _type, from, to, splat, permanent })
    return redirects
  }, [] as Redirect[])

  let url = new URL(request.url)
  let response = await checkUrl(url.pathname, redirects)
  if (response) throw response
}

export async function checkUrl(url: string, redirects: Redirect[]) {
  for (let r of redirects) {
    let { from, to, splat, permanent } = r
    let match = splat ? url.startsWith(from) : from === url
    if (match) {
      let location = to
      if (to.endsWith('/*')) {
        let base = to.slice(0, -2)
        let splatPath = url.replace(from, '')
        location = base + splatPath
      }
      if (
        !location.startsWith('/') &&
        !location.startsWith('http://') &&
        !location.startsWith('https://')
      ) {
        location = '/' + location
      }
      return redirect(location, { status: permanent ? 308 : 307 })
    }
  }
  return null
}
