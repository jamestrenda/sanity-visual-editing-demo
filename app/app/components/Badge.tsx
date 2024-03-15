import { Link } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'
import { IconArrowRight } from './icons/IconArrowRight'
import { Badge } from '~/types/badge'
import { addHrefAnchor } from '~/utils/misc'
import { IconChevronRight } from './icons/IconChevronRight'

type Props = Badge & { className?: string }

const Badge = (props: Props) => {
  const { title, text, link, className } = props

  switch (link?.type) {
    case 'linkInternal':
      // TODO: figure out what's going wrong with anchor text
      // it seems to be adding a bunch of extra hidden characters
      const href = link.anchor ? addHrefAnchor(link.to, link.anchor) : link.to
      return (
        <Link to={href} className="cursor" prefetch="intent">
          <Component title={title} text={text} link={link} />
        </Link>
      )
    case 'linkExternal':
      return (
        <a
          href={link.href}
          target={link.newWindow ? '_blank' : '_self'}
          rel="noreferrer"
        >
          <Component title={title} text={text} link={link} />
        </a>
      )
  }

  return (
    <Component title={title} text={text} link={link} className={className} />
  )
}

const Component = ({ title, text, className, link }: Props) => {
  return (
    <div
      className={twMerge(
        'flex justify-center items-center text-xs py-1 bg-violet-200 text-violet-800 px-1 border border-solid border-violet-800 rounded-full',
        className,
      )}
    >
      {title ? (
        <>
          <span className="rounded-full px-2 font-semibold">{title}</span>
          <svg
            width="2"
            height="2"
            aria-hidden="true"
            className="fill-violet-500"
          >
            <circle cx="1" cy="1" r="1"></circle>
          </svg>
        </>
      ) : null}
      <span className="px-2">{text}</span>
      {link ? (
        <IconChevronRight
          className="mr-1 text-violet-800 h-3 w-3"
          aria-hidden="true"
        />
      ) : null}
    </div>
  )
}

export default Badge
