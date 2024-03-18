import { defineField, defineType } from 'sanity'
import { IconStats } from '~/icons/stats'

export default defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  icon: IconStats,
  preview: {
    select: {
      name: 'name',
      value: 'value',
      suffix: 'suffix',
      prefix: 'prefix',
    },
    prepare: ({ name, value, suffix = '', prefix = '' }) => {
      const title = ` ${name}: ${prefix}${value.toLocaleString('en-US', {
        maximumFractionDigits: 2,
      })}${suffix}`
      return {
        title,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prefix',
      type: 'string',
    }),
    defineField({
      name: 'suffix',
      type: 'string',
    }),
  ],
})
