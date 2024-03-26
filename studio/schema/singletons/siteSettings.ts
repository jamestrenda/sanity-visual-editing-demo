import { defineField, defineType } from 'sanity'
import { IconGear } from '../../icons/gear'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: IconGear,
  preview: {
    select: {
      title: 'siteTitle',
      media: 'favicon',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Site Settings',
        media,
      }
    },
  },
  fieldsets: [
    {
      name: 'favicon',
      title: 'Favicon',
      options: {
        collapsible: true,
        collapsed: false,
      },
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
      description:
        'The title that is displayed in the title bar of Web browsers and in search engine results pages (SERPs). If blank, the company name under Company Info will be used.',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description:
        'Used for sitemap and canonical URLs (e.g. https://www.sanity.io).',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }).required(),
      // readOnly: true,
    }),
    defineField({
      name: 'favicon',
      title: 'File',
      type: 'image',
      fieldset: 'favicon',
      description: 'Upload a favicon for your site.',
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
    }),
    defineField({
      name: 'postsPage',
      type: 'reference',
      description: 'Choose the page that will display the latest blog posts.',
      to: { type: 'page' },
      options: {
        filter: '!defined(isFrontpage) || isFrontpage == false',
      },
    }),
    defineField({
      name: 'postsPerPage',
      type: 'number',
      description: 'How many posts should be displayed per page?',
      initialValue: 12,
      options: {
        list: [3, 6, 12, 15],
      },
    }),
    defineField({
      name: 'headerMenu',
      title: 'Header Menu',
      type: 'reference',
      to: { type: 'menu' },
    }),
    defineField({
      name: 'footerMenus',
      title: 'Footer Menus',
      type: 'array',
      of: [
        // defineField({
        //   name: 'menuLink',
        //   type: 'object',
        //   icon: IconCompass,
        //   preview: {
        //     select: {
        //       title: 'link.linkText',
        //     },
        //     prepare({ title }) {
        //       return {
        //         title,
        //       }
        //     },
        //   },
        //   fields: [
        //     defineField({
        //       name: 'link',
        //       type: 'link',
        //     }),
        //   ],
        // }),
        {
          type: 'reference',
          title: 'Menu',
          to: [{ type: 'menu' }],
        },
      ],
    }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Site Verification',
      type: 'string',
      description:
        'To enable Google Search Console, enter your Verification ID.',
    }),
    defineField({
      title: 'Google Tag Manager (GTM)',
      description: 'To enable GTM, enter your Container ID',
      name: 'gtmID',
      type: 'string',
    }),
    defineField({
      title: 'Maintenance Mode',
      description:
        'Enable maintenance mode to show a maintenance page instead of the site.',
      name: 'maintenanceMode',
      type: 'boolean',
      initialValue: false,
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
