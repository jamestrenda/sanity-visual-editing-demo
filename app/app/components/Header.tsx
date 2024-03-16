import { Container } from './Container'
import { Link } from '@remix-run/react'
import Image from './Image'
import { SiteSettings } from '~/types/siteSettings'
import { useWindowScroll } from '@uidotdev/usehooks'

const Header = ({
  email,
  logo,
  phone,
}: Pick<SiteSettings, 'email' | 'logo' | 'phone'>) => {
  const [{ y }] = useWindowScroll()
  return (
    <header
      className={`${y && y > 30 ? 'bg-black/80 backdrop-blur-lg duration-1000' : ''} py-5 fixed inset-x-0 z-50 transition duration-300 `}
    >
      <Container className="grid grid-cols-3 items-center justify-center">
        {phone ? (
          <a
            aria-label="Call Us"
            href={`tel:${phone}`}
            className="text-white flex items-center gap-2"
          >
            {/* <IconPhone className="h-4 w-4" aria-hidden="true" /> */}
            {/* {phoneFormatted} */}
            555-555-5555
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
              className="h-10 w-10 invert"
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
