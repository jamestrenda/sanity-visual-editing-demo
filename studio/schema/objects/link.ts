import { defineField, defineType } from 'sanity'

import { IconFile } from '../../icons/file'
import { IconLink } from '../../icons/link'
import { IconArrowUpRightFromSquare } from '../../icons/arrowUpRightFromSquare'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  preview: {
    select: {
      title: 'linkText',
      type: 'link[0]._type',
    },
    prepare({ title, type }) {
      return {
        title,
        media: type === 'linkInternal' ? IconFile : IconArrowUpRightFromSquare,
      }
    },
  },
  icon: IconLink,
  fields: [
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link To',
      description: 'Select a page or an external URL.',
      type: 'array',
      of: [{ type: 'linkInternal' }, { type: 'linkExternal' }],
      validation: (Rule) => Rule.required().max(1),
    }),
  ],
})
