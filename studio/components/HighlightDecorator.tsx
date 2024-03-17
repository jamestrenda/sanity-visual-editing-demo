import { BlockDecoratorProps } from 'sanity'

const HighlightDecorator = (props: BlockDecoratorProps) => {
  return (
    <span
      style={{
        background: 'linear-gradient(-180deg,#c1f99d 15%,#e0f5d3 94%)',
      }}
    >
      {props.children}
    </span>
  )
}

export default HighlightDecorator
