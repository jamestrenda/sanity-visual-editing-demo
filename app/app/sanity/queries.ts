import groq from 'groq'

const slugFragment =
  'select(defined(parent) => parent->slug.current + "/" + slug.current, slug.current)'

export const slugProjection = `"slug": ${slugFragment}`

const linkFragment = groq`
  "_key": @.link[0]._key,
  "_type": @.link[0]._type,
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
  title,
  text,
  link {
    ${linkFragment}
  }
`

export const imageFieldsFragment = groq`
  _type,
  crop,
  hotspot,
  asset->{
    _id,
    _ref,
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
  }`

export const imageObjectFragment = groq`
  _type,
  altText,
  caption,
  image {
    ${imageFieldsFragment}
  },
  anchor
`

const portableTextFragment = groq`
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      "slug": @.linkInternal.reference->slug.current,
      "anchor": @.linkInternal.anchor
    },
    _type == "externalLink" => {
      "url": @.linkExternal.url,
      "newWindow": @.linkExternal.newWindow
    },
    !(_type in ["internalLink", "externalLink"]) => {
      ...
    }
  },
  _type == "button" => {
    link {
      ${linkFragment}
    }
  },
  _type == "imageObject" => {
    ${imageObjectFragment}
  },
  !(_type in ["imageObject", "button"]) => {
    ...
  }
`

const faqBlockFraqment = groq`
  _key,
  "_type": "faq",
  title,
  text[] {
    ${portableTextFragment}
  },
  faqs[]-> {
    question,
    _type,
    _id,
    answer[] {
      ${portableTextFragment}
    },
    anchor
  },
  anchor
`

const checklistFragment = groq`
  _type,
  _key,
  items[] {
    _key,
    item[] {
      ${portableTextFragment}
    }
  },
  anchor
`

const ctaBlockFragment = groq`
  badge {
    ${badgeFragment},
  },
  title,
  subtitle,
  image {
    ${imageFieldsFragment}
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
  anchor
`

const logoCloudFragment = groq`
  _key,
  _type,
  badge {
    ${badgeFragment}
  },
  title,
  logos[] {
    ${imageObjectFragment}
  }
`

const teamFragment = groq`
  _key,
  _type,
  badge {
    ${badgeFragment}
  },
  title,
  text,
  members[]-> {
    _type,
    _id,
    firstName,
    lastName,
    position,
    image {
      ${imageObjectFragment}
    },
    socialMedia {
      instagram,
      linkedin,
      x
    }
  }
`

//!(_type in ["image", "imageObject"]) => {

// TODO: need a globalContentFragment that contains all the types from the globalContent sanity schema
const globalContentFragment = groq`
  ...block[0] {
    _type,
    _key,
    _type == "ctaBlock" => {
      ${ctaBlockFragment}
    },
    _type == "logoCloud" => {
      ${logoCloudFragment}
    }
  }
`

const statsFragment = groq`
  _key,
  _type,
  badge {
    ${badgeFragment}
  },
  title,
  text[] {
    ${portableTextFragment}
  },
  image {
    ${imageFieldsFragment}
  },
  stats[] {
    _key,
    name,
    description,
    value,
    prefix,
    suffix
  },
  anchor
`

// this is really only being used in one place and that's in block.ts to create a type off the keys...
// orginally this was copied from another project that had a different structure for the page builder
// export const BLOCK_TYPES_QUERY = {
//   badge: groq`
//     badge {
//       ${badgeFragment}
//     },
//   `,
//   block: groq`
//     ${portableTextFragment}
//   `,
//   logoCloud: groq`
//     ${logoCloudFragment}
//   `,
//   button: groq`
//     ${linkFragment}
//   `,
//   image: groq`{
//     image {
//       ${imageFieldsFragment}
//     }
//   }
//   `,
// }

// contains all the types from the blockContent sanity schema
const blockContentFragment = groq`
  _key,
  _type,
  _type == "badge" => {
    ${badgeFragment}
  },
  _type == "textBlock" => {
    portableText [] {
      ${portableTextFragment}
    }
  },
  _type == "button" => {
    link {
      ${linkFragment}
    }
  },
  _type == "ctaBlock" => {
    ${ctaBlockFragment}
  },
  _type == "faqBlock" => {
    ${faqBlockFraqment}
  },
  _type == "imageObject" => {
    ${imageObjectFragment}
  },
  _type == "teamGrid" => {
    ${teamFragment}
  },
  _type == "statsBlock" => {
    ${statsFragment}
  },
  _type == "reference" => @-> {
    _type == "globalContent" => {
      ${globalContentFragment}
    }
  }
`
export const heroBaseFields = groq`
  badge {
    ${badgeFragment},
  },
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
    ${blockContentFragment}
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
  logoMobile {
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

export const REDIRECTS_QUERY = groq`*[_type == "redirectSettings"][0].redirects[]`

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

// data = await getPageIdWithModuleTypes({
//   preview,
//   slug: frontpage?.slug,
// });

// export async function getPageIdWithModuleTypes({
//   preview = false,
//   slug,
// }: ClientProps & {
//   slug?: string | null;
// }): Promise<any> {
//   if (client) {
//     const data =
//       (await getClient(preview).fetch(draftPageBySlugQuery, { slug })) ??
//       (await getClient(preview).fetch(pageBySlugQuery, { slug }));
//     // console.log({ data });
//     return data;
//   }
//   return {} as any;
// }

// if (data) {
//   const { _id, moduleTypes } = data;
//   query = pageByIdQuery(moduleTypes);
//   page = await getPageBySlug({ preview, slug: frontpage?.slug });

//   return json({
//     data: page,
//     query: preview ? query : null,
//     params: preview ? { _id, moduleTypes } : null,
//   });

// export const pageByIdQuery = (
//   moduleTypes: string[] | undefined = []
// ) => groq`*[_id == $_id][0]{
//     _id,
//     title,
//     ${slugProjection},
//     "isFrontpage": _id == ${frontpageId},
//     "modules": coalesce(modules[_type in $moduleTypes]{
//       _key,
//       _type,
//      ${moduleTypes
//        .map(
//          (type) =>
//            `_type == "${type}" => ${
//              MODULE_TYPE_QUERIES[type as keyof typeof MODULE_TYPE_QUERIES]
//            }`
//        )
//        .join(',')}
//     }, [])
//   }`;

//   export const pageBySlugQuery = groq`
//   *[_type == "page" && slug.current == $slug][0] {
//     ${pageFields}
//   }
// `;

// const pageFields = groq`
//   _id,
//   ${slugProjection},
//   "moduleTypes": coalesce(array::unique(modules[]._type), [])
// `;
