import groq from 'groq'

const slugFragment =
  'select(defined(parent) => parent->slug.current + "/" + slug.current, slug.current)'

export const slugProjection = `"slug": ${slugFragment}`

const linkFragment = groq`
  "_key": @.link[0]._key,
  "type": @.link[0]._type,
  linkText,
  @.link[0]._type == "linkInternal" =>  {
    @.link[0].reference->isFrontpage => {
      "to": '/',
      "anchor": @.link[0].anchor
    },
    "to": coalesce(@.link[0].reference->slug.current, '#'),
    "anchor": @.link[0].anchor
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

const portableTextFragment = groq`
  ...,
  markDefs[]{
    _type == "internalLink" => {
      _type,
      _key,
      "slug": @.linkInternal.reference->slug.current,
      "anchor": @.linkInternal.anchor
    },
    _type == "externalLink" => {
      _type,
      _key,
      "url": @.linkExternal.url,
      "newWindow": @.linkExternal.newWindow
    },
    !(_type in ["internalLink", "externalLink"]) => {
      ...
    }
  },
`

const logoCloudFragment = groq`
  "logos": logos[].image {
    ${imageFieldsFragment}
  }
`

//!(_type in ["image", "imageObject"]) => {

// TODO: need a globalContentFragment that contains all the types from the globalContent sanity schema
const globalContentFragment = groq`
  title,
  "block": block[0] {
    _type,
    _key,
    _type == "logoCloud" => {
      ${logoCloudFragment}
    }
  }
`

export const BLOCK_TYPES_QUERY = {
  block: groq`
    ${portableTextFragment}
  `,
  logoCloud: groq`
    ${logoCloudFragment}
  `,
  globalContent: groq`
    ${globalContentFragment}
  `,
}

// contains all the types from the blockContent sanity schema
const blockContentFragment = groq`
  _key,
  _type,
  _type == "reference" => @-> {
    _type,
    _type == "globalContent" => {
      ${globalContentFragment}
    }
  },
  _type == "imageObject" => {
    "_type": "image",
    ${imageFieldsFragment}
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
  },
  primaryCTA {
    ${linkFragment}
  },
  secondaryCTA {
    ${linkFragment}
  },
  style {
    fullHeight
  },
  hideHero
`

const pageFields = groq`
  _id,
  _type,
  "title": coalesce(seo.title, hero.title, title),
  seo,
  "sections": pageBuilder[] {
    _type,
    _key,
    blocks[] {
      ${blockContentFragment}
    }
  },
  "slug": ${slugFragment},
  isFrontpage,
  isPostsPage,
  hero {
    ${heroBaseFields},
  }
`

// "moduleTypes": coalesce(array::unique(modules[]._type), [])

export const HOME_QUERY = groq`*[_type == "page" && isFrontpage][0]{
  _type,
  ${pageFields}
}`

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  _type,
  ${pageFields}
}`

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`

export const GENERAL_SETTINGS_QUERY = groq`*[_id == "siteSettings"][0]{
  _id,
  _type,
  siteTitle,
  siteUrl,
  "favicon": favicon.asset->url,
  "frontpage": frontpage-> {
    ${slugProjection}
  },
  "postsPage": postsPage-> {
    ${slugProjection}
  },
  headerMenu-> {
    _type,
    items[] {
      link {
        ${linkFragment}
      }
    }
  },
  footerMenus[]-> {
    _type,
    _id,
    title,
    items[] {
      _type,
      _key,
      link {
        ${linkFragment}
      }
    }
  },
  googleSiteVerification,
  gtm,
  maintenanceMode
}`

export const COMPANY_QUERY = groq`*[_id == "company"][0]{
  name,
  tagline,
  logo {
    ${imageFieldsFragment}
  },
  address,
  phone,
  email,
  socialMedia {
    facebook,
    instagram,
    x,
    linkedin,
    youtube
  }
}`

export const REDIRECTS_QUERY = groq`*[_type == "redirect"]`

export const NOT_FOUND_QUERY = groq`*[_id == "notFoundSettings"][0]{
  title,
  text[],
  image {
    ${imageFieldsFragment}
  },
  quickLinks[] {
    ${linkFragment}
  }
}
`

export const SETTINGS_QUERY = groq`{
  "general": ${GENERAL_SETTINGS_QUERY},
  "company": ${COMPANY_QUERY},
  "notFound": ${NOT_FOUND_QUERY},
  "redirects": ${REDIRECTS_QUERY}
}`

export const ROOT_QUERY = groq`{
  "settings": *[_id == "siteSettings"][0] {
    "siteTitle": coalesce(@.siteTitle, *[_id == "company"][0].name, ''),
    siteUrl,
    "favicon": favicon.asset->url,
    headerMenu-> {
      _type,
      items[] {
        link {
          ${linkFragment}
        }
      }
    },
    footerMenus[]-> {
      _type,
      _id,
      title,
      items[] {
        _type,
        _key,
        link {
          ${linkFragment}
        }
      }
    },
    googleSiteVerification,
    gtm,
    maintenanceMode
  },
  "company": ${COMPANY_QUERY},
}`

export const BLOCK_QUERIES = {}
