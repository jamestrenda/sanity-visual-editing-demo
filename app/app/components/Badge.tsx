import { Link } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'
import { IconArrowRight } from './icons/IconArrowRight'
import { Badge } from '~/types/badge'
import { addHrefAnchor } from '~/utils/misc'
import { IconChevronRight } from './icons/IconChevronRight'

type Props = Badge & { className?: string }

const Badge = (props: Props) => {
  const { title, text, link, className } = props

  switch (link?._type) {
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

const Component = ({ title, text, className, link }: Omit<Props, '_type'>) => {
  return (
    <div
      className={twMerge(
        'flex justify-center items-center text-md py-1 bg-secondary-green-500 text-black/70 px-1 rounded-full mb-4 uppercase font-bold tracking-wider',
        className,
      )}
    >
      {title ? (
        <>
          <span className="rounded-full px-2 font-bold bg-white">{title}</span>
          {/* <svg
            width="2"
            height="2"
            aria-hidden="true"
            className="fill-black/70"
          >
            <circle cx="1" cy="1" r="1"></circle>
          </svg> */}
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
