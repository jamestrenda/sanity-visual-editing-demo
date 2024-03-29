import { defineField, defineType } from 'sanity'
import { IconBullseye } from '~/icons/bullseye'

export default defineType({
  title: 'Service',
  name: 'service',
  icon: IconBullseye,
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
  ],
})
