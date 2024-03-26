import { MetaFunction, SerializeFrom } from '@remix-run/node'
import { useLocation, useParams } from '@remix-run/react'
import { GeneralErrorBoundary } from '~/components/ErrorBoundary'
import PageNotFound from '~/components/PageNotFound'
import { loader as rootLoader } from '~/root'

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const rootData = matches.find((match) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined

  const rootTitle = rootData?.data.initial.data.settings.siteTitle

  const title = ['Page Not Found', rootTitle].filter(Boolean).join(' | ')
  return [{ title }]
}

export async function loader() {
  throw new Response('Not Found', { status: 404 })
}
export default function NotFoundRoute() {
  return <ErrorBoundary />
}

export function ErrorBoundary() {
  const location = useLocation()
  // const params = useParams()
  // console.log({ params })
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <PageNotFound slug={location.pathname} />,
      }}
    />
  )
}
