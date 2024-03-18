import { useToast } from '@sanity/ui'
import { Ref } from 'react'
import type {
  DocumentActionComponent,
  DocumentActionProps,
  DocumentActionsContext,
  Reference,
} from 'sanity'
import { apiVersion } from '~/sanity.config'

export function PublishSettingsAction(
  originalPublishAction: DocumentActionComponent,
  context: DocumentActionsContext,
) {
  const PublishAction = (props: DocumentActionProps) => {
    // const frontpage = props.draft?.frontpage?._ref;
    const { draft, published } = props
    const frontpage = draft?.frontpage as Reference | undefined
    const postsPage = draft?.postsPage as Reference | undefined

    const existingFrontpage = published?.frontpage as Reference | undefined
    const existingPostsPage = published?.postsPage as Reference | undefined

    const originalResult = originalPublishAction(props)
    const client = context.getClient({ apiVersion })

    const toast = useToast()
    return {
      ...originalResult,
      onHandle: async () => {
        // if user is unsetting the frontpage...
        if (!frontpage) {
          // only unset if there is a frontpage already published
          if (existingFrontpage?._ref) {
            // update the existing page's isFrontpage to false
            await client
              .patch(existingFrontpage._ref)
              .set({ isFrontpage: false })
              .commit()
              .then(() => originalResult?.onHandle && originalResult.onHandle())
              .catch((err: Error) => {
                toast.push({
                  status: 'error',
                  title: err.message,
                })
              })
          } else {
            // if there isn't an existing frontpage, then just delegate to original handler
            originalResult?.onHandle && originalResult.onHandle()
          }
        } else {
          // if user is setting the frontpage...
          await client
            .patch(frontpage._ref)
            .set({ isFrontpage: true })
            .commit()
            .then(() => originalResult?.onHandle && originalResult.onHandle())
            .catch((err: Error) => {
              toast.push({
                status: 'error',
                title: err.message,
              })
            })
        }
        if (!postsPage) {
          // only unset if there is a frontpage already published
          if (existingPostsPage?._ref) {
            // update the existing page's isFrontpage to false
            await client
              .patch(existingPostsPage._ref)
              .set({ isPostsPage: false })
              .commit()
              .then(() => originalResult?.onHandle && originalResult.onHandle())
              .catch((err: Error) => {
                toast.push({
                  status: 'error',
                  title: err.message,
                })
              })
          } else {
            // if there isn't an existing frontpage, then just delegate to original handler
            originalResult?.onHandle && originalResult.onHandle()
          }
        } else {
          // if user is setting the frontpage...
          await client
            .patch(postsPage._ref)
            .set({ isPostsPage: true })
            .commit()
            .then(() => originalResult?.onHandle && originalResult.onHandle())
            .catch((err: Error) => {
              toast.push({
                status: 'error',
                title: err.message,
              })
            })
        }
      },
    }
  }
  return PublishAction as DocumentActionComponent
}
