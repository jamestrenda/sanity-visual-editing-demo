import { defineType, defineArrayMember, defineField } from 'sanity'
import PageBuilderInput from '~/components/PageBuilderInput'
import { IconText } from '~/icons/text'
import { portableTextBlocks } from './portableText'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    portableTextBlocks,
    {
      type: 'imageObject',
    },
    {
      type: 'hero',
    },
    {
      type: 'faqBlock',
    },
    {
      type: 'servicesBlock',
    },
  ],
  components: {
    input: PageBuilderInput,
  },
})
