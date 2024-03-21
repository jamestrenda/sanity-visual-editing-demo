import { SanityImageObjectExtended } from '~/types/image'
import Image from './Image'

type Props = {
  image: SanityImageObjectExtended
}

const BackgroundImage = ({ image }: Props) =>
  image.asset ? (
    <div className="absolute inset-0 -z-10 [&>img]:transition-opacity [&>img]:duration-500 ">
      <Image
        id={image.asset._id}
        alt={image.asset.altText ?? ''}
        width={1920}
        loading="eager"
        // height={image.asset.metadata?.dimensions.height ?? 1080}
        queryParams={{ q: 100, fm: 'webp' }}
        crop={image.crop}
        hotspot={image.hotspot}
        preview={image.asset.metadata?.lqip ?? ''}
        className="absolute inset-0 h-full w-full object-cover opacity-10 transition duration-1000"
        sizes="(min-width: 768px) 96vw, 100vw"
      />
    </div>
  ) : null

export { BackgroundImage }
