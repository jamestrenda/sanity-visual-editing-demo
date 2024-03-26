import { Container } from './Container'
import { Link } from '@remix-run/react'
import Image from './Image'
import { useWindowScroll } from '@uidotdev/usehooks'

import type { Header as Props } from '~/types/header'
import { useMeasure } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import { IconPhone } from './icons/IconPhone'
import { IconPaperAirplane } from './icons/IconPaperAirplane'

const Header = ({ phone, email, logo, logoMobile, menu }: Props) => {
  const [isMobile, setIsMobile] = useState(false)
  const [{ y }] = useWindowScroll()

  const [ref, { width }] = useMeasure()

  useEffect(() => {
    if (width && width < 640) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [width])

  return (
    <header
      ref={ref}
      className={`${y && y > 30 ? 'bg-primary-dark-900/90 backdrop-blur-lg duration-1000' : ''} py-5 fixed inset-x-0 z-50 transition duration-300 [&~main:has(.page-not-found)]:bg-secondary-yellow-500 !bg-black/90 group-has-[.no-hero]:!bg-black/90 md:text-xl`}
    >
      <Container className="grid grid-cols-3 items-center justify-center">
        {phone ? (
          <a
            aria-label="Call Us"
            href={`tel:${phone}`}
            className="text-white flex items-center gap-2"
          >
            <IconPhone
              className={`sm:hidden text-xl ${y && y > 30 ? 'fill-white' : 'fill-secondary-yellow-500'}`}
            />

            <span className="hidden sm:inline-flex">{phone}</span>
          </a>
        ) : null}
        <Link
          to="/"
          title="Go to homepage"
          className="flex justify-self-center"
        >
          {isMobile ? (
            logoMobile?.asset ? (
              <Image
                // id={logo.asset._id}
                source={logoMobile}
                alt={logoMobile.asset.altText ?? 'Logo'}
                width={80}
                loading="eager"
                // height={service.image.asset.metadata?.dimensions.height ?? 1080}
                // crop={logo.crop}
                // hotspot={logo.hotspot}
                // preview={logo.asset.metadata?.lqip ?? ''}
                // queryParams={{ q: 100, w: 80 }}
                className={`h-10 w-auto transition ${y && y > 30 ? 'filter brightness-[20]' : ''}`}
                // sizes="(min-width: 768px) 240px, 100vw"
              />
            ) : null
          ) : logo?.asset ? (
            <Image
              // id={logo.asset._id}
              source={logo}
              alt={logo.asset.altText ?? 'Logo'}
              width={80}
              loading="eager"
              // height={service.image.asset.metadata?.dimensions.height ?? 1080}
              // crop={logo.crop}
              // hotspot={logo.hotspot}
              // preview={logo.asset.metadata?.lqip ?? ''}
              // queryParams={{ q: 100, w: 80 }}
              className={`h-10 md:h-12 w-auto transition ${y && y > 30 ? 'filter brightness-[20]' : ''}`}
              // sizes="(min-width: 768px) 240px, 100vw"
            />
          ) : null}
        </Link>
        {email ? (
          <a
            aria-label="Call Us"
            href={`mailto:${email}`}
            className="text-white text-right flex items-center justify-self-end"
          >
            <IconPaperAirplane
              className={`sm:hidden text-xl ${y && y > 30 ? 'fill-white' : 'fill-secondary-yellow-500'}`}
            />
            <span className="hidden sm:inline-flex">{email}</span>
          </a>
        ) : null}
      </Container>
    </header>
  )
}

export default Header
