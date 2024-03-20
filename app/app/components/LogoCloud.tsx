import { SanityImageObjectExtended } from '~/types/image'
import Image from './Image'

const LogoCloud = ({ logos }: { logos: SanityImageObjectExtended[] }) => {
  return logos.length ? (
    <div className="sm:grid sm:grid-cols2 md:grid-cols-3 lg:grid-cols-5">
      {logos.map((logo, index) => {
        return logo.asset ? (
          <Image
            id={logo.asset._id}
            alt={logo.asset.altText ?? ''}
            // width={1920}
            loading="eager"
            // height={image.asset.metadata?.dimensions.height ?? 1080}
            queryParams={{ q: 100, fm: 'webp' }}
            crop={logo.crop}
            hotspot={logo.hotspot}
            preview={logo.asset.metadata?.lqip ?? ''}
            // className="absolute inset-0 h-full w-full object-cover opacity-30 transition duration-1000"
            // sizes="(min-width: 768px) 96vw, 100vw"
          />
        ) : null
      })}
    </div>
  ) : null
}

export default LogoCloud
