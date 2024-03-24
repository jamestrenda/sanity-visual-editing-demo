import Image, { ImageProps } from './Image'

const BackgroundImage = ({ source }: ImageProps) =>
  source.asset ? (
    <div className="absolute inset-0 -z-10 [&>img]:transition-opacity [&>img]:duration-500 pointer-events-none">
      <Image
        source={source}
        width={1920}
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover opacity-10 transition duration-1000"
      />
    </div>
  ) : null

export { BackgroundImage }
