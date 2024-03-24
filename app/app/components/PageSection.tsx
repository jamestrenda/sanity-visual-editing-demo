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

// import CallOutBlockWithBgImage from './callOutBlockWithBgImage';
// import CallOutBlockWithImage from './callOutBlockWithImage';
// import CallOutBlockWithImageTiles from './callOutBlockWithImageTiles';
// import Cards from './cards';
// import ImageBlock from './imageBlock';
// import RichTextModule from './richTextModule';
// import { Block } from '~/types/block';

// with Remix we don't need to use the lazy import because this will run on the server
// const componentMap = {
//   imageBlock: ImageBlock,
//   callOutBlockWithBgImage: CallOutBlockWithBgImage,
//   callOutBlockWithImage: CallOutBlockWithImage,
//   callOutBlockWithImageTiles: CallOutBlockWithImageTiles,
//   cards: Cards,
//   richTextBlock: RichTextModule,
// };

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

const variants = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/**
 *
 *  Renders a page builder block based on the _type property.
 */
export const SectionBlock = ({ block }: { block: Block }) => {
  const { _type } = block

  const SectionComponent = blocksMap[_type] as React.FC<any>

  const MotionComponent = m(SectionComponent)

  switch (_type) {
    case 'button':
      return (
        <MotionComponent
          {...block.link}
          className="text-center peer"
          variants={variants}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {block.link.linkText}
        </MotionComponent>
      )
    case 'imageObject':
      const props = {
        source: block.image.asset,
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
        <div className="h-[50vw] max-h-[600px] min-h-[400px]">
          <MotionComponent
            {...props}
            variants={variants}
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </div>
      ) : null
    default:
      return _type && _type in blocksMap ? (
        <SectionComponent
          {...block}
          className="peer"
          // variants={variants}
          // initial="initial"
          // whileInView="visible"
          // viewport={{ once: true }}
        />
      ) : (
        <></>
      )
  }
}
