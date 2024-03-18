import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { SINGLETON_TYPES, schemaTypes } from './schema'
import { presentationTool, DocumentLocationResolver } from 'sanity/presentation'
import { structure } from './structure'
import { locate } from './presentation/locate'
import { media } from 'sanity-plugin-media'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { noteField } from 'sanity-plugin-note-field'
import { isAdminUser } from './lib/misc'
import { PAGE_TYPES } from './lib/constants'
import { PublishSettingsAction } from './actions/publishSettingsAction'
import { PublishDocumentWithSlugAction } from './actions/publishDocumentWithSlug'

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
export const dataset = process.env.SANITY_STUDIO_DATASET!
export const apiVersion = '2023-03-20'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'trident',
  title: 'TMG',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl:
        process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
      locate,
    }),
    visionTool(),
    media(),
    unsplashImageAsset(),
    noteField(),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev, context) => {
      // const { currentUser } = context

      const excludedTypes = [...SINGLETON_TYPES]

      // hide redirect type from non-admin users
      // if (!isAdminUser(currentUser)) {
      //   excludedTypes.push('redirect')
      // }

      return [
        ...prev.filter(({ schemaType }) => !excludedTypes.includes(schemaType)),
      ]
    },
  },
  // document: {
  //   actions: (prev, context) => {
  //     return SINGLETON_TYPES.has(context.schemaType)
  //       ? prev.filter(({ action }) => action && singletonActions.has(action))
  //       : prev
  //   },
  // },
  document: {
    actions: (prev, context) => {
      const settingsActions = prev
        .filter(
          ({ action }) => action == 'discardChanges' || action == 'publish',
        )
        .map((originalAction) =>
          originalAction.action === 'publish'
            ? PublishSettingsAction(originalAction, context)
            : originalAction,
        )

      return context.schemaType === 'siteSettings'
        ? settingsActions
        : SINGLETON_TYPES.has(context.schemaType)
          ? prev.filter(({ action }) => action && singletonActions.has(action))
          : PAGE_TYPES.find((type) => type === context.schemaType)
            ? prev.map((originalAction) =>
                originalAction.action === 'publish'
                  ? PublishDocumentWithSlugAction(originalAction, context)
                  : originalAction,
              )
            : prev
    },
  },
  tools: (prev, { currentUser }) => {
    // If the user has the administrator role, return all tools.
    // If the user does not have the administrator role, filter out the vision tool.
    return isAdminUser(currentUser)
      ? prev
      : prev.filter((tool) => tool.name !== 'vision')
    // return prev;
  },
})
