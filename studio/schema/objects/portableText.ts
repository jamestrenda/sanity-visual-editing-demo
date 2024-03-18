import { HighlightIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import HighlightDecorator from '~/components/HighlightDecorator'
import { IconAnchor } from '~/icons/anchor'
import { IconArrowUpRightFromSquare } from '~/icons/arrowUpRightFromSquare'
import { IconLink } from '~/icons/link'

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
      {
        title: 'Highlight',
        value: 'highlight',
        icon: HighlightIcon,
        component: HighlightDecorator,
      },
    ],
    // Annotations can be any object structure – e.g. a link or a footnote.
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
        name: 'anchor',
        icon: IconAnchor,
        fields: [
          {
            type: 'string',
            name: 'value',
            title: 'Anchor',
          },
        ],
      },
    ],
  },
})

export default defineType({
  name: 'portableText',
  type: 'array',
  of: [portableTextBlocks],
})
