import { PortableText } from '@portabletext/react'
import { type PortableTextBlock } from '@sanity/types'

import { PortableTextBlocks } from './PortableTextBlocks'
import { Container } from './Container'

const PortableTextBlock = (props: PortableTextBlock) => {
  //   const value = React.useMemo(() => richTextZ.parse(richText), [richText]);

  return (
    <div className="prose mx-auto">
      <PortableText value={props} components={PortableTextBlocks} />
    </div>
  )
}

export default PortableTextBlock
