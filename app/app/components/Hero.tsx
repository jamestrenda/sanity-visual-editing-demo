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
import { variants } from '~/utils/misc'
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
      className={`!bg-transparent relative isolate py-24 sm:py-32 !pt-48 lg:min-h-[115vh]`}
    >
      <div className="absolute inset-0 pointer-events-none -skew-y-12 overflow-hidden origin-[0]">
        <div className="bg-primary-dark-900 skew-y-6 md:skew-y-12 absolute inset-0 pointer-events-none scale-[1.3] overflow-hidden [&>*]:object-cover">
          {(video?.mp4 || video?.webm) && width && width > 1023 ? (
            <BackgroundVideo {...{ ...video, image }} />
          ) : image?.asset ? (
            <BackgroundImage source={image} />
          ) : (
            <div className="[&_canvas]:!-z-10 [&_canvas]:!absolute [&_#tsparticles]:absolute [&_#tsparticles]:inset-0 [&_#tsparticles]:pointer-events-none">
              <BackgroundParticles />
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-sm md:max-w-5xl text-center flex flex-col items-center justify-center z-10 relative lg:pt-20 px-6 md:px-8">
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
              <Button {...primaryCTA} theme="primary">
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
      {/*  TODO: add wisteria video
      <div className="grid place-items-center sm:p-8 md:p-16 -mb-10 relative z-10 mt-16">
        <script
          src="https://fast.wistia.com/embed/medias/n3lfx22xle.jsonp"
          async
        ></script>
        <script
          src="https://fast.wistia.com/assets/external/E-v1.js"
          async
        ></script>
        <span className="wistia_embed wistia_async_n3lfx22xle popover=true inline-block w-[90vw] h-[50vw] md:h-[40vw] md:w-[80vw] max-w-[800px] max-h-[450px] relative shadow-xl rounded-md">
          &nbsp;
        </span>
      </div> */}
      <ScrollDownIndicator show={showScrollIndicator} />
      <Stripes />
    </section>
  )
}
