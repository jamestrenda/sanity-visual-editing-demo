import groq from 'groq'

export const imageFieldsFragment = groq`
  crop,
  hotspot,
  asset->{
    _id,
    _type,
    altText,
    url,
    description,
    metadata {
      lqip,
      dimensions {
        aspectRatio,
        height,
        width
      }
    },
  }
`

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    _id,
    siteTitle,
    tagline,
    siteUrl,
    logo {
        ${imageFieldsFragment}
    },
    favicon {
        ${imageFieldsFragment}
    },
    address,
    phone,
    email,
    googleSiteVerification,
    gtm
  }
`
