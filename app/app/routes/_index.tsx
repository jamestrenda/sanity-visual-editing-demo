import { type MetaFunction, useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import Hero from '~/components/Hero'

import { loadQuery } from '~/sanity/loader.server'
import { HOME_QUERY } from '~/sanity/queries'
import { Home } from '~/types/home'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

export const loader = async () => {
  const initial = await loadQuery<Home[]>(HOME_QUERY)

  return { initial, query: HOME_QUERY, params: {} }
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, loading, error, encodeDataAttribute } = useQuery<Home>(
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

  return <>{data?.hero ? <Hero {...data.hero} /> : null}</>
}
