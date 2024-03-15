import { defineField, defineType } from 'sanity'
import { IconHome } from '../../icons/home'

export default defineType({
  name: 'home',
  title: 'Homepage',
  type: 'document',
  icon: IconHome,
  groups: [
    {
      title: 'Hero',
      name: 'hero',
    },
  ],
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero',
      options: {
        collapsible: true,
      },
    },
    //   {
    //     name: 'notFound',
    //     title: '404 Page',
    //     options: {
    //       collapsible: true,
    //       collapsed: false,
    //     },
    //   },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
      fieldset: 'hero',
      group: 'hero',
    }),
  ],
})
