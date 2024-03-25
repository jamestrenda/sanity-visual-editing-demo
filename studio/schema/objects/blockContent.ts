import { defineField, defineType } from 'sanity'
import PageBuilderInput from '~/components/PageBuilderInput'
import { IconText } from '~/icons/text'

export const blockContentTypes = [
  {
    type: 'badge',
  },
  {
    type: 'button',
  },
  {
    type: 'ctaBlock',
  },
  {
    type: 'faqBlock',
  },
  {
    type: 'form',
  },
  {
    type: 'reference',
    title: 'Global Content',
    to: [{ type: 'globalContent' }],
  },
  // {
  //   type: 'iconList',
  // },
  {
    type: 'imageObject',
  },
  {
    type: 'logoCloud',
  },
  {
    type: 'object',
    title: 'Rich Text',
    name: 'textBlock',
    icon: IconText,
    preview: {
      prepare() {
        return {
          title: 'Rich Text',
        }
      },
    },
    fields: [
      defineField({
        title: 'Rich Text',
        name: 'portableText',
        type: 'portableText',
      }),
    ],
  },
  {
    type: 'servicesBlock',
  },
  {
    type: 'statsBlock',
  },
  {
    type: 'teamGrid',
  },
  // {
  //   type: 'video',
  // },
]

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: blockContentTypes,
  components: {
    input: PageBuilderInput,
  },
})
