import { defineField, defineType } from 'sanity'
import { TextInputWithCharCount } from '../../components/TextInputWithCharCount'
import anchor from './anchor'

export default defineType({
  name: 'ctaBlock',
  title: 'Call to Action',
  type: 'object',
  groups: [
    {
      title: 'Background',
      name: 'background',
    },
    {
      title: 'Buttons',
      name: 'buttons',
    },
    {
      title: 'Style',
      name: 'style',
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
    defineField({
      name: 'primaryCTA',
      title: 'Primary Call to Action',
      type: 'link',
      group: 'buttons',
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary Call to Action',
      type: 'link',
      group: 'buttons',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'object',
      group: 'style',
      fields: [
        defineField({
          name: 'fullHeight',
          title: 'Full Height',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    anchor,
  ],
})
