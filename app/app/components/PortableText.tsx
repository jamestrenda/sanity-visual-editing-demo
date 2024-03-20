import { PortableText } from '@portabletext/react'
import { type PortableTextBlock } from '@sanity/types'

import { PortableTextBlocks } from './PortableTextBlocks'

const PortableTextBlock = (props: PortableTextBlock) => {
  //   const value = React.useMemo(() => richTextZ.parse(richText), [richText]);

  return (
    <div>
      {/* {value ? ( */}
      <PortableText value={props} components={PortableTextBlocks} />
      {/* ) : null} */}
    </div>
  )
}

export default PortableTextBlock
