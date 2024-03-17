import { defineArrayMember, defineField, defineType } from 'sanity'
import { IconCircleCheck } from '~/icons/circleCheck'
import { portableTextBlocks } from './portableText'

export default defineType({
  title: 'Icon List',
  name: 'iconList',
  type: 'object',
  icon: IconCircleCheck,
  preview: {
    prepare() {
      return {
        title: 'Icon List',
      }
    },
  },
  fields: [
    defineField({
      title: 'List Items',
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          icon: IconCircleCheck,
          fields: [
            defineField({
              title: 'Item',
              name: 'item',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  title: 'Block',
                  styles: [],
                  lists: [],
                  // Marks let you mark up inline text in the block editor.
                  marks: portableTextBlocks.marks,
                }),
              ],
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
      // options: {}

      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
