import { IconArrowDown } from './icons/IconArrowDown'

const ScrollDownIndicator = ({ show = true }) => {
  return (
    <IconArrowDown
      className={`${show ? 'opacity-100' : 'opacity-0'} animate-bounce transition-opacity h-8 w-8 text-white absolute bottom-8 left-1/2 transform -translate-x-1/2`}
    />
  )
}

export default ScrollDownIndicator
