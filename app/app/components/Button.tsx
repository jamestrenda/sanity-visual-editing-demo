import { Link, LinkProps } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'

import { LinkExternal, LinkInternal } from '~/types/link'
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { IconArrowRight } from './icons/IconArrowRight'
import {
  useMotionTemplate,
  useMotionValue,
  m,
  MotionProps,
} from 'framer-motion'
import { variants } from '~/utils/misc'

interface Theme {
  theme?: 'primary' | 'secondary' | 'tertiary'
  replaceClassNames?: boolean
}

// interface Links extends LinkProps {

// }
type Links =
  | (LinkInternal & LinkProps)
  | (LinkExternal & AnchorHTMLAttributes<HTMLAnchorElement>)

type Props = Links & ButtonHTMLAttributes<HTMLButtonElement> & MotionProps

export const Button = (props: Props & Theme) => {
  // console.log('props:', props)
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
    let { left, top } = currentTarget?.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const MotionLink = m(Link)

  // _type actually does exist on the props object.
  // I'm not sure why it's not being recognized by typescript.
  switch (props._type) {
    case 'linkInternal':
      let slug = props.to
        ? `/${props.to.replace(/^\//, '')}${
            props.anchor ? `${props.anchor}` : ''
          }`
        : '#'

      return (
        <Link
          to={slug}
          prefetch={props.prefetch ?? 'intent'}
          className={cn}
          // initial="initial"
          // whileInView="visible"
          // variants={props.variants}
          // viewport={{ once: true }}
          onMouseMove={handleMouseMove}
        >
          <m.div
            className="pointer-events-none absolute -inset-px z-0 rounded-md opacity-0 transition duration-300 group-hover/button:opacity-100"
            style={{
              background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(17, 228, 94, 1) 10%,
              transparent 80%
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
      return (
        <a
          href={props.href ?? '#'}
          target={props.newWindow ? '_blank' : '_self'}
          className={cn}
          rel="noreferrer"
          onMouseMove={handleMouseMove}
        >
          <m.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
            }}
          />
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
        <button type="submit" className={cn} onMouseMove={handleMouseMove}>
          <m.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
            }}
          />
          {props.children}
        </button>
      )
    case 'reset':
      return (
        <button type="reset" className={cn} onMouseMove={handleMouseMove}>
          <m.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
            }}
          />
          {props.children}
        </button>
      )
  }

  return <></>
}
