import { defineField } from 'sanity'
import { IconCompass } from '~/icons/compass'

export const menuUIOptions = ['mega', 'flyout'] as const

export default {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: IconCompass,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      description:
        'Depending on the UI, this title may or may not be displayed. For example, no title will be displayed in the header menu, but titles will be displayed in footer menus.',
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'menuItem',
        },
      ],
      validation: (Rule) => [Rule.min(1)],
    }),
  ],
}
