import { createClient } from '@sanity/client/stega'

import {
  dataset,
  projectId,
  stegaEnabled,
  studioUrl,
  apiVersion,
} from './projectDetails'

// Do not import this into client-side components unless lazy-loaded
export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion,
  stega: {
    enabled: stegaEnabled,
    studioUrl,
  },
})
