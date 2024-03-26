import { LoaderFunctionArgs } from '@remix-run/node'
import { CacheControl } from '~/http/cache-control.server'
import { SitemapUrl, createSitemap } from '~/http/sitemap.server'
import { loadQuery } from '~/sanity/loader.server'
import { SITEMAP_QUERY, SITEURL_QUERY } from '~/sanity/queries'

type SitemapQuery = {
  siteUrl: string
  pages: SitemapUrl[]
  posts: SitemapUrl[]
  categories: SitemapUrl[]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pages = await loadQuery<SitemapQuery>(SITEMAP_QUERY)

  //   let [index, pages] = await Promise.all([
  //     [{ url: `${siteUrl}/` }],
  //     loadQuery<SitemapUrl[]>(SITEMAP_QUERY),
  //   ])

  const urls =
    [
      { url: `${pages.data.siteUrl}/` },
      ...pages.data.pages,
      ...pages.data.posts,
      ...pages.data.categories,
    ] || []

  //   const pages = await getPages({
  //     token: process.env.SANITY_API_READ_TOKEN,
  //     preview: false,
  //   });
  //   const slugs = pages.map((page) => ({ url: page.slug }));

  //   const urls = [`${siteUrl}/`, ...slugs];

  const sitemap = createSitemap(urls)
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': new CacheControl('swr').toString(),
    },
  })
}
