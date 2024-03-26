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
import { PAGE_QUERY, POSTS_QUERY } from '~/sanity/queries'
import { Page as Props } from '~/types/page'
import { invariantResponse } from '~/utils/misc'
import { Page } from '~/components/Page'
import { GeneralErrorBoundary } from '~/components/ErrorBoundary'
import PageNotFound from '~/components/PageNotFound'
import { Post, PostListing, Posts, PostsPage } from '~/types/post'

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

    return [
      { title },
      {
        tagName: 'link',
        rel: 'canonical',
        href: `${rootData?.data.initial.data.settings.siteUrl}/${params.slug}`,
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
  const query = PAGE_QUERY
  let initial = await loadQuery<Props>(query, params)

  invariantResponse(initial.data, `/${params.slug}`, { status: 404 })

  // check if this is the posts page
  const { isPostsPage } = initial.data
  // if so, send off another query to get the posts
  if (isPostsPage) {
    const postsQuery = POSTS_QUERY
    const {
      data: { posts, count },
    } = await loadQuery<PostsPage>(postsQuery, {
      postsPerPage: 6,
    }) // TODO: pull postsPerPage value from the settings

    initial.data.postsPageData = {
      posts,
      count,
    }
  }

  return { initial, query, params: { slug: params.slug } }
}

export default function PageRoute() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    // @ts-expect-error
    initial,
  })

  if (loading && !data) {
    return <div>Loading...</div>
  }

  return data ? <Page page={data} /> : null
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: ({ params }) => <PageNotFound slug={`/${params.slug}`} />,
      }}
    />
  )
}
