import { useEffect, useState } from 'react'
import { BackgroundImage } from './BackgroundImage'
import { SanityImageObjectExtended } from '~/types/image'

type Props = {
  src: {
    mp4: string | undefined
    webm: string | undefined
  }
  image?: SanityImageObjectExtended
  className?: string
}

const Video = (props: Props) => {
  const [allowVideo, setAllowVideo] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  useEffect(() => {
    setAllowVideo(true)
  }, [])

  const videoLoaded = () => {
    setIsVideoLoaded(true)
  }
  return (
    <>
      {allowVideo && (
        <video
          muted
          loop
          autoPlay
          playsInline
          onCanPlayThrough={videoLoaded}
          className={`${props.className} ${isVideoLoaded ? 'block' : 'hidden'}`}
          poster={props.image?.asset?.url}
        >
          <source src={props.src.webm} type="video/webm; codecs=vp9" />
          <source src={props.src.mp4} type="video/mp4" />
        </video>
      )}
      {isVideoLoaded ? null : props.image ? (
        <BackgroundImage source={props.image} />
      ) : null}
      {/* <div
        style={{
          backgroundImage: props.poster ? `url("${props.poster}")` : undefined,
        }}
        className={`absolute inset-0 bg-cover -z-20 ${isVideoLoaded ? 'hidden' : 'block'}`}
      /> */}
    </>
  )
}

export default Video
