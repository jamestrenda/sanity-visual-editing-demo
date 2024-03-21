import '~/styles/tailwind.css'
import '~/styles/app.css'

import { json, LoaderFunctionArgs, type LinksFunction } from '@remix-run/node'
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { lazy, Suspense, useEffect } from 'react'
import { Container } from './components/Container'
import dayjs from 'dayjs'
import { loadQuery, useQuery } from '@sanity/react-loader'
import { ROOT_QUERY, SETTINGS_QUERY } from './sanity/queries'
import { SiteSettings } from './types/siteSettings'
import Image from './components/Image'
import { parsePhoneNumber } from 'awesome-phonenumber'
import Header from './components/Header'
import { useFontFaceObserver } from './hooks/useFontFaceObserver'
import Footer from './components/Footer'
import { GeneralErrorBoundary } from './components/ErrorBoundary'
import { Company } from './types/company'
import PageNotFound from './components/PageNotFound'
import { middleware } from './http'

const LiveVisualEditing = lazy(() => import('~/components/LiveVisualEditing'))

export type Loader = typeof loader

type Root = {
  settings: SiteSettings
  company: Company
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // const stegaEnabled = isStegaEnabled(request.url)

  await middleware(request)

  const initial = await loadQuery<Root>(ROOT_QUERY)

  return json({
    initial,
    query: ROOT_QUERY,
    params: {},
    ENV: {
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED,
    },
  })
}

export const links: LinksFunction = () => {
  return [
    // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    // { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    // {
    //   rel: 'stylesheet',
    //   href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,800;1,800&display=swap',
    // },
    { rel: 'preconnect', href: 'https://cdn.sanity.io' },
  ]
}

function Document({
  children,
  meta,
}: {
  children: React.ReactNode
  meta?: { favicon?: string }
}) {
  const favicon = meta?.favicon ?? 'https://fav.farm/🔥'
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href={favicon} type="image/png" />
        <Links />
      </head>
      <body className="">
        <Link to="#main" className="sr-only focus:not-sr-only">
          Skip to main content
        </Link>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { ENV, initial, params, query } = useLoaderData<typeof loader>()
  const { data, loading, error, encodeDataAttribute } = useQuery<
    typeof initial.data
  >(query, params, {
    // @ts-expect-error
    initial,
  })

  if (error) {
    throw error
  } else if (loading && !data) {
    return <div>Loading...</div>
  }

  const { settings, company } = data || initial.data

  const siteTitle = settings.siteTitle ?? company.name ?? 'Company Name'

  // TODO: figure out why phone is not being parsed from the data, but is being parsed from the hard-coded value
  const phone = company.phone ?? ''
  const phoneParsed = parsePhoneNumber(phone, { regionCode: 'US' })
  const phoneFormatted = phoneParsed.valid ? phoneParsed.number.national : phone

  // console.log('data', data)
  // console.log('phone', phone)
  // console.log('phoneParsed', phoneParsed)
  // console.log('phoneFormatted', phoneFormatted)

  var fonts = {
    Montserrat: { weight: 800 },
    // Montserrat: { weight: 800, style: 'italic' },
    // Etc.
  }

  const { fontsLoaded } = useFontFaceObserver(['Montserrat'])

  useEffect(() => {
    if (fontsLoaded) {
      document.body.classList.add('fonts-loaded')
    }
  }, [fontsLoaded])

  return (
    <Document
      meta={{
        favicon: settings.favicon ?? 'https://fav.farm/🔥',
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Header
          {...{
            email: company.email,
            logo: company.logo,
            phone: phoneFormatted,
            menu: settings.headerMenu,
          }}
        />
        <main
          id="main"
          className="flex-grow [&>section:nth-child(odd)]:bg-gray-100 [&_.prose]:!text-2xl"
        >
          <Outlet />
        </main>
        <Footer
          {...{
            logo: company.logo,
            tagline: company.tagline,
            socialMedia: company.socialMedia,
            address: company.address,
            siteTitle,
            menus: settings.footerMenus,
          }}
        />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)}`,
        }}
      />
      {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
        <Suspense fallback={<></>}>
          <LiveVisualEditing />
        </Suspense>
      ) : null}
    </Document>
  )
}

export function ErrorBoundary() {
  // 🐨 render the GeneralErrorBoundary in your new Document component.
  return (
    <Document
      meta={{
        favicon: 'https://fav.farm/💩',
      }}
    >
      <GeneralErrorBoundary
        statusHandlers={{
          404: ({ error }) => (
            <PageNotFound
              title={error.data.title}
              // text={error.data.text}
              // image={error.data.image}
              // quickLinks={error.data.quickLinks}
            />
          ),
        }}
      />
    </Document>
  )
}
