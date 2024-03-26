import { ActionFunction, json } from '@remix-run/node'
import { loadQuery } from '@sanity/react-loader'
import { MORE_POSTS_QUERY } from '~/sanity/queries'
import { PostListing } from '~/types/post'
import { invariantResponse } from '~/utils/misc'

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed' }, 405)
  }

  const formData = await request.formData()
  const lastPostId = formData.get('lastPostId')
  const postsPerPage = formData.get('postsPerPage')

  const query = MORE_POSTS_QUERY

  let initial = await loadQuery<PostListing[]>(query, {
    lastPostId,
    postsPerPage: postsPerPage ? Number(postsPerPage) : 1,
  })

  invariantResponse(initial.data, `Error loading posts`, { status: 400 })

  return initial.data
}
