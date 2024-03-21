import { SanityImageObjectExtended } from '~/types/image'
import Image from './Image'
import { LogoCloud } from '~/types/logoCloud'
import Badge from './Badge'
import { Heading } from './Heading'

const LogoCloud = ({ badge, title, logos }: LogoCloud) => {
  return logos.length ? (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center justify-cente">
        {badge ? <Badge {...badge} /> : null}
        <Heading as="h2" use="h2" className="text-center ">
          {title}
        </Heading>
        {/* <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          {title}
        </h2> */}
        {/* <div className="mt-8 mx-auto grid max-w-lg grid-cols-4 place-items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5"> */}

        {/* <div className="mt-10 w-full sm:max-w-2xl grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-14"> */}
        <div className="mt-10 w-full max-w-3xl flex justify-center flex-wrap gap-y-12 sm:gap-y-14">
          {logos.map((logo, index) => {
            return logo?.asset ? (
              <Image
                key={index}
                id={logo.asset._id}
                alt={logo.asset.altText ?? ''}
                // width={1920}
                loading="eager"
                height={128}
                queryParams={{ q: 100, fm: 'webp' }}
                crop={logo.crop}
                hotspot={logo.hotspot}
                preview={logo.asset.metadata?.lqip ?? ''}
                className={`h-auto max-h-16 w-full sm:w-1/2 md:w-1/3`}
                // sizes="(min-width: 768px) 96vw, 100vw"
              />
            ) : null
          })}
        </div>
      </div>
    </div>
  ) : null
}

export default LogoCloud
