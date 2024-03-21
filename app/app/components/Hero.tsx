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
import { Button } from './Button'
import Stripes from './Stripes'
// import { HeroImage } from '../heroImage';
// import { RichText } from '../richText';

export default function Hero({
  title,
  subtitle,
  badge,
  image,
  video,
  style,
  primaryCTA,
  secondaryCTA,
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
    <section
      ref={ref}
      className={`!bg-transparent relative isolate px-6 py-24 sm:py-32 lg:px-8 grid place-items-center [&_canvas]:!-z-10 [&_canvas]:!absolute [&_#tsparticles]:absolute [&_#tsparticles]:inset-0 [&_#tsparticles]:pointer-events-none ${style?.fullHeight ? 'min-h-screen' : ''}`}
    >
      {/* {image?.asset ? <BackgroundImage image={image} /> : null} */}
      <div className="absolute inset-0 pointer-events-none -skew-y-6 md:-skew-y-12 overflow-hidden origin-[0]">
        <div className="bg-primary-dark-900 skew-y-6 md:skew-y-12 absolute inset-0 pointer-events-none scale-[1.3] overflow-hidden [&>*]:object-cover">
          {(video?.mp4 || video?.webm) && width && width > 1023 ? (
            <BackgroundVideo {...{ ...video, image }} />
          ) : image?.asset ? (
            <BackgroundImage image={image} />
          ) : (
            <BackgroundParticles />
          )}
        </div>
      </div>
      <div className="mx-auto max-w-sm md:max-w-2xl text-center flex flex-col items-center justify-center z-10">
        {badge ? <Badge {...badge} className="" /> : null}
        <Heading as="h1" use="h1" className="mt-2  text-white">
          {title}
        </Heading>
        <div className="mt-6 text-xl sm:text-2xl md:text-3xl font-extralight text-white ">
          {/* <RichText richText={data?.text} /> */}
          <p>{subtitle}</p>
        </div>
        {primaryCTA || secondaryCTA ? (
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6 text-center">
            {primaryCTA ? (
              <Button
                {...primaryCTA}
                theme="primary"
                className=""
                // replaceClassNames
              >
                {primaryCTA.linkText}
              </Button>
            ) : null}
            {secondaryCTA ? (
              <Button
                {...secondaryCTA}
                theme="secondary"
                className=" text-white"
                // replaceClassNames
              >
                {secondaryCTA.linkText}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
      <ScrollDownIndicator show={showScrollIndicator} />
      <Stripes />
    </section>
  )
}
