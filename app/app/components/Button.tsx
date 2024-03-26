import { Link, LinkProps } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'

import { LinkExternal, LinkInternal } from '~/types/link'
import { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent } from 'react'
import { IconArrowRight } from './icons/IconArrowRight'
import {
  useMotionTemplate,
  useMotionValue,
  m,
  MotionProps,
} from 'framer-motion'

interface Theme {
  theme?: 'primary' | 'secondary' | 'tertiary'
  replaceClassNames?: boolean
}

// interface Links extends LinkProps {

// }
type Links =
  | (LinkInternal & LinkProps)
  | (LinkExternal & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ButtonHTMLAttributes<HTMLButtonElement>

type Props = Links & MotionProps

export const Button = (props: Props & Theme) => {
  if (!props.type) return <></>

  const theme = {
    base: 'button block sm:w-fit text-center mx-auto rounded-md p-4 md:py-y md:px-12 lg:py-6 text-base md:text-lg lg:text-2xl font-bold uppercase leading-6 transition cursor-pointer no-underline group/button relative overflow-hidden peer-[:is(.prose>p)]:!mt-16 peer-[:is(.prose>.button)]:!mt-4',
    primary:
      'bg-primary-blue-500 text-white shadow-sm [text-shadow:_1px_1px_0_rgb(0_0_0_/_1)]',
    secondary: `bg-transparent text-black`,
    tertiary: 'bg-transparent',
  }

  const selectedTheme = props.theme ?? 'primary'

  const cn = props.replaceClassNames
    ? props.className
    : twMerge(theme['base'], theme[selectedTheme], props.className)

  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    // @ts-ignore TODO: fix typing
    let { left, top } = currentTarget?.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  switch (props.type) {
    case 'linkInternal':
      if (!props.linkText) return <></>
      if (!props.to) return <></>
      let slug = `/${props.to.replace(/^\//, '')}${
        props.anchor ? `#${props.anchor}` : ''
      }`

      return (
        <Link
          to={slug}
          prefetch={props.prefetch ?? 'intent'}
          className={cn}
          onMouseMove={handleMouseMove}
        >
          <m.div
            className="pointer-events-none absolute -inset-px z-0 rounded-md opacity-0 transition duration-300 group-hover/button:opacity-100"
            style={{
              background: useMotionTemplate`
            radial-gradient(
              170px circle at ${mouseX}px ${mouseY}px,
              rgba(24, 59, 253, 1) 10%,
              transparent 90%
            )
          `,
            }}
          />
          <span className="relative z-10">
            {props.linkText}
            {props.theme === 'secondary' ? (
              <IconArrowRight
                className="inline ml-2 w-4 h-4"
                aria-hidden="true"
              />
            ) : null}
          </span>
        </Link>
      )
    case 'linkExternal':
      if (!props.linkText) return <></>
      if (!props.href) return <></>
      return (
        <a
          href={props.href}
          target={props.newWindow ? '_blank' : '_self'}
          className={cn}
          rel="noreferrer"
          onMouseMove={handleMouseMove}
        >
          <m.div
            className="pointer-events-none absolute -inset-px z-0 rounded-md opacity-0 transition duration-300 group-hover/button:opacity-100"
            style={{
              background: useMotionTemplate`
              radial-gradient(
                170px circle at ${mouseX}px ${mouseY}px,
                rgba(24, 59, 253, 1) 10%,
                transparent 80%
              )
          `,
            }}
          />
          <span className="relative z-10">
            {props.linkText}
            {props.children ?? props.theme === 'secondary' ? (
              // <IconArrowRight
              //   className="inline ml-2 w-4 h-4"
              //   aria-hidden="true"
              // />
              <></>
            ) : null}
          </span>
        </a>
      )
    case 'submit':
      return (
        <button type="submit" className={cn} onMouseMove={handleMouseMove}>
          <m.div
            className="pointer-events-none absolute -inset-px z-0 rounded-md opacity-0 transition duration-300 group-hover/button:opacity-100"
            style={{
              background: useMotionTemplate`
              radial-gradient(
                170px circle at ${mouseX}px ${mouseY}px,
                rgba(24, 59, 253, 1) 10%,
                transparent 80%
              )
          `,
            }}
          />
          <span className="relative z-10">{props.children}</span>
        </button>
      )
    case 'reset':
      return (
        <button type="reset" className={cn} onMouseMove={handleMouseMove}>
          <m.div
            className="pointer-events-none absolute -inset-px z-0 rounded-md opacity-0 transition duration-300 group-hover/button:opacity-100"
            style={{
              background: useMotionTemplate`
            radial-gradient(
              170px circle at ${mouseX}px ${mouseY}px,
              rgba(24, 59, 253, 1) 10%,
              transparent 80%
            )
        `,
            }}
          />

          <span className="relative z-10">{props.children}</span>
        </button>
      )
  }

  return <></>
}
