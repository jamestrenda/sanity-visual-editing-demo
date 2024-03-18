import { defineField, defineType } from 'sanity'
import anchor from './anchor'
import { IconGrid } from '~/icons/grid'

export default defineType({
  title: 'Posts Grid',
  name: 'postsGrid',
  type: 'object',
  icon: IconGrid,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Posts Grid',
      }
    },
  },
  fields: [
    // defineField({
    //   title: 'Badge',
    //   name: 'badge',
    //   type: 'badge',
    // }),
    // defineField({
    //   title: 'Title',
    //   name: 'title',
    //   type: 'string',
    // }),
    // defineField({
    //   title: 'Text',
    //   name: 'text',
    //   type: 'portableText',
    // }),
    defineField({
      title: 'Posts',
      name: 'posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
    }),
    anchor,
  ],
})
