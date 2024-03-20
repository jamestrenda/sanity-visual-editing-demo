import { SanityImageObjectExtended } from '~/types/image'
import Image from './Image'

const LogoCloud = ({ images }: { images: SanityImageObjectExtended[] }) => {
  return images.length ? (
    <div className="sm:grid sm:grid-cols2 md:grid-cols-3 lg:grid-cols-5">
      {images.map((image, index) => {
        return image.asset ? (
          <Image
            id={image.asset._id}
            alt={image.asset.altText ?? ''}
            // width={1920}
            loading="eager"
            // height={image.asset.metadata?.dimensions.height ?? 1080}
            queryParams={{ q: 100, fm: 'webp' }}
            crop={image.crop}
            hotspot={image.hotspot}
            preview={image.asset.metadata?.lqip ?? ''}
            // className="absolute inset-0 h-full w-full object-cover opacity-30 transition duration-1000"
            // sizes="(min-width: 768px) 96vw, 100vw"
          />
        ) : null
      })}
    </div>
  ) : null
}

export default LogoCloud
