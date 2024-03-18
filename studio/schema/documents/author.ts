import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'teamMember',
      title: 'Team Member',
      type: 'reference',
      to: [{ type: 'team' }],
    }),
  ],
})
