import { Link, LinkProps } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'

import { LinkExternal, LinkInternal } from '~/types/link'
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { IconArrowRight } from './icons/IconArrowRight'

interface Theme {
  theme?: 'primary' | 'secondary' | 'tertiary'
  replaceClassNames?: boolean
}

// interface Links extends LinkProps {

// }
type Links =
  | (LinkInternal & LinkProps)
  | (LinkExternal & AnchorHTMLAttributes<HTMLAnchorElement>)

type Props = Links | ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: Props & Theme) => {
  console.log('props:', props)
  const theme = {
    base: 'inline-block text-center mx-auto rounded-md px-8 py-4 text-2xl font-bold uppercase leading-6 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky cursor-pointer',
    primary:
      'bg-primary-blue-500 text-white shadow-sm hover:bg-primary-blue-400 [text-shadow:_1px_1px_0_rgb(0_0_0_/_1)]',
    secondary: `bg-transparent text-black`,
    tertiary: 'bg-transparent',
  }

  const selectedTheme = props.theme ?? 'primary'

  const cn = props.replaceClassNames
    ? props.className
    : twMerge(theme['base'], theme[selectedTheme], props.className)

  switch (props._type) {
    case 'linkInternal':
      let slug = props.to
        ? `/${props.to.replace(/^\//, '')}${
            props.anchor ? `${props.anchor}` : ''
          }`
        : '#'

      return (
        <Link to={slug} prefetch={props.prefetch ?? 'intent'} className={cn}>
          {props.linkText}
          {props.theme === 'secondary' ? (
            <IconArrowRight
              className="inline ml-2 w-4 h-4"
              aria-hidden="true"
            />
          ) : null}
        </Link>
      )
    case 'linkExternal':
      return (
        <a
          href={props.href ?? '#'}
          target={props.newWindow ? '_blank' : '_self'}
          className={cn}
          rel="noreferrer"
        >
          {props.linkText}
          {props.children ?? props.theme === 'secondary' ? (
            // <IconArrowRight
            //   className="inline ml-2 w-4 h-4"
            //   aria-hidden="true"
            // />
            <></>
          ) : null}
        </a>
      )
    case 'submit':
      return (
        <button type="submit" className={cn}>
          {props.children}
        </button>
      )
    case 'reset':
      return (
        <button type="reset" className={cn}>
          {props.children}
        </button>
      )
  }

  return <></>
}
