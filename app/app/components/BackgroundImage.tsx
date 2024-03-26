import { cn } from '~/utils/misc'
import Image from './Image'
import { SanityImageObjectExtended } from '~/types/image'

const BackgroundImage = ({
  source,
  wrapperClassNames,
  classNames,
}: {
  source: SanityImageObjectExtended
  wrapperClassNames?: string
  classNames?: string
}) =>
  source.asset ? (
    <div
      className={cn(
        `absolute inset-0 -z-10 [&>img]:transition-opacity [&>img]:duration-500 pointer-events-none`,
        wrapperClassNames,
      )}
    >
      <Image
        source={source}
        width={1920}
        loading="eager"
        className={cn(
          `absolute inset-0 h-full w-full object-cover opacity-10 transition duration-1000`,
          classNames,
        )}
        q={70}
      />
    </div>
  ) : null

export { BackgroundImage }
