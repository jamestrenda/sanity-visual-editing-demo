import { defineField, defineType } from 'sanity'
import { IconFile } from '~/icons/file'
import { blockContentTypes } from './objects/blockContent'
import { slugField } from './objects/slug'
import { titleField } from './objects/title'

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
      title: 'title',
      slug: 'slug',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      category: 'category.name',
    },
    prepare: ({
      title = 'Untitled',
      slug = { current: '' },
      authorFirstName,
      authorLastName,
      category,
    }: {
      title?: string
      slug?: { current: string }
      authorFirstName?: string
      authorLastName?: string
      category?: string
    }) => {
      const path = `/${slug.current}`

      return {
        title: `${title}`,
        subtitle:
          authorFirstName && authorLastName
            ? `by ${authorFirstName} ${authorLastName}${category ? ` in ${category}` : ''}`
            : undefined,
        media: IconFile,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField({}),
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
