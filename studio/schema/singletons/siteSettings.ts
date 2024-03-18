import { defineField, defineType } from 'sanity'
import { IconGear } from '../../icons/gear'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: IconGear,
  initialValue: {
    title: 'Company Name',
    tagline: 'Just another Sanity.io site',
  },
  groups: [
    {
      title: 'Site',
      name: 'site',
    },
    // {
    //   title: 'Company',
    //   name: 'company',
    // },
    // {
    //   title: 'Social',
    //   name: 'social',
    // },
    {
      title: 'Anayltics',
      name: 'analytics',
    },
  ],
  // fieldsets: [
  //   {
  //     name: 'footer',
  //     title: 'Footer',
  //     options: {
  //       collapsible: true,
  //     },
  //   },
  //   {
  //     name: 'notFound',
  //     title: '404 Page',
  //     options: {
  //       collapsible: true,
  //       collapsed: false,
  //     },
  //   },
  // ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      group: 'site',
      description:
        'The title that is displayed in the title bar of Web browsers and in search engine results pages (SERPs). If blank, the company name under Company Info will be used.',
    }),
    // defineField({
    //   name: 'tagline',
    //   title: 'Tagline',
    //   type: 'string',
    //   initialValue: 'Just another Sanity.io site',
    //   group: 'site',
    // }),
    // defineField({
    //   name: 'logo',
    //   title: 'Logo',
    //   type: 'image',
    //   group: 'site',
    // }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description:
        'Used for sitemap and canonical URLs (e.g. https://www.sanity.io).',
      group: 'site',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }).required(),
      // readOnly: true,
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'site',
    }),
    defineField({
      name: 'frontpage',
      title: 'Front Page',
      type: 'reference',
      description: 'Choose the page to be the frontpage of the site',
      to: { type: 'page' },
      options: {
        filter: '!defined(isPostsPage) || isPostsPage == false',
      },
      group: 'site',
    }),
    defineField({
      name: 'postsPage',
      type: 'reference',
      description: 'Choose the page that will display the latest blog posts.',
      to: { type: 'page' },
      options: {
        filter: '!defined(isFrontpage) || isFrontpage == false',
      },
      group: 'site',
    }),
    defineField({
      name: 'postsPerPage',
      type: 'number',
      description: 'How many posts should be displayed per page?',
      initialValue: 12,
      options: {
        list: [3, 6, 12, 15],
      },
      group: 'site',
    }),
    // defineField({
    //   name: 'address',
    //   title: 'Address',
    //   type: 'address',
    //   group: 'company',
    // }),
    // defineField({
    //   name: 'phone',
    //   title: 'Phone',
    //   type: 'string',
    //   group: 'company',
    // }),
    // defineField({
    //   name: 'email',
    //   title: 'Email',
    //   type: 'email',
    //   group: 'company',
    // }),
    // defineField({
    //   name: 'socialMedia',
    //   title: 'Social Media',
    //   type: 'socialMedia',
    //   group: 'social',
    // }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Site Verification',
      type: 'string',
      description:
        'To enable Google Search Console, enter your Verification ID.',
      group: 'analytics',
    }),
    defineField({
      title: 'Google Tag Manager (GTM)',
      description: 'To enable GTM, enter your Container ID',
      name: 'gtmID',
      type: 'string',
      group: 'analytics',
    }),
    defineField({
      title: 'Maintenance Mode',
      description:
        'Enable maintenance mode to show a maintenance page instead of the site.',
      name: 'maintenanceMode',
      type: 'boolean',
      initialValue: false,
      group: 'site',
    }),
    // defineField({
    //   name: 'footerMenu',
    //   title: 'Footer Menu',
    //   type: 'array',
    //   of: [{ type: 'navItem' }],
    //   validation: (Rule) => Rule.min(1),
    //   fieldset: 'footer',
    //   group: 'footer',
    // }),
    // defineField({
    //   name: 'notFoundImage',
    //   title: 'Background Image',
    //   type: 'imageObject',
    //   group: 'notFound',
    //   fieldset: 'notFound',
    // }),
    // defineField({
    //   name: 'notFoundQuickLinks',
    //   title: 'Quick Links',
    //   type: 'array',
    //   of: [{ type: 'link' }],
    //   group: 'notFound',
    //   fieldset: 'notFound',
    // }),
  ],
})
