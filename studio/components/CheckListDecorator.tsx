import { BlockListItemProps } from 'sanity'
import { IconCircleCheck } from '~/icons/circleCheck'

const CheckListDecorator = (props: BlockListItemProps) => {
  return (
    <>
      <IconCircleCheck
        fill="#11E45E"
        style={{
          position: 'absolute',
          top: -2,
          left: 10,
        }}
      />

      {props.children}
    </>
  )
}

export default CheckListDecorator
