import { type MetaFunction, useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import Hero from '~/components/Hero'

import { loadQuery } from '~/sanity/loader.server'
import { POSTS_QUERY } from '~/sanity/queries'
import type { Post } from '~/sanity/types'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

export const loader = async () => {
  const initial = await loadQuery<Post[]>(POSTS_QUERY)

  return { initial, query: POSTS_QUERY, params: {} }
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, loading, error, encodeDataAttribute } = useQuery<
    typeof initial.data
  >(query, params, {
    // @ts-expect-error -- TODO fix the typing here
    initial,
  })

  if (error) {
    throw error
  } else if (loading && !data) {
    return <div>Loading...</div>
  }

  // return (
  //   <section>
  //     {data?.length ? (
  //       data.map((post, i) => (
  //         <Card
  //           key={post._id}
  //           post={post}
  //           encodeDataAttribute={encodeDataAttribute.scope([i])}
  //         />
  //       ))
  //     ) : (
  //       <Welcome />
  //     )}
  //   </section>
  // )
  return (
    <div>
      <Hero
        data={{
          heading: 'Big Bold Statement',
          byline: 'Hello World',
          text: 'Clarifying statement that makes them think and want to get more information.',
        }}
      />
    </div>
  )
}
