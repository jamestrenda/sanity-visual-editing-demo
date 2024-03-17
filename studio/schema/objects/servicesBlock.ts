import { defineField, defineType } from 'sanity'
import { IconBullseye } from '~/icons/bullseye'

export default defineType({
  title: 'Services',
  name: 'servicesBlock',
  type: 'object',
  icon: IconBullseye,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Services',
      }
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Text',
      name: 'text',
      type: 'portableText',
    }),
    defineField({
      title: 'Services',
      name: 'services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
  ],
})
