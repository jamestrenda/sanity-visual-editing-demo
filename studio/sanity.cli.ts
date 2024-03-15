import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from './sanity.config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  vite: {
    // @ts-ignore - pnpm bug
    plugins: [tsconfigPaths()],
  },
})
