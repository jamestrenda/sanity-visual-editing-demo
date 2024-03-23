import { defineType } from 'sanity'
import { blockContentTypes } from './blockContent'
import PageBuilderInput from '~/components/PageBuilderInput'

export default defineType({
  title: 'Page Builder',
  name: 'pageBuilder',
  type: 'array',
  of: blockContentTypes,
  components: {
    input: PageBuilderInput,
  },
})
