import { defineField, defineType } from 'sanity'
import { IconFile } from '~/icons/file'
import { blockContentTypes } from './objects/blockContent'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: IconFile,
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ],
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: { collapsible: false },
    },
  ],
  preview: {
    select: {
      title: 'postTitle',
      slug: 'slug',
    },
    prepare: ({
      title = 'Untitled',
      slug = { current: '' },
    }: {
      title?: string
      slug?: { current: string }
    }) => {
      const path = `/${slug.current}`

      return {
        title: `${title}`,
        subtitle: slug.current ? path : '(missing slug)',
        media: IconFile,
      }
    },
  },
  fields: [
    defineField({
      name: 'postTitle',
      title: 'Post Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: blockContentTypes.filter((block) => block.type !== 'hero'),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'imageObject',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'team' }],
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
    // title({ group: 'seo', fieldset: 'seo', required: false }),
    // slug({ group: 'seo', fieldset: 'seo', source: 'postTitle' }),
    // metaDescription({ group: 'seo', fieldset: 'seo' }),
  ],
})
