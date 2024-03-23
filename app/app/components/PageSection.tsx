import React from 'react'
import { Block, BlockType } from '~/types/block'
import { PageSection } from '~/types/pageBuilder'
import LogoCloud from './LogoCloud'
import PortableTextBlock from './PortableText'
import { Button } from './Button'
import Image from './Image'
import Badge from './Badge'
import { FAQ } from './FAQ'
import CallToAction from './CallToAction'
import Checklist from './Checklist'
import Team from './Team'
import Stats from './Stats'

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
  checklist: Checklist,
  ctaBlock: CallToAction,
  image: Image,
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
 *  Renders a page builder module based on the _type property.
 */
export default function PageSection(props: Block) {
  // return blocks?.length ? (
  // blocks.map((block, index) =>
  return (
    <Block block={props} />
    // ) : (
    // <></>
  )
}

const Block = ({ block }: { block: Block }) => {
  const { _type } = block

  const SectionComponent = blocksMap[_type] as React.FC<any>

  switch (_type) {
    case 'button':
      return (
        <SectionComponent {...block.link} className="text-center peer">
          {block.link.linkText}
        </SectionComponent>
      )
    case 'image':
      const props = {
        id: block.image.asset?._id,
        alt: block.image.asset?.altText ?? '',
        width: 1920,
        // loading: 'eager',
        queryParams: { q: 100, fm: 'webp' },
        crop: block.image.crop,
        hotspot: block.image.hotspot,
        preview: block.image.asset?.metadata?.lqip ?? '',
        className:
          'block-image my-8 group-has-[.block-image]:my-0 h-full w-full object-cover',
        // sizes: '(min-width: 768px) 96vw, 100vw',
      }
      return (
        <div className="h-[50vw] max-h-[600px] min-h-[400px]">
          <SectionComponent {...props} />
        </div>
      )
    default:
      return _type && _type in blocksMap ? (
        <SectionComponent {...block} className="peer" />
      ) : (
        <></>
      )
  }
}
