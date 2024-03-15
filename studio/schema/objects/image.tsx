import { defineField, defineType } from 'sanity'

import { IconInfo } from '~/icons/info'
import { TextInputWithCharCount } from '~/components/TextInputWithCharCount'

export default defineType({
  name: 'imageObject',
  title: 'Image',
  type: 'object',
  preview: {
    select: {
      title: 'image.asset.originalFilename',
      subtitle: 'altText',
      altText: 'image.asset.altText',
      media: 'image',
    },
    prepare({ title, subtitle, altText, media }) {
      return {
        title: title ?? 'Untitled',
        subtitle: subtitle ?? altText ?? '',
        media,
      }
    },
  },
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      // title: 'Alt Text and Captions',
      description:
        'Alt text can be set on assets directly from within the Media Library.',
      name: 'imageNote',
      type: 'note',
      options: {
        icon: () => <IconInfo />,
        tone: 'primary',
      },
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description:
        "Overrides the asset's alt text for this instance only. If blank, the alt text set on the asset itself will be used.",
      components: {
        field: (props) => <TextInputWithCharCount max={120} {...props} />,
      },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description:
        'A caption for the image. This will be displayed below the image.',
      components: {
        field: (props) => <TextInputWithCharCount max={120} {...props} />,
      },
    }),
  ],
})
