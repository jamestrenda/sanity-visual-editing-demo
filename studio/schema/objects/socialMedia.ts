import { defineType } from 'sanity'

export default defineType({
  name: 'socialMedia',
  title: 'Social Media',
  type: 'object',
  description:
    'Enter URLs for your social media profiles. Leave blank to hide.',
  fields: [
    {
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    },
    {
      name: 'x',
      title: 'X',
      type: 'url',
    },
    {
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
    },
  ],
})
