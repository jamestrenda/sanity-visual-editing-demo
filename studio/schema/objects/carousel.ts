import { defineField, defineType } from 'sanity'
import anchor from './anchor'
import { IconImages } from '~/icons/images'

export default defineType({
  title: 'Carousel',
  name: 'carousel',
  type: 'object',
  icon: IconImages,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Carousel',
      }
    },
  },
  fields: [
    defineField({
      title: 'Slides',
      name: 'slides',
      type: 'array',
      of: [
        {
          type: 'imageObject',
        },
        {
          type: 'video',
        },
      ],
    }),
    anchor,
  ],
})
