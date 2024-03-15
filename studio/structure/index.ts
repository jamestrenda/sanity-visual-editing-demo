import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure'
// import {IconHome} from '../icons/home'
import { IconGear } from '../icons/gear'
import { isAdminUser } from '~/utils/misc'
import { SINGLETON_TYPES } from '~/schema'

export const structure: StructureResolver = async (S, context) => {
  const { currentUser } = context

  const isAdmin = isAdminUser(currentUser)

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
      ![...SINGLETON_TYPES, 'redirect', 'article', 'category', 'post'].includes(
        listItem.getId()!,
      ),
  )

  const nonAdminView = [
    ...(defaultListItems.length
      ? [S.divider(), ...defaultListItems]
      : defaultListItems),
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
