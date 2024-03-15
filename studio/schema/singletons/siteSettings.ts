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
  // groups: [
  //   {
  //     title: 'Footer',
  //     name: 'footer',
  //   },
  //   {
  //     title: '404 Page',
  //     name: 'notFound',
  //   },
  // ],
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
      // group: 'seo',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Just another Sanity.io site',
      // group: 'seo',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'The root url of the site (e.g. https://www.sanity.io)',
      // group: 'seo',
      // readOnly: true,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
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
