import { defineField, defineType } from 'sanity'
import { IconFAQ } from '~/icons/iconFAQ'
import { portableTextBlocks } from '../objects/portableText'
import anchor from '../objects/anchor'

export default defineType({
  title: 'FAQ',
  name: 'faq',
  icon: IconFAQ,
  type: 'document',
  fields: [
    defineField({
      title: 'Question',
      name: 'question',
      type: 'string',
    }),
    defineField({
      title: 'Answer',
      name: 'answer',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          marks: {
            decorators: portableTextBlocks.marks?.decorators,
            annotations: portableTextBlocks.marks?.annotations?.filter(
              (annotation) => annotation.name !== 'anchorLink',
            ),
          },
        },
      ],
    }),
    anchor,
  ],
})
