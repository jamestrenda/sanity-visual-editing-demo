import { IconArrowDown } from './icons/IconArrowDown'

const ScrollDownIndicator = ({ show = true }) => {
  return (
    <div className="w-fit mx-auto mt-20">
      <IconArrowDown
        className={`${show ? 'opacity-100' : 'opacity-0'} animate-bounce transition-opacity h-8 w-8 text-white z-10`}
      />
    </div>
  )
}

export default ScrollDownIndicator
