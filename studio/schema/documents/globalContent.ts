import { defineField, defineType } from 'sanity'
import PageBuilderInput from '~/components/PageBuilderInput'
import { IconGlobe } from '~/icons/globe'
import { IconText } from '~/icons/text'

export default defineType({
  name: 'globalContent',
  title: 'Global Content',
  type: 'document',
  icon: IconGlobe,
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => {
      return {
        title: title || 'Untitled',
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'block',
      type: 'array',
      validation: (Rule) => Rule.min(1).max(1),
      title: 'Content',
      of: [
        {
          type: 'ctaBlock',
        },
        {
          type: 'logoCloud',
        },
        {
          type: 'postsGrid',
        },
        {
          type: 'statsBlock',
        },
        {
          type: 'teamGrid',
        },
        {
          name: 'textBlock',
          title: 'Text Block',
          type: 'object',
          icon: IconText,
          preview: {
            prepare() {
              return {
                title: 'Text Block',
              }
            },
          },
          fields: [
            defineField({
              title: 'Portable Text',
              name: 'portableText',
              type: 'portableText',
            }),
          ],
        },
      ],
      components: {
        input: PageBuilderInput,
      },
    }),
  ],
})
