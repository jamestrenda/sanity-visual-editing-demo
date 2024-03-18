import { defineField, defineType } from 'sanity'
import { AddressInput } from '~/components/AddressInput'

export default defineType({
  name: 'address',
  title: 'Address',
  type: 'object',
  components: {
    // @ts-ignore -- seems to work just fine. ¯\_(ツ)_/¯
    input: AddressInput,
  },
  fields: [
    defineField({
      name: 'street',
      title: 'Street',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'addressLine2',
    //   title: 'Line 2',
    //   type: 'string',
    // }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zip',
      title: 'Zip',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'country',
    //   title: 'Country',
    //   type: 'string',
    //   initialValue: 'US',
    // }),
  ],
})
