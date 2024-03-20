import { defineField, defineType } from 'sanity'
import { IconBuilding } from '~/icons/building'

export default defineType({
  name: 'company',
  title: 'Company Info',
  type: 'document',
  icon: IconBuilding,
  preview: {
    select: {
      media: 'logo',
    },
    prepare({ media }) {
      return {
        title: 'Company Info',
        media,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Just another Sanity.io site',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'address',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'socialMedia',
    }),
  ],
})
