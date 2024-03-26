import { m, MotionProps } from 'framer-motion'
import { IconArrowDown } from './icons/IconArrowDown'

type Props = {
  show: boolean
} & MotionProps
const ScrollDownIndicator = ({ show = true, variants }: Props) => {
  return (
    <m.div
      className="w-fit mx-auto mt-20"
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
    >
      <IconArrowDown
        className={`${show ? 'opacity-100' : 'opacity-0'} animate-bounce transition-opacity h-8 w-8 text-white z-10`}
      />
    </m.div>
  )
}

export default ScrollDownIndicator
