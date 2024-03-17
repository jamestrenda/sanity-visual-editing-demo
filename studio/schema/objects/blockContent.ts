import { defineType, defineArrayMember, defineField } from 'sanity'
import PageBuilderInput from '~/components/PageBuilderInput'
import { IconText } from '~/icons/text'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      type: 'hero',
    },
    {
      name: 'textBlock',
      title: 'Text Block',
      type: 'object',
      icon: IconText,
      preview: {
        prepare() {
          return {
            title: 'Text Block',
          }
        },
      },
      fields: [
        defineField({
          title: 'Portable Text',
          name: 'portableText',
          type: 'portableText',
        }),
      ],
    },
    {
      type: 'reference',
      to: [{ type: 'globalContent' }],
    },
  ],
  components: {
    input: PageBuilderInput,
  },
})
