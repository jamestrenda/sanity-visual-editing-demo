import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure'
// import {IconHome} from '../icons/home'
import { IconGear } from '../icons/gear'
import { isAdminUser } from '../utils/misc'
import { SINGLETON_TYPES } from '../schema'
import { IconHome } from '../icons/home'
import { IconFiles } from '~/icons/files'
import { IconGlobe } from '~/icons/globe'
import { IconRSS } from '~/icons/rss'
import { FolderIcon, HashIcon } from '@sanity/icons'
import { IconBullseye } from '~/icons/bullseye'
import { IconUserCircle } from '~/icons/userCircle'
import { IconFAQ } from '~/icons/iconFAQ'

export const structure: StructureResolver = async (S, context) => {
  const { currentUser } = context

  const isAdmin = isAdminUser(currentUser)

  const pages = S.listItem()
    .title('Pages')
    .icon(IconFiles)
    .child(S.documentTypeList('page').title('Pages'))

  const blog = S.listItem()
    .title('Blog')
    .icon(IconRSS)
    .child(
      S.list()
        .title('Blog')
        .items([
          S.listItem()
            .title('Categories')
            .icon(HashIcon)
            .child(S.documentTypeList('category').title('Categories')),
          S.divider(),
          S.listItem()
            .title('All Posts')
            .icon(IconFiles)
            .child(S.documentTypeList('post').title('All Posts')),
          S.listItem()
            .title('Posts by Category')
            .icon(FolderIcon)
            .child(
              S.documentTypeList('category')
                .title('Posts by Category')
                .child((categoryId) =>
                  S.documentList()
                    .title('Posts')
                    .filter('_type == "post" && $categoryId == category._ref')
                    .params({ categoryId }),
                ),
            ),
        ]),
    )
  const globalContent = S.listItem()
    .title('Global Content')
    .icon(IconGlobe)
    .child(S.documentTypeList('globalContent').title('Global Content'))

  // const home = S.listItem()
  //   .title('Homepage')
  //   .icon(IconHome)
  //   .child(
  //     S.defaultDocument({
  //       schemaType: 'home',
  //       documentId: 'home',
  //     }).title('Homepage'),
  //   )

  const services = S.listItem()
    .title('Services')
    .icon(IconBullseye)
    .child(S.documentTypeList('service').title('Services'))

  const team = S.listItem()
    .title('Team')
    .icon(IconUserCircle)
    .child(S.documentTypeList('team').title('Team Members'))

  const faq = S.listItem()
    .title('FAQs')
    .icon(IconFAQ)
    .child(S.documentTypeList('faq').title('FAQs'))

  const settings = S.listItem()
    .title('Site Settings')
    .icon(IconGear)
    .child(
      S.defaultDocument({
        schemaType: 'siteSettings',
        documentId: 'siteSettings',
      }).title('Site Settings'),
    )

  const defaultListItems = S.documentTypeListItems().filter(
    (listItem) =>
      ![
        ...SINGLETON_TYPES,
        'category',
        'faq',
        'globalContent',
        'page',
        'post',
        'service',
        'team',
      ].includes(listItem.getId()!),
  )

  const nonAdminView = [
    globalContent,
    S.divider(),
    pages,
    blog,
    services,
    team,
    faq,
    ...defaultListItems,
  ]
  const adminVieww = [...nonAdminView, S.divider(), settings]

  return S.list()
    .id('root')
    .title('Everything')
    .items(isAdmin ? adminVieww : nonAdminView)
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, documentId },
) => {
  //   const OGPreviewView = S.view
  //     .component(OGPreview)
  //     .options({
  //       url: resolveOGUrl(documentId),
  //     })
  //     .title('OG Preview')

  switch (schemaType) {
    case `home`:
      return S.document().views([S.view.form()])
    // case `record`:
    //   return S.document().views([S.view.form(), OGPreviewView])
    default:
      return S.document().views([S.view.form()])
  }
}
