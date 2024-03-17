import { defineField, defineType } from 'sanity'
import { IconArrowUpRightFromSquare } from '~/icons/arrowUpRightFromSquare'
import { IconButton } from '~/icons/button'
import { IconFile } from '~/icons/file'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: IconButton,
  preview: {
    select: {
      title: 'link.linkText',
      type: 'link.link[0]._type',
      url: 'link.link[0].url',
      anchor: 'link.link[0].anchor',
      slug: 'link.link[0].reference.slug.current',
    },
    prepare({ title, url, slug, anchor }) {
      let subtitle = slug ? `/${slug}` : ''

      if (anchor) {
        subtitle += `#${anchor}`
      }

      // TODO: slug not showing up in subtitle for internal links
      return {
        title: title ?? 'No Button Text',
        subtitle: subtitle.length ? subtitle : url,
        media: IconButton,
      }
    },
  },
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
