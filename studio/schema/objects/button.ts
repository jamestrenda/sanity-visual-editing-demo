import { defineField, defineType } from 'sanity'
import { IconButton } from '~/icons/button'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: IconButton,
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
})
