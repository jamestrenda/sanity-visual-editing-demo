import { Link } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'
import { Badge } from '~/types/badge'
import { addHrefAnchor, variants } from '~/utils/misc'
import { IconChevronRight } from './icons/IconChevronRight'
import IconDot from './icons/IconDot'
import { MotionProps, m } from 'framer-motion'

type Props = Badge & { className?: string }

const Badge = (props: Props & MotionProps) => {
  const { title, text, link, className, variants } = props

  switch (link?._type) {
    case 'linkInternal':
      // TODO: figure out what's going wrong with anchor text
      // it seems to be adding a bunch of extra hidden characters
      const href = link.anchor ? addHrefAnchor(link.to, link.anchor) : link.to
      return (
        <Link to={href} className="cursor" prefetch="intent">
          <Component
            title={title}
            text={text}
            link={link}
            variants={variants}
          />
        </Link>
      )
    case 'linkExternal':
      return (
        <a
          href={link.href}
          target={link.newWindow ? '_blank' : '_self'}
          rel="noreferrer"
        >
          <Component
            title={title}
            text={text}
            link={link}
            variants={variants}
          />
        </a>
      )
  }

  return (
    <Component
      title={title}
      text={text}
      link={link}
      className={className}
      variants={variants}
    />
  )
}

const Component = ({
  title,
  text,
  className,
  link,
}: Omit<Props, '_type'> & MotionProps) => {
  return (
    <m.div
      className={twMerge(
        'badge group-has-[.prose]:w-fit mx-auto flex justify-center items-center text-xs py-1 bg-secondary-green-500 text-black/70 px-1 rounded-full mb-4 uppercase font-bold tracking-wider',
        className,
      )}
      variants={variants()}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {title ? (
        <>
          <span className="hidden sm:flex flex-nowrap rounded-full px-2 py-0.5 font-bold bg-white relative pl-5">
            <span className="animate-pulse">
              <IconDot className="h-2.5 w-2.5 mr-1 fill-secondary-green-200 scale-110 absolute inset-y-0 left-[6px] my-auto" />
            </span>
            <IconDot className="h-2 w-2 mr-1 fill-secondary-green-500 absolute inset-y-0 left-[7px] my-auto" />

            <span>{title}</span>
          </span>
        </>
      ) : null}
      <span className="px-2">{text}</span>
      {link ? (
        <IconChevronRight
          className="mr-1 text-black/70 h-3 w-3"
          aria-hidden="true"
        />
      ) : null}
    </m.div>
  )
}

export default Badge
