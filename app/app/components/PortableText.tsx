import { PortableText } from '@portabletext/react'
import { type PortableTextBlock } from '@sanity/types'

import { PortableTextBlocks } from './PortableTextBlocks'
import { Container } from './Container'
// import { Container } from './Container'

const PortableTextBlock = ({
  portableText,
}: {
  portableText: PortableTextBlock
}) => {
  //   const value = React.useMemo(() => richTextZ.parse(richText), [richText]);
  return (
    <Container className="textBlock prose mx-auto group">
      <PortableText value={portableText} components={PortableTextBlocks} />
    </Container>
  )
}

export default PortableTextBlock
