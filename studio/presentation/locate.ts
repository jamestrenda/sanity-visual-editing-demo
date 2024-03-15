import groq from 'groq'
import {map} from 'rxjs'

// const locate: DocumentLocationResolver = (params, context) => {
//     const {documentStore} = context

//     if (params.type === 'post') {
//       // Listen to the query and fetch the draft and published document
//       const doc$ = documentStore.listenQuery(`*[_id == $id][0]{slug,title}`, params, {
//         perspective: 'previewDrafts',
//       }) as Observable<{
//         slug: {current: string | null} | null
//         title: string | null
//       } | null>

//       return doc$.pipe(
//         map((doc) => {
//           if (!doc || !doc.slug?.current) return null

//           return {
//             locations: [
//               {
//                 title: doc.title || 'Untitled',
//                 href: `/post/${doc.slug.current}`,
//               },
//               {
//                 title: 'Posts',
//                 href: `/`,
//               },
//             ],
//           }
//         }),
//       )
//     }

//     return null
//   }

import type {DocumentLocationResolver} from 'sanity/presentation'

// See: https://www.sanity.io/docs/configuring-the-presentation-tool#7dce82cbe90b
export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'record') {
    const doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{
        "title": coalesce(title, "Untitled"),
        "href": slug.current
      }`,
      params,
      {perspective: 'previewDrafts'},
    )

    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.href) {
          return null
        }
        return {
          locations: [
            {title: doc.title, href: doc.href},
            {title: 'Home', href: '/'},
          ],
        }
      }),
    )
  }

  return null
}
