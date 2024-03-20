import Video from './Video'
import { Video as Props } from '~/types/video'

const BackgroundVideo = ({ mp4, webm, image }: Props) => {
  return (
    <Video
      src={{
        mp4,
        webm,
      }}
      image={image ?? undefined}
      className="w-full h-full object-cover absolute inset-0 -z-10 opacity-20 pointer-events-none"
    />
  )
}

export { BackgroundVideo }
