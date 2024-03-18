import { defineField } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'
import { TextInputWithCharCount } from '~/components/TextInputWithCharCount'

export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    // defineField({
    //   title: 'Important!',
    //   description: 'a custom Message...',
    //   name: 'myCustomNote',
    //   type: 'note',
    //   options: {
    //     icon: () => <HelpCircleIcon fontSize={24} />,
    //   },
    // }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'Overrides the page title that appears in search engine results pages (SERPs).',
      components: {
        field: (props) => (
          <TextInputWithCharCount min={30} max={65} {...props} />
        ),
      },
      // initialValue: async (_, context) => {
      //   const client = context.getClient;
      //   const title = (await client({ apiVersion })?.fetch(
      //     `[@][].title`
      //   )) as string;

      //   return title || '';
      // },
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        "Briefly summarize what's on the page. What content exists on the page? How does it relate to the user's search query? This text is displayed under the page title on search engine results pages (SERPs). ",
    }),
  ],
}
