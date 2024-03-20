import React, { Suspense } from 'react'
import { type PageBuilder as Props } from '~/types/pageBuilder'
import PageSection from './PageSection'

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

// export type Props = {
//   type: Block;
//   component: (typeof componentMap)[Block];
//   index: number;
// };

/**
 *
 *  Renders a page builder module based on the _type property.
 */
export default function PageBuilder({ sections }: { sections: Props }) {
  // const { type, component, index } = sections
  // const SectionComponent = componentMap[type] as React.FC<Pick<Props, 'index'>>

  return sections ? (
    sections.map((section, index) => (
      <PageSection {...section} key={section._key} />
    ))
  ) : (
    <></>
  )
  // return (
  //   <Suspense fallback={<></>}>
  //     {type ? <SectionComponent {...component} index={index} /> : <></>}
  //   </Suspense>
  // )
}
