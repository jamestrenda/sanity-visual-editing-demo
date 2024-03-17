import { defineField, defineType } from 'sanity'
import { IconVideo } from '~/icons/video'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  icon: IconVideo,
  fields: [
    defineField({
      name: 'url',
      description: 'TODO: use Wistia plugin?',
      title: 'Url',
      type: 'url',
    }),
  ],
})
