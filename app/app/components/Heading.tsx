import { twMerge } from 'tailwind-merge'

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  use?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  className?: string
  children: React.ReactNode
}

export const Heading = (props: HeadingProps) => {
  const { as, use = 'h2', className = '', children } = props

  let styles = {
    h1: 'font-montserrat text-5xl sm:text-7xl md:text-[96px] lg:text-[120px] font-extrabold uppercase tracking-tighter text-balance',
    h2: 'font-montserrat font-extrabold tracking-tighter text-3xl text-balance md:text-[64px] md:leading-[1.2] uppercase group-has-[h2]:mb-8',
    h3: 'text-xl md:text-3xl font-bold text-balance',
    h4: '',
    h5: '',
    h6: '',
    p: '',
  }

  switch (as) {
    case 'h1':
      return (
        <h1 className={twMerge(styles[use ?? as], className)}>{children}</h1>
      )
    case 'h2':
      return (
        <h2 className={`text-balance ${twMerge(styles[use ?? as], className)}`}>
          {children}
        </h2>
      )
    case 'h3':
      return <h3 className={twMerge(styles.h3, className)}>{children}</h3>
    case 'h4':
      return <h4>{children}</h4>
    case 'h5':
      return <h5>{children}</h5>
    case 'h6':
      return <h6>{children}</h6>
    default:
      const Component = as || 'p'
      return (
        <Component className={twMerge(styles[use], className)}>
          {children}
        </Component>
      )
  }
}
