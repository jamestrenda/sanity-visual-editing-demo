import { HashIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { slugField } from '../objects/slug'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: HashIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField({ source: 'name' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      // validation: (Rule) => Rule.required(),
    }),
  ],
})
