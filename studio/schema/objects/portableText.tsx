import { HighlightIcon } from '@sanity/icons'
import { defineArrayMember, defineType } from 'sanity'
import HighlightDecorator from '~/components/HighlightDecorator'
import { IconAnchor } from '~/icons/anchor'
import { IconArrowUpRightFromSquare } from '~/icons/arrowUpRightFromSquare'
import { IconLink } from '~/icons/link'
import anchor from './anchor'
import CheckListDecorator from '~/components/CheckListDecorator'

export const portableTextBlocks = defineArrayMember({
  type: 'block',
  title: 'Block',
  // Styles let you set what your user can mark up blocks with. These
  // corrensponds with HTML tags, but you can set any title or value
  // you want and decide how you want to deal with it where you want to
  // use your content.
  styles: [
    { title: 'Normal', value: 'normal' },
    // {title: 'H1', value: 'h1'},
    { title: 'H2', value: 'h2' },
    { title: 'H3', value: 'h3' },
    { title: 'H4', value: 'h4' },
    { title: 'H5', value: 'h5' },
    { title: 'Quote', value: 'blockquote' },
  ],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Number', value: 'number' },
    {
      title: 'Check',
      value: 'check',
      icon: () => '✅',
      component: CheckListDecorator,
    },
  ],
  // Marks let you mark up inline text in the block editor.
  marks: {
    // Decorators usually describe a single property – e.g. a typographic
    // preference or highlighting by editors.
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Underline', value: 'underline' },
      { title: 'Strike', value: 'strike-through' },
      // {
      //   title: 'Align Center',
      //   value: 'text-center',
      //   icon: IconAlignCenter,
      //   component: (props) => {
      //     console.log('props', props)
      //     return (
      //       <div
      //         style={{
      //           textAlign: 'center',
      //         }}
      //       >
      //         {props.children}
      //       </div>
      //     )
      //   },
      // },
      {
        title: 'Highlight',
        value: 'highlight',
        icon: HighlightIcon,
        component: HighlightDecorator,
      },
    ],
    // Annotations can be any object structure – e.g. a link or a footnote.
    // Add link styles components
    annotations: [
      {
        name: 'internalLink',
        type: 'object',
        title: 'Internal link',
        icon: IconLink,
        fields: [
          {
            title: ' ',
            name: 'linkInternal',
            type: 'linkInternal',
          },
        ],
      },
      {
        name: 'externalLink',
        type: 'object',
        title: 'External link',
        icon: IconArrowUpRightFromSquare,
        fields: [
          {
            title: ' ',
            name: 'linkExternal',
            type: 'linkExternal',
          },
        ],
      },
      {
        type: 'object',
        name: 'anchorLink',
        icon: IconAnchor,
        fields: [anchor],
      },
    ],
  },
})

export default defineType({
  name: 'portableText',
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
      type: 'imageObject',
      title: 'Image',
    },
  ],
})
