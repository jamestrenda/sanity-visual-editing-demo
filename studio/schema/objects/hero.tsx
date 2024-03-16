import { defineField, defineType } from 'sanity'
import { TextInputWithCharCount } from '../../components/TextInputWithCharCount'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  groups: [
    {
      title: 'Background',
      name: 'background',
    },
  ],
  fields: [
    defineField({
      name: 'badge',
      type: 'badge',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      components: {
        field: (props) => (
          <TextInputWithCharCount min={30} max={65} {...props} />
        ),
      },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      group: 'background',
    }),
    defineField({
      name: 'mp4',
      title: 'MP4 Video URL',
      type: 'url',
      group: 'background',
    }),
    defineField({
      name: 'webm',
      title: 'WEBM Video URL',
      type: 'url',
      group: 'background',
    }),
  ],
})
