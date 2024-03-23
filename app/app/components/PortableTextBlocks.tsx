import { PortableTextComponents } from '@portabletext/react'

import { Link } from '@remix-run/react'
import Image from './Image'
import { Button } from './Button'
import { Heading } from './Heading'
import { cn } from '~/utils/misc'
import { c } from 'node_modules/vite/dist/node/types.d-FdqQ54oU'
import Badge from './Badge'

const proseCn =
  'max-w-5xl w-full text-xl md:text-2xl [&+*]:mt-8 mx-auto peer px-4 md:px-8'

// H1 is reserved for the page title, so we don't need to account for it here.
export const PortableTextBlocks: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      return (
        <Heading
          as="h2"
          // use="h1"
          className="peer"
        >
          {children}
        </Heading>
      )
    },
    h3: ({ children }) => {
      return (
        <Heading as="h3" use="h3" className="peer">
          {children}
        </Heading>
      )
    },
    normal: ({ children }) => {
      return <p className="peer">{children}</p>
    },
    // add more block-level components here.
  },
  list: {
    bullet: ({ children }) => {
      return (
        <ul role="list" className="peer">
          {children}
        </ul>
      )
    },
    number: ({ children }) => {
      return <ol className="peer">{children}</ol>
    },
  },
  marks: {
    anchorLink: ({ value, children }) => {
      return <span id={value.anchor}>{children}</span>
    },
    externalLink: ({ value, children }) => {
      return (
        <a
          href={value.url}
          target={value.newWindow ? '_blank' : '_self'}
          className="text-primary-blue-500 no-underline hover:underline"
        >
          {children}
        </a>
      )
    },
    internalLink: ({ value, children }) => {
      // console.log(value)
      return (
        <Link
          id={value.anchor ?? undefined}
          to={`/${value.slug}`}
          className="text-primary-blue-500 no-underline hover:underline"
        >
          {children}
        </Link>
      )
    },
    highlight: ({ children }) => {
      return (
        <span
          style={{
            background: 'linear-gradient(-180deg,#c1f99d 15%,#e0f5d3 94%)',
          }}
        >
          {children}
        </span>
      )
    },
  },
  types: {
    imageObject: ({ value }) => {
      const { asset, hotspot, crop } = value.image
      return (
        <Image
          id={asset._id ?? ''}
          width={asset.metadata?.dimensions?.width ?? undefined}
          height={asset.metadata?.dimensions?.height ?? undefined}
          mode="cover"
          hotspot={hotspot}
          crop={crop}
          preview={asset.metadata?.lqip ?? ''}
          alt={asset.altText ?? ''}
          className={`object-cover w-full h-full my-8 rounded-lg shadow-md md:my-16`}
          sizes={`min-width: ${asset.metadata?.dimensions.width}px) ${asset.metadata?.dimensions.width}px, 100vw`}
        />
      )
    },
    badge: ({ value }) => {
      return <Badge {...value} className="peer" />
    },
    button: ({ value }) => {
      return (
        <Button {...value.link} className="peer">
          {value.linkText}
        </Button>
      )
    },
  },
}
