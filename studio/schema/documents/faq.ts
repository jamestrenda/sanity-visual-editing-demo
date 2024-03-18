import { defineField, defineType } from 'sanity'
import { IconFAQ } from '~/icons/iconFAQ'

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
      type: 'portableText',
    }),
  ],
})
