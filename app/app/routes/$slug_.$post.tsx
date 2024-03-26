// ./app/routes/$slug.tsx

import type {
  LoaderFunctionArgs,
  MetaFunction,
  SerializeFrom,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import { loader as rootLoader } from '~/root'
import { POST_QUERY } from '~/sanity/queries'
import { Post as Props } from '~/types/post'
import { invariantResponse } from '~/utils/misc'
import { GeneralErrorBoundary } from '~/components/ErrorBoundary'
import PageNotFound from '~/components/PageNotFound'
import { Post } from '~/components/Post'

export const meta: MetaFunction<typeof loader> = ({
  data,
  params,
  matches,
}) => {
  const rootData = matches.find((match) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined

  const rootTitle = rootData?.data.initial.data.settings.siteTitle

  let title
  if (data?.initial) {
    const { initial: pageData } = data
    title = [pageData.data?.seo?.title ?? pageData.data?.title, rootTitle]
      .filter(Boolean)
      .join(' • ')
    // TODO: could make the separate a field in the site settings, so I don't have to redeclare it in each meta function

    return [
      { title },
      {
        tagName: 'link',
        rel: 'canonical',
        href: `${rootData?.data.initial.data.settings.siteUrl}/${params.slug}/${params.post}`,
      },
      {
        name: 'description',
        content: pageData.data.seo?.metaDescription ?? undefined,
      },
    ]
  }
  title = ['Page Not Found', rootTitle].filter(Boolean).join(' | ')
  return [{ title }]
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  // console.log({ params })
  const query = POST_QUERY
  let initial = await loadQuery<Props>(query, params)

  invariantResponse(initial.data, `/${params.slug}/${params.post}`, {
    status: 404,
  })

  return { initial, query, params: { slug: params.post } }
}

export default function PostRoute() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    // @ts-expect-error
    initial,
  })

  if (loading && !data) {
    return <div>Loading...</div>
  }

  return data ? <Post post={data} /> : null
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: ({ params }) => (
          <PageNotFound slug={`/${params.slug}/${params.post}`} />
        ),
      }}
    />
  )
}
