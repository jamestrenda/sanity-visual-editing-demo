import { defineField, defineType } from 'sanity'

import { IconInfo } from '../../icons/info'
import { TextInputWithCharCount } from '../../components/TextInputWithCharCount'
import { IconImage } from '~/icons/image'
import anchor from './anchor'

export default defineType({
  name: 'imageObject',
  title: 'Image',
  type: 'object',
  icon: IconImage,
  preview: {
    select: {
      title: 'image.asset.originalFilename',
      subtitle: 'altText',
      caption: 'caption',
      altText: 'image.asset.altText',
      media: 'image',
    },
    prepare({ title, subtitle, altText, caption, media }) {
      return {
        title: title ?? 'Untitled',
        subtitle: caption ?? subtitle ?? altText ?? '',
        media,
      }
    },
  },
  fields: [
    defineField({
      name: 'image',
      title: 'File',
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
    anchor,
  ],
})
