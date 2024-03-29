import { Container } from './Container'
import { Link } from '@remix-run/react'
import Image from './Image'
import { Footer } from '~/types/footer'
import dayjs from 'dayjs'
import { variants } from '~/utils/misc'
import { m } from 'framer-motion'
import { useMemo } from 'react'

const icons = [
  {
    name: 'facebook',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'instagram',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'x',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
      </svg>
    ),
  },
  {
    name: 'gitHub',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'youtube',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

const Footer = ({
  tagline,
  siteTitle,
  logo,
  address,
  menus,
  socialMedia,
}: Footer) => {
  const singleMenu = menus?.length === 1
  const singleMenuItemsCount =
    useMemo(() => (singleMenu ? menus[0]?.items?.length : 0), [singleMenu]) || 0

  return (
    <footer className="bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container>
        <div className="pt-16 sm:pt-24 lg:pt-32 pb-8">
          <div
            className={`${singleMenu ? 'flex flex-col justify-center' : 'lg:grid lg:grid-cols-3 lg:gap-8'}`}
          >
            <div
              className={`${singleMenu ? 'flex flex-col items-center order-2 mt-16' : ''} space-y-8`}
            >
              {logo?.asset ? (
                <Image
                  source={logo}
                  alt={logo.asset.altText ?? 'Logo'}
                  // width={1920}
                  // loading="eager"
                  height={56}
                  // preview={logo.asset.metadata?.lqip ?? ''}
                  className={`h-auto max-h-20 max-w-40`}
                  variants={variants(
                    0 + Number(singleMenu) + singleMenuItemsCount,
                  )}
                  // sizes="(min-width: 768px) 96vw, 100vw"
                />
              ) : null}
              {tagline ? (
                <m.p
                  initial="initial"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={variants(
                    1 + Number(singleMenu) + singleMenuItemsCount,
                  )}
                  className={`${singleMenu ? 'text-center' : ''} text-sm leading-6 text-gray-300`}
                >
                  {tagline}
                </m.p>
              ) : null}
              {address ? (
                <m.div
                  className={`${singleMenu ? 'text-center' : ''} text-sm leading-6 text-gray-300`}
                  initial="initial"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={variants(
                    2 + Number(singleMenu) + singleMenuItemsCount,
                  )}
                >
                  <address className="not-italic">
                    {address.street}
                    <br />
                    {address.city}, {address.state} {address.zip}
                  </address>
                </m.div>
              ) : null}
              {socialMedia ? (
                <div className="flex space-x-6">
                  {Object.keys(socialMedia)
                    .sort()
                    .map((item, index) => {
                      const href = socialMedia[item as keyof typeof socialMedia]
                      return href ? (
                        <m.a
                          key={item}
                          href={href}
                          className="text-gray-500 hover:text-gray-400"
                          initial="initial"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={variants(
                            3 +
                              Number(singleMenu) +
                              singleMenuItemsCount +
                              index,
                          )}
                        >
                          <span className="sr-only">{item}</span>
                          {icons
                            .find((icon) => icon.name === item)
                            ?.icon({
                              className: 'h-6 w-6',
                            })}
                        </m.a>
                      ) : null
                    })}
                </div>
              ) : null}
            </div>
            <div
              className={`${singleMenu ? '' : 'grid grid-cols-2 sm:grid-cols-3 gap-8 lg:grid-cols-3 lg:col-span-2 lg:mt-0'} `}
            >
              {menus?.length
                ? menus.map((menu, index) => (
                    <div key={menu?._id}>
                      {menu?.title && !singleMenu ? (
                        <m.h3
                          className="text-sm font-semibold leading-6 text-white"
                          initial="initial"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={variants(4 + index)}
                        >
                          {menu.title}
                        </m.h3>
                      ) : null}
                      {menu?.items?.length ? (
                        <ul
                          role="list"
                          className={`${singleMenu ? '[&_a]:text-base [&_a]:uppercase [&_a]:font-semibold flex max-sm:flex-col flex-wrap gap-8 items-center justify-center' : '[&_a]:text-sm space-y-4 mt-6 '} [&_a]:leading-6`}
                        >
                          {menu.items.map((item, index) => (
                            <m.li
                              key={item._key}
                              initial="initial"
                              whileInView="visible"
                              viewport={{ once: true }}
                              // variants={variants(5 + index)}
                              variants={
                                singleMenu
                                  ? variants(index)
                                  : variants(5 + index)
                              }
                            >
                              {item.link?.type === 'linkInternal' ? (
                                <Link
                                  to={item.link?.to}
                                  className={`text-gray-300 hover:text-white`}
                                >
                                  {item.link?.linkText}
                                </Link>
                              ) : item.link?.type === 'linkExternal' ? (
                                <a
                                  href={item.link?.href}
                                  target={
                                    item.link?.newWindow ? '_blank' : undefined
                                  }
                                  rel="noopener noreferrer"
                                  className="text-gray-300 hover:text-white"
                                >
                                  {item.link?.linkText}
                                </a>
                              ) : null}
                            </m.li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p
              className={`${singleMenu ? 'text-center' : 'lg:text-center'} text-xs leading-5 text-gray-400`}
            >
              &copy; {dayjs().year()}{' '}
              <span>{siteTitle ? `${siteTitle}.` : null}</span> All rights
              reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
