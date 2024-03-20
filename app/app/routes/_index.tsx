import { type MetaFunction, useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'

import { loadQuery } from '~/sanity/loader.server'
import { HOME_QUERY, POST_QUERY } from '~/sanity/queries'
import { Page } from '~/types/page'
import { default as PageComponent } from '~/components/Page'
import { invariantResponse } from '~/utils/misc'
import { SerializeFrom } from '@remix-run/node'
import { loader as rootLoader } from '~/root'

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const rootData = matches.find((match) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined

  const rootTitle = rootData?.data.initial.data.settings.siteTitle

  const googleSiteVerificationMeta = rootData?.data.initial.data.settings
    .googleSiteVerification
    ? {
        name: 'google-site-verification',
        content: rootData?.data.initial.data.settings.googleSiteVerification,
      }
    : {}

  let title
  if (data?.initial) {
    const { initial: pageData } = data
    title = [pageData.data.title, rootTitle].filter(Boolean).join(' | ')

    return [
      { title },
      {
        tagName: 'link',
        rel: 'canonical',
        href: rootData?.data.initial.data.settings.siteUrl,
      },
      {
        name: 'description',
        content: data.initial.data.seo.metaDescription ?? undefined,
      },
      googleSiteVerificationMeta,
    ]
  }
  title = ['Page Not Found', rootTitle].filter(Boolean).join(' | ')
  return [{ title }]
}

export const loader = async () => {
  let initial =
    (await loadQuery<Page>(HOME_QUERY)) || (await loadQuery<any>(POST_QUERY))

  invariantResponse(initial.data, 'No homepage or posts found', { status: 404 })

  const query = initial.data._type === 'page' ? HOME_QUERY : POST_QUERY

  return { initial, query: query, params: {} }
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, loading, error, encodeDataAttribute } = useQuery<Page | any>(
    query,
    params,
    {
      // @ts-expect-error -- TODO fix the typing here
      initial,
    },
  )

  if (error) {
    throw error
  } else if (loading && !data) {
    return <div>Loading...</div>
  }

  if (data?._type === 'page') {
    return <>{data?.hero ? <PageComponent page={data} /> : null}</>
  }

  return <div>Posts</div>
}
