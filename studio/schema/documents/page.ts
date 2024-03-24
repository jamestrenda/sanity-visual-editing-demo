import { defineField, defineType } from 'sanity'
import { IconFile } from '~/icons/file'
import { IconHome } from '~/icons/home'
import { slugField as slug } from '../objects/slug'
import { titleField as title } from '../objects/title'
import { IconInfo } from '~/icons/info'
import { IconRSS } from '~/icons/rss'

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
      name: 'content',
      title: 'Content',
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
      isPostsPage: 'isPostsPage',
    },
    prepare: ({
      title = 'Untitled',
      slug = { current: '' },
      isFrontpage,
      isPostsPage,
    }: {
      title?: string
      slug?: { current: string }
      isFrontpage?: boolean
      isPostsPage?: boolean
    }) => {
      const path = `/${slug.current}`

      return {
        title: `${title}${isFrontpage ? ' (Front Page)' : isPostsPage ? ' (Posts Page)' : ''}`,
        subtitle: isFrontpage
          ? undefined
          : slug.current
            ? path
            : '(missing slug)',
        media: isFrontpage ? IconHome : isPostsPage ? IconRSS : IconFile,
      }
    },
  },
  fields: [
    title({}),
    slug({}),
    defineField({
      name: 'hero',
      type: 'hero',
      // group: ['content'],
    }),
    defineField({
      name: 'blogPageNote',
      type: 'note',
      description:
        'This page is the Posts Page. It will automatically list the latest blog posts. Additional content can displayed below the posts section by adding blocks to the Body.',
      group: ['content'],
      options: {
        icon: IconInfo,
        tone: 'primary',
      },
      hidden: ({ parent }) => !parent.isPostsPage,
    }),
    defineField({
      name: 'pageBuilder',
      type: 'pageBuilder',
      title: 'Body',
      group: ['content'],
    }),
    defineField({
      name: 'isFrontpage',
      hidden: true,
      type: 'boolean',
      readOnly: true,
    }),
    defineField({
      name: 'isPostsPage',
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
