import { defineField, defineType } from 'sanity'
import { IconFAQ } from '~/icons/iconFAQ'
import anchor from './anchor'

export default defineType({
  title: 'FAQs',
  name: 'faqBlock',
  type: 'object',
  icon: IconFAQ,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Frequency Asked Questions',
        subtitle: 'FAQs',
      }
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Text',
      name: 'text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      title: 'FAQs',
      name: 'faqs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faq' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
    anchor,
  ],
})
