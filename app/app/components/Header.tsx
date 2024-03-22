import { Container } from './Container'
import { Link } from '@remix-run/react'
import Image from './Image'
import { useWindowScroll } from '@uidotdev/usehooks'

import type { Header as Props } from '~/types/header'

const Header = ({ phone, email, logo, menu }: Props) => {
  const [{ y }] = useWindowScroll()

  return (
    <header
      className={`${y && y > 30 ? 'bg-primary-dark-900/90 backdrop-blur-lg duration-1000' : ''} py-5 fixed inset-x-0 z-50 transition duration-300 group-has-[.page-not-found]:!bg-black/90 group-has-[.no-hero]:!bg-black/90 text-xl`}
    >
      <Container className="grid grid-cols-3 items-center justify-center">
        {phone ? (
          <a
            aria-label="Call Us"
            href={`tel:${phone}`}
            className="text-white flex items-center gap-2"
          >
            {phone}
          </a>
        ) : null}
        <Link
          to="/"
          title="Go to homepage"
          className="flex justify-self-center"
        >
          {/* TODO: add sanity overlay for logo */}
          {logo?.asset ? (
            <Image
              id={logo.asset._id}
              alt="Logo"
              width={80}
              loading="eager"
              // height={service.image.asset.metadata?.dimensions.height ?? 1080}
              crop={logo.crop}
              hotspot={logo.hotspot}
              preview={logo.asset.metadata?.lqip ?? ''}
              queryParams={{ q: 100, w: 80 }}
              className={`h-12 w-auto transition ${y && y > 30 ? 'filter brightness-[20]' : ''}`}
              // sizes="(min-width: 768px) 240px, 100vw"
            />
          ) : null}
        </Link>
        {email ? (
          <a
            aria-label="Call Us"
            href={`mailto:${email}`}
            className="text-white text-right"
          >
            {email}
          </a>
        ) : null}
      </Container>
    </header>
  )
}

export default Header
