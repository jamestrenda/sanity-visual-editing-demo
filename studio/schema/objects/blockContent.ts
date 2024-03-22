import { defineField, defineType } from 'sanity'
import PageBuilderInput from '~/components/PageBuilderInput'
import portableText, { portableTextBlocks } from './portableText'

export const blockContentTypes = [
  {
    type: 'object',
    title: 'Rich Text',
    name: 'textBlock',
    // icon: RiText,
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
    type: 'badge',
  },
  {
    type: 'button',
  },
  // {
  //   type: 'carousel',
  // },
  {
    type: 'checklist',
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
    // inline edit form, skip modal
    // components: {
    //   block: (props) => {
    //     return props.renderDefault({
    //       ...props,
    //       renderPreview: () => props.children,
    //     })
    //   },
    // },
  },
  {
    type: 'logoCloud',
  },
  {
    type: 'servicesBlock',
  },
  {
    type: 'statsBlock',
  },
  {
    type: 'video',
  },
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
