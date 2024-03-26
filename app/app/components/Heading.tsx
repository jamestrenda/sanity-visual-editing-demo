import { MotionProps } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import { m } from 'framer-motion'

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  use?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  className?: string
  children: React.ReactNode
}

export const Heading = (props: HeadingProps & MotionProps) => {
  const { as, use = 'h2', className = '', children, variants } = props

  let styles = {
    h1: 'font-montserrat text-5xl sm:text-7xl md:text-[96px] lg:text-[120px] font-extrabold uppercase tracking-tighter text-balance !text-primary-dark-500',
    h2: 'font-montserrat font-extrabold tracking-tighter text-3xl text-balance sm:text-5xl md:text-[64px] sm:leading-[1.2] uppercase group-has-[h2]:mb-8 !text-primary-dark-500',
    h3: 'text-2xl sm:text-4xl font-bold text-balance !text-primary-dark-500',
    h4: 'text-xl sm:text-3xl font-bold text-balance !text-primary-dark-500',
    h5: 'font-bold',
    h6: '',
    p: '',
  }

  const motionConfig = {
    whileInView: 'visible',
    viewport: { once: true },
    initial: 'initial',
    variants,
  }

  switch (as) {
    case 'h1':
      return (
        <m.h1
          className={twMerge(styles[use ?? as], className)}
          {...motionConfig}
        >
          {children}
        </m.h1>
      )
    case 'h2':
      return (
        <m.h2
          className={`text-balance ${twMerge(styles[use ?? as], className)}`}
          {...motionConfig}
        >
          {children}
        </m.h2>
      )
    case 'h3':
      return (
        <m.h3
          className={twMerge(styles[use ?? as], className)}
          {...motionConfig}
        >
          {children}
        </m.h3>
      )
    case 'h4':
      return (
        <m.h4
          className={twMerge(styles[use ?? as], className)}
          {...motionConfig}
        >
          {children}
        </m.h4>
      )
    case 'h5':
      return (
        <m.h5
          className={twMerge(styles[use ?? as], className)}
          {...motionConfig}
        >
          {children}
        </m.h5>
      )
    case 'h6':
      return (
        <m.h6
          className={twMerge(styles[use ?? as], className)}
          {...motionConfig}
        >
          {children}
        </m.h6>
      )
    default:
      const Component = as || 'p'
      return (
        <Component className={twMerge(styles[use], className)}>
          {children}
        </Component>
      )
  }
}
