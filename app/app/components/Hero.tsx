// import { SanityImageObjectExtended } from '~/types/image'
import { Heading } from './Heading'
import Badge from './Badge'
import { Hero } from '~/types/hero'
import { BackgroundImage } from './BackgroundImage'
import ScrollDownIndicator from './ScrollDownIndicator'
import { useMeasure, useWindowScroll } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import { BackgroundVideo } from './BackgroundVideo'
import BackgroundParticles from './BackgroundParticles'
// import { HeroImage } from '../heroImage';
// import { RichText } from '../richText';

export default function Hero({
  title,
  subtitle,
  badge,
  image,
  video,
  style,
}: Hero) {
  const [ref, { height, width }] = useMeasure()
  const [{ y }] = useWindowScroll()
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  useEffect(() => {
    if (height && y) {
      if (y > height / 2) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }
  }, [y, height])

  return (
    <div
      ref={ref}
      className={`bg-black relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8 grid place-items-center [&_canvas]:!-z-10 [&_canvas]:!absolute [&_#tsparticles]:absolute [&_#tsparticles]:inset-0 [&_#tsparticles]:pointer-events-none ${style?.fullHeight ? 'min-h-screen' : ''}`}
    >
      {/* {image?.asset ? <BackgroundImage image={image} /> : null} */}
      {(video?.mp4 || video?.webm) && width && width > 1023 ? (
        <BackgroundVideo {...{ ...video, image }} />
      ) : image?.asset ? (
        <BackgroundImage image={image} />
      ) : (
        <BackgroundParticles />
      )}
      <div className="mx-auto max-w-sm md:max-w-2xl text-center flex flex-col items-center justify-center">
        {badge ? <Badge {...badge} className="" /> : null}
        <Heading as="h1" use="h1" className="mt-2  text-white">
          {title}
        </Heading>
        <div className="mt-6 text-xl sm:text-2xl md:text-3xl font-extralight text-white ">
          {/* <RichText richText={data?.text} /> */}
          <p>{subtitle}</p>
        </div>
      </div>
      <ScrollDownIndicator show={showScrollIndicator} />
    </div>
  )
}
