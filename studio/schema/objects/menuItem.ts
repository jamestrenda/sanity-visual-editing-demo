import { defineField, defineType } from 'sanity'
import { IconArrowUpRightFromSquare } from '~/icons/arrowUpRightFromSquare'
import { IconLink } from '~/icons/link'

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  preview: {
    select: {
      title: 'link.linkText',
      type: 'link.link[0]._type',
    },
    prepare: ({ title, type }) => {
      return {
        title: title || 'Untitled',
        media: type === 'linkInternal' ? IconLink : IconArrowUpRightFromSquare,
      }
    },
  },
  fields: [
    defineField({
      name: 'link',
      title: 'Menu Item',
      type: 'link',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        'Add some supporting text to help users understand this menu item. Depending on the UI, this description may or may not be displayed in the menu.',
      type: 'string',
    }),
  ],
})
