import { PortableText } from '@portabletext/react'
import { type PortableTextBlock } from '@sanity/types'

import { PortableTextBlocks } from './PortableTextBlocks'

const PortableTextBlock = ({
  portableText,
}: {
  portableText: PortableTextBlock
  index?: number
}) => {
  //   const value = React.useMemo(() => richTextZ.parse(richText), [richText]);

  return (
    <div>
      {/* {value ? ( */}
      <PortableText value={portableText} components={PortableTextBlocks} />
      {/* ) : null} */}
    </div>
  )
}

export default PortableTextBlock
