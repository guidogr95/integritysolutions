import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from './lib/client'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
