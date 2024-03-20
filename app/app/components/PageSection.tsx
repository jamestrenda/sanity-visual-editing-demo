import React, { Suspense } from 'react'
import { Block, BlockType } from '~/types/block'
import { PageSection } from '~/types/pageBuilder'
import LogoCloud from './LogoCloud'
import PortableTextBlock from './PortableText'

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
  logoCloud: LogoCloud,
  block: PortableTextBlock,
  globalContent: null,
}

export type Props = {
  type: BlockType
  component: (typeof blocksMap)[BlockType]
  index: number
}

/**
 *
 *  Renders a page builder module based on the _type property.
 */
export default function PageSection(props: PageSection) {
  const { _key, blocks } = props

  // return blocks.map((block) => <Block block={block} key={_key} />)
  return <></>
}

const Block = ({ block }: { block: Block }) => {
  const { _type, ...component } = block

  // const SectionComponent = blocksMap[_type] as React.FC<
  //   Pick<Props, 'component'>
  // >

  // return (
  //   <Suspense fallback={<></>}>
  //     {_type ? <SectionComponent {...component} index={index} /> : <></>}
  //   </Suspense>
  // )

  return <div></div>
}

// const { type, component, index } = moduleProps;
//   const SectionComponent = componentMap[type] as React.FC<
//     Pick<ModuleProps, 'index'>
//   >;

//   return (
//     <Suspense fallback={<></>}>
//       {type ? <SectionComponent {...component} index={index} /> : <></>}
//     </Suspense>
//   );
