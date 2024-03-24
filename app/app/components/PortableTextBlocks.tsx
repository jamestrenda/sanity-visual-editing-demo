import { PortableTextComponents } from '@portabletext/react'

import { Link } from '@remix-run/react'
import Image from './Image'
import { Button } from './Button'
import { Heading } from './Heading'
import Badge from './Badge'
import { ImageObject } from '~/types/image'
import { m } from 'framer-motion'
import { variants } from '~/utils/misc'
import { IconCircleCheck } from './icons/IconCircleCheck'

// H1 is reserved for the page title, so we don't need to account for it here.
export const PortableTextBlocks: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      return (
        <Heading
          as="h2"
          // use="h1"
          className="peer"
          variants={variants()}
        >
          {children}
        </Heading>
      )
    },
    h3: ({ children }) => {
      return (
        <Heading as="h3" use="h3" className="peer" variants={variants()}>
          {children}
        </Heading>
      )
    },
    h4: ({ children }) => {
      return (
        <Heading as="h4" use="h4" className="peer" variants={variants()}>
          {children}
        </Heading>
      )
    },
    h5: ({ children }) => {
      return (
        <Heading as="h5" use="h5" className="peer" variants={variants()}>
          {children}
        </Heading>
      )
    },
    h6: ({ children }) => {
      return (
        <Heading as="h6" use="h6" className="peer" variants={variants()}>
          {children}
        </Heading>
      )
    },
    normal: ({ children }) => {
      return (
        <m.p
          className="peer"
          initial="initial"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={variants(0)}
        >
          {children}
        </m.p>
      )
    },
    // add more block-level components here.
  },
  list: {
    // can we map over children and fade them in?
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
    check: ({ children }) => {
      return (
        <ul className="peer checklist list-image-[url(/circle-check-sharp-solid.svg)]">
          {children}
        </ul>
      )
    },
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <m.li
        variants={variants()}
        initial="initial"
        whileInView="visible"
        viewport={{
          once: true,
        }}
      >
        {children}
      </m.li>
    ),
    number: ({ children }) => (
      <m.li
        variants={variants()}
        initial="initial"
        whileInView="visible"
        viewport={{
          once: true,
        }}
      >
        {children}
      </m.li>
    ),
    check: ({ children }) => (
      <m.li
        variants={variants()}
        initial="initial"
        whileInView="visible"
        viewport={{
          once: true,
        }}
        className="[&::marker]:text-[xxx-large]"
      >
        {children}
      </m.li>
    ),
    // Ex. 2: customizing specific list items
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
    imageObject: ({ value }: { value: ImageObject }) => {
      const { image, altText, caption } = value
      // return false
      return image.asset ? (
        <figure className="my-8 md:my-16">
          <Image
            source={image.asset}
            width={1920}
            // mode="cover"
            // hotspot={hotspot}
            // crop={crop}
            // preview={asset.metadata?.lqip ?? ''}
            variants={variants()}
            alt={altText ?? undefined}
            className={`object-cover w-full h-full rounded-lg shadow-md`}
            // sizes={`min-width: ${asset.metadata?.dimensions.width}px) ${asset.metadata?.dimensions.width}px, 100vw`}
          />
          {caption ? (
            <m.figcaption
              className="text-left text-sm text-gray-500"
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
              variants={variants(1)}
            >
              {value.caption}
            </m.figcaption>
          ) : null}
        </figure>
      ) : null
    },
    badge: ({ value }) => {
      return <Badge {...value} className="peer" variants={variants()} />
    },
    button: ({ value }) => {
      return (
        <Button {...value.link} className="peer" variants={variants()}>
          {value.linkText}
        </Button>
      )
    },
  },
}
