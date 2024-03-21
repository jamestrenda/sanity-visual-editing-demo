import { defineField } from 'sanity'

export default defineField({
  name: 'value',
  title: 'Anchor',
  type: 'string',
  description: 'An anchor to link to within the same page.',
  validation: (Rule) =>
    Rule.custom((anchor) => {
      // validate the anchor against the HTML5 spec
      if (anchor && !/^[a-z][a-z0-9:_-]*$/.test(anchor)) {
        return 'Anchor must be a valid HTML5 id'
      }

      return true
    }),
})
