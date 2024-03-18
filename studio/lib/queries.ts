import groq from 'groq'

export const REDIRECT_QUERY = groq`
  *[_type == "redirectSettings"][0].redirects`

export const REDIRECT_SETTINGS_ID_QUERY = groq`
  *[_type == "redirectSettings"][0]._id
`
