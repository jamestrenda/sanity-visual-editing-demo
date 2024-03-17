import { defineField, defineType } from 'sanity'
import { IconFile } from '~/icons/file'
import { IconHome } from '~/icons/home'
import { slugField as slug } from '../objects/slug'
import { titleField as title } from '../objects/title'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  groups: [
    {
      name: 'body',
      title: 'Body',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'social',
      title: 'Social',
    },
  ],
  icon: IconFile,
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      isFrontpage: 'isFrontpage',
    },
    prepare: ({
      title = 'Untitled',
      slug = { current: '' },
      isFrontpage,
    }: {
      title?: string
      slug?: { current: string }
      isFrontpage?: boolean
    }) => {
      const path = `/${slug.current}`

      return {
        title: `${title}${isFrontpage ? ' (Frontpage)' : ''}`,
        subtitle: slug.current ? path : '(missing slug)',
        media: isFrontpage ? IconHome : IconFile,
      }
    },
  },
  fields: [
    title({}),
    slug({}),
    defineField({
      name: 'pageBuilder',
      type: 'pageBuilder',
      title: 'Body',
      group: ['body'],
    }),
    defineField({
      name: 'isFrontpage',
      hidden: true,
      type: 'boolean',
      readOnly: true,
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: ['seo'],
    }),
    // {
    //   name: 'openGraph',
    //   type: 'og',
    //   group: ['social'],
    // },
  ],
})
