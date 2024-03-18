import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure'
// import {IconHome} from '../icons/home'
import { IconGear } from '../icons/gear'
import { isAdminUser } from '../lib/misc'
import { SINGLETON_TYPES } from '../schema'
import { IconHome } from '../icons/home'
import { IconFiles } from '~/icons/files'
import { IconGlobe } from '~/icons/globe'
import { IconRSS } from '~/icons/rss'
import { FolderIcon, HashIcon } from '@sanity/icons'
import { IconBullseye } from '~/icons/bullseye'
import { IconUserCircle } from '~/icons/userCircle'
import { IconFAQ } from '~/icons/iconFAQ'
import { IconBuilding } from '~/icons/building'
import { IconRedirect } from '~/icons/redirect'

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

  const company = S.listItem()
    .title('Company Info')
    .icon(IconBuilding)
    .child(
      S.defaultDocument({
        schemaType: 'company',
        documentId: 'company',
      }).title('Company Info'),
    )
  // const settings = S.listItem()
  //   .title('Site Settings')
  //   .icon(IconGear)
  //   .child(
  //     S.defaultDocument({
  //       schemaType: 'siteSettings',
  //       documentId: 'siteSettings',
  //     }).title('Site Settings'),
  //   )

  const settings = S.listItem()
    .title('Settings')
    .icon(IconGear)
    .child(
      S.list()
        .title('Settings')
        .items([
          S.listItem()
            .title('General')
            .icon(IconGear)
            .child(
              S.defaultDocument({
                schemaType: 'siteSettings',
                documentId: 'siteSettings',
              }).title('General Settings'),
            ),
          // S.listItem()
          //   .title(menu.title + 's')
          //   .icon(menu.icon)
          //   .child(S.documentTypeList(menu.name).title(menu.title + 's')),
          // S.listItem()
          //   .title('Logo')
          //   .icon(RiRainbowLine)
          //   .child(
          //     S.defaultDocument({
          //       schemaType: logoSettings.name,
          //       documentId: logoSettings.name,
          //     }).title('Logo Settings')
          //   ),
          S.divider(),
          S.listItem().title('Header'),
          //   .icon(RiLayoutTop2Line)
          //   .child(
          //     S.defaultDocument({
          //       schemaType: headerSettings.name,
          //       documentId: headerSettings.name,
          //     }).title(headerSettings.title as string)
          // ),
          S.listItem().title('Footer'),
          // .icon(RiLayoutBottom2Line)
          // .child(
          //   S.defaultDocument({
          //     schemaType: footerSettings.name,
          //     documentId: footerSettings.name,
          //   }).title(footerSettings.title as string)
          // ),
          S.divider(),
          S.listItem()
            .title('Redirects')
            .icon(IconRedirect)
            .child(
              S.defaultDocument({
                schemaType: 'redirectSettings',
                documentId: 'redirectSettings',
              }).title('Redirects'),
            ),
          S.listItem().title('404 Page'),
          // .icon(RiFileWarningLine)
          // .child(
          //   S.defaultDocument({
          //     schemaType: notFoundSettings.name,
          //     documentId: notFoundSettings.name,
          //   }).title('404 Settings')
          // ),
        ]),
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

  const nonAdminView = [pages, blog, services, team, faq, ...defaultListItems]
  const adminVieww = [
    ...nonAdminView,
    S.divider(),
    globalContent,
    company,
    S.divider(),
    settings,
  ]

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
