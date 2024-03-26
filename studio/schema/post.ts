import { defineField, defineType } from 'sanity'
import { IconFile } from '~/icons/file'
import { blockContentTypes } from './objects/blockContent'
import { slugField } from './objects/slug'
import PageBuilderInput from '~/components/PageBuilderInput'

// Title
// Category
// Date
// Social Share Links (Facebook, Twitter, LinkedIn, Pinterest, Email)
// Author?
// -- Avatar
// -- Full Name
// -- position
// Tags?
// SEO (Meta Title, Meta Description, Meta Keywords, Canonical URL, Robots, Open Graph

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: IconFile,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'metadata',
      title: 'Metadata',
    },
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
      name: 'teaser',
      title: 'Article Teaser',
      description:
        'A short description of the article that will be displayed in blog listings. If left blank, the first few sentences of the article will be used.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: blockContentTypes.filter((block) =>
        [
          // 'badge',
          // 'button',
          'ctaBlock',
          'imageObject',
          'logoCloud',
          'textBlock',
          'reference',
          'statsBlock',
          'video',
        ].includes(String(block.type === 'object' ? block.name : block.type)),
      ),
      validation: (Rule) => Rule.required(),
      components: {
        input: PageBuilderInput,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'metadata',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'imageObject',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'metadata',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'team' }],
      options: {
        disableNew: true,
      },
      group: 'metadata',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
    // title({ group: 'seo', fieldset: 'seo', required: false }),
    // slug({ group: 'seo', fieldset: 'seo', source: 'postTitle' }),
    // metaDescription({ group: 'seo', fieldset: 'seo' }),
  ],
})
