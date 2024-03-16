import groq from 'groq'

const linkFragment = groq`
  "_key": @.link[0]._key,
  "type": @.link[0]._type,
  linkText,
  @.link[0]._type == "linkInternal" =>  {
    "to": coalesce(@.link[0].reference->slug.current, '#'),
    "anchor": @.link[0].anchor,
  },
  @.link[0]._type == "linkExternal" => {
    "href": coalesce(@.link[0].url, '#'),
    "newWindow": @.link[0].newWindow
  }
`
export const badgeFragment = groq`
  badge {
    title,
    text,
    link {
      ${linkFragment}
    }
  }
`

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

export const heroBaseFields = groq`
  ${badgeFragment},
  title,
  subtitle,
  image {
    ${imageFieldsFragment}
  },
  "video": {
    "mp4": @.mp4,
    "webm": @.webm
  }
`

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`

export const HOME_QUERY = groq`*[_id == "home"][0]{
  hero {
    ${heroBaseFields},
  }
}`

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
