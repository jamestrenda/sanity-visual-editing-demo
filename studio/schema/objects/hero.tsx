import { ValidationContext, defineField, defineType } from 'sanity'
import { TextInputWithCharCount } from '../../components/TextInputWithCharCount'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  groups: [
    {
      title: 'Background',
      name: 'background',
    },
    {
      title: 'Call to Action',
      name: 'cta',
    },
    {
      title: 'Style',
      name: 'style',
    },
  ],
  fields: [
    defineField({
      name: 'badge',
      type: 'badge',
      hidden: ({ parent }) => parent?.hideHero,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      components: {
        field: (props) => (
          <TextInputWithCharCount min={30} max={65} {...props} />
        ),
      },
      hidden: ({ parent }) => parent?.hideHero,
      validation: (Rule) =>
        Rule.custom((title, context: ValidationContext) => {
          // @ts-ignore
          const { hideHero } = context.parent

          if (hideHero) {
            // don't require the title if the hero is hidden
            return true
          }
          if (title) return true
          return 'Required'
        }),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      hidden: ({ parent }) => parent?.hideHero,
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      group: 'background',
      hidden: ({ parent }) => parent?.hideHero,
    }),
    defineField({
      name: 'mp4',
      title: 'MP4 Video URL',
      type: 'url',
      group: 'background',
      hidden: ({ parent }) => parent?.hideHero,
    }),
    defineField({
      name: 'webm',
      title: 'WEBM Video URL',
      type: 'url',
      group: 'background',
      hidden: ({ parent }) => parent?.hideHero,
    }),
    defineField({
      name: 'primaryCTA',
      title: 'Primary Call to Action',
      type: 'link',
      group: 'cta',
      hidden: ({ parent }) => parent?.hideHero,
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary Call to Action',
      type: 'link',
      group: 'cta',
      hidden: ({ parent }) => parent?.hideHero,
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'object',
      group: 'style',
      fields: [
        defineField({
          name: 'fullHeight',
          title: 'Full Height',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      hidden: ({ parent }) => parent?.hideHero,
    }),
    defineField({
      title: 'Hide hero section?',
      description:
        'Hide the hero on this page and use the page title as the primary heading (h1) on the page.',
      name: 'hideHero',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
