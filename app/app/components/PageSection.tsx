import React from 'react'
import { Block, BlockType } from '~/types/block'
import LogoCloud from './LogoCloud'
import PortableTextBlock from './PortableText'
import { Button } from './Button'
import Image from './Image'
import Badge from './Badge'
import { FAQ } from './FAQ'
import CallToAction from './CallToAction'
import Team from './Team'
import Stats from './Stats'
import { m } from 'framer-motion'
import { variants } from '~/utils/misc'

// the different blocks that can be added to pages and posts in the body field
// are determined by the sanity schema, but the React components that render each of those
// blocks are defined here.
const blocksMap = {
  badge: Badge,
  textBlock: PortableTextBlock,
  button: Button,
  ctaBlock: CallToAction,
  imageObject: Image,
  logoCloud: LogoCloud,
  faq: FAQ,
  statsBlock: Stats,
  teamGrid: Team,
}

export type Props = {
  _type: BlockType
  component: (typeof blocksMap)[BlockType]
}

/**
 *
 *  Renders a page builder block based on the _type property.
 */
export const SectionBlock = ({ block }: { block: Block }) => {
  const { _type } = block

  const SectionComponent = blocksMap[_type] as React.FC<any>

  // I would prefer to do someting like this:
  // const MotionComponent = m(SectionComponent)
  // and then use <MotionComponent /> below,
  // but that seems to break the app with an error message:
  // "Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"
  // so I'm using the m.div wrapper below instead for now..

  switch (_type) {
    case 'button':
      return (
        <m.div
          variants={variants()}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionComponent {...block.link} className="text-center peer">
            {block.link.linkText}
          </SectionComponent>
        </m.div>
      )
    case 'imageObject':
      const props = {
        source: block.image,
        alt: block.altText ?? block.image.asset?.altText ?? '',
        width: 1920,
        // loading: 'eager',
        // queryParams: { q: 100, fm: 'webp' },
        // crop: block.image.crop,
        // hotspot: block.image.hotspot,
        // preview: block.image.asset?.metadata?.lqip ?? '',
        className:
          'block-image my-8 group-has-[.block-image]:my-0 h-full w-full object-cover',
        // sizes: '(min-width: 768px) 96vw, 100vw',
      }
      return block.image.asset ? (
        <m.div
          className="h-[50vw] max-h-[600px] min-h-[400px]"
          variants={variants()}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionComponent {...props} />
        </m.div>
      ) : null
    default:
      return _type && _type in blocksMap ? (
        // <m.div
        //   initial="initial"
        //   whileInView="visible"
        //   viewport={{ once: true }}
        // >
        <SectionComponent {...block} className="peer" />
      ) : (
        // </m.div>
        <></>
      )
  }
}
