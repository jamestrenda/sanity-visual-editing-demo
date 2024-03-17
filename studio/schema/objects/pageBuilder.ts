import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Page Builder',
  name: 'pageBuilder',
  type: 'array',
  of: [
    {
      type: 'object',
      title: 'Sections',
      name: 'section',
      preview: {
        select: {
          block: 'blocks[0].title',
          title: 'title',
        },
        prepare({ title, block }) {
          return {
            title: title || block || 'Untitled',
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
          title: 'Blocks',
          name: 'blocks',
          type: 'blockContent',
          // type: 'array',
          // of: [{ type: 'blockContent' }],
        }),
      ],
    },
  ],
})
