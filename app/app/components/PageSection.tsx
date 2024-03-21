import React, { Suspense } from 'react'
import { Block, BlockType } from '~/types/block'
import { PageSection } from '~/types/pageBuilder'
import LogoCloud from './LogoCloud'
import PortableTextBlock from './PortableText'
import { Button } from './Button'
import { Container } from './Container'
import Image from './Image'
import Badge from './Badge'

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
  block: PortableTextBlock,
  button: Button,
  image: Image,
  logoCloud: LogoCloud,
}

export type Props = {
  _type: BlockType
  component: (typeof blocksMap)[BlockType]
}

/**
 *
 *  Renders a page builder module based on the _type property.
 */
export default function PageSection(props: PageSection) {
  const { _key, blocks } = props

  // console.log('props:', props)

  return blocks.map((block, index) => <Block block={block} key={index} />)
}

const Block = ({ block }: { block: Block }) => {
  const { _type } = block

  const SectionComponent = blocksMap[_type] as React.FC<any>

  console.log('type:', _type == 'badge' ? block : null)

  switch (_type) {
    case 'button':
      return (
        <Container className="max-w-2xl my-12 text-center">
          <SectionComponent {...block.link} className="">
            {block.link.linkText}
          </SectionComponent>
        </Container>
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
        // className: 'absolute inset-0 h-full w-full object-cover opacity-30 transition duration-1000',
        // sizes: '(min-width: 768px) 96vw, 100vw',
      }
      return (
        <Container>
          {/* <Image
        id={image.asset._id}
        alt={image.asset.altText ?? ''}
        width={1920}
        loading="eager"
        // height={image.asset.metadata?.dimensions.height ?? 1080}
        queryParams={{ q: 100, fm: 'webp' }}
        crop={image.crop}
        hotspot={image.hotspot}
        preview={image.asset.metadata?.lqip ?? ''}
        className="absolute inset-0 h-full w-full object-cover opacity-30 transition duration-1000"
        sizes="(min-width: 768px) 96vw, 100vw"
      /> */}
          <SectionComponent {...props} />
        </Container>
      )
    default:
      return <SectionComponent {...block} />
  }

  // return _type ? <SectionComponent {...block} /> : <></>
}
