import type { ValidationContext } from 'sanity'
import { defineField, defineType } from 'sanity'
import { PAGE_TYPES } from '../../utils/constants'

import { IconLink } from '../../icons/link'

export default defineType({
  title: 'Internal Link',
  name: 'linkInternal',
  type: 'object',
  icon: IconLink,
  preview: {
    select: {
      slug: 'reference.slug.current',
      title: 'reference.title',
      anchor: 'anchor',
    },
    prepare({ title, slug, anchor }) {
      return {
        title: title ? title : anchor ? `#${anchor}` : undefined,
        subtitle: slug ? `/${slug}${anchor ? `#${anchor}` : ''}` : undefined,
        media: IconLink,
      }
    },
  },
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Page',
      validation: (Rule) =>
        Rule.custom((page, context: ValidationContext) => {
          const parent = context.parent
          if (!page && !Object.hasOwn(parent as object, 'anchor')) {
            return 'Page or anchor must be defined'
          }
          return true
        }),
      to: [...PAGE_TYPES].map((type) => ({
        type,
      })),
      options: {
        disableNew: true,
        filter: '!(_id in path("drafts.**"))',
      },
    },
    defineField({
      name: 'anchor',
      title: 'Anchor',
      type: 'string',
      description: 'The ID of the HTML element to link to',
    }),
  ],
})
