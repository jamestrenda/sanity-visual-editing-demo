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
        'Overrides the title of the page for display in search engine results.',
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
        'Provide a brief summary your content for search engine results pages (SERPs) and to give the user an idea of the content that exists within the page or site and how it relates to their search query.',
    }),
  ],
}
