import { PortableTextComponents } from '@portabletext/react'

import { Link } from '@remix-run/react'
import Image from './Image'
import { Button } from './Button'
import { Heading } from './Heading'

// H1 is reserved for the page title, so we don't need to account for it here.
export const PortableTextBlocks: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      return (
        <Heading
          as="h2"
          // use="h1"
          className="text-center"
        >
          {children}
        </Heading>
      )
    },
    h3: ({ children }) => {
      return <h3 className="text-2xl font-bold mb-2">{children}</h3>
    },
    normal: ({ children }) => {
      return <p>{children}</p>
    },
    // add more block-level components here.
  },
  list: {
    bullet: ({ children }) => {
      return (
        <ul role="list" className="mt-8 space-y-8 text-gray-600">
          {children}
        </ul>
      )
    },
    number: ({ children }) => {
      return <ol className="list-decimal">{children}</ol>
    },
  },
  marks: {
    anchor: ({ value, children }) => {
      return <span id={value.anchorLink}>{children}</span>
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
      return (
        <Link
          to={value.href}
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
  // TODO: the way I'm querying the blocks, I don't think these types will ever be used.
  types: {
    image: ({ value }) => {
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
          className={`object-cover w-full h-full my-8 rounded-lg shadow-md`}
          sizes={`min-width: ${asset.metadata?.dimensions.width}px) ${asset.metadata?.dimensions.width}px, 100vw`}
        />
      )
    },
    button: ({ value }) => {
      return (
        <Button
          {...value}
          theme="primary"
          className=""
          // replaceClassNames
        >
          value.linkText
        </Button>
      )
    },
  },
}