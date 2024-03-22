import React, { Suspense } from 'react'
import { type PageBuilder as Props } from '~/types/pageBuilder'
import PageSection from './PageSection'
import { Block } from '~/types/block'

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
export default function PageBuilder({ sections }: { sections: Block[] }) {
  // const { type, component, index } = sections
  // const SectionComponent = componentMap[type] as React.FC<Pick<Props, 'index'>>

  // console.log('sections:', sections)
  return sections?.length ? (
    sections.map((section, index) => {
      switch (section._type) {
        case 'ctaBlock':
          return <PageSection key={index} {...section} />
        default:
          return (
            <section
              key={index}
              className="py-24 sm:py-32 lg:py-40 group has-[.block-image]:py-0"
            >
              <PageSection {...section} />
            </section>
          )
      }
    })
  ) : (
    <></>
  )
  // return (
  //   <Suspense fallback={<></>}>
  //     {type ? <SectionComponent {...component} index={index} /> : <></>}
  //   </Suspense>
  // )
}
