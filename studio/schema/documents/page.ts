import { defineField, defineType } from 'sanity'
import { IconFile } from '~/icons/file'
import { IconHome } from '~/icons/home'
import { slugField as slug } from '../objects/slug'
import { titleField as title } from '../objects/title'
import pageBuilder from '../objects/pageBuilder'

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
      name: 'sections',
      title: 'Sections',
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
      title: 'Sections',
      group: ['sections'],
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
