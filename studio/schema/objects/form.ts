import { defineField, defineType } from 'sanity'
import { IconPlane } from '~/icons/plane'
import { capitalize } from '~/lib/misc'

export const formTypes = ['contact', 'newsletter'] as const

export default defineType({
  name: 'form',
  type: 'object',
  title: 'Form',
  icon: IconPlane,
  preview: {
    select: {
      title: 'type',
    },
    prepare({ title }) {
      return {
        title: title ? `${capitalize(title)} Form` : 'Form',
      }
    },
  },
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: ' ',
      description: 'Select a form',
      options: {
        list: [
          ...formTypes.map((type) => ({
            title: capitalize(type),
            value: type,
          })),
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
