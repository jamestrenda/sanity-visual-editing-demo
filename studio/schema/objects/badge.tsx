import { defineField, defineType } from 'sanity'
import { TextInputWithCharCount } from '../../components/TextInputWithCharCount'

export default defineType({
  name: 'badge',
  title: 'Badge',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      components: {
        field: (props) => <TextInputWithCharCount max={20} {...props} />,
      },
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      components: {
        field: (props) => <TextInputWithCharCount max={40} {...props} />,
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
})
