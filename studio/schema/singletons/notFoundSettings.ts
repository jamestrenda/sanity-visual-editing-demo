import { defineField, defineType } from 'sanity'
import { IconGear } from '../../icons/gear'
import { portableTextBlocks } from '../objects/portableText'

export default defineType({
  name: 'notFoundSettings',
  title: '404 Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      // initialValue: 'Page Not Found',
      // readOnly: true,
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: portableTextBlocks.marks?.annotations?.filter(
              (annotation) => annotation.name !== 'anchor',
            ),
            decorators: portableTextBlocks.marks?.decorators,
          },
        },
      ],
      description: 'The text to display under the title on the 404 page.',
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [{ type: 'link' }],
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
