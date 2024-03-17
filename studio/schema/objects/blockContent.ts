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
      type: 'badge',
    },
    {
      type: 'button',
    },
    {
      type: 'faqBlock',
    },
    {
      type: 'hero',
    },
    {
      type: 'iconList',
    },
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
      type: 'servicesBlock',
    },
    {
      type: 'video',
    },
  ],
  components: {
    input: PageBuilderInput,
  },
})
