// import { SanityImageObjectExtended } from '~/types/image'
import { Heading } from './Heading'
import Badge from './Badge'
import { Hero } from '~/types/hero'
import { BackgroundImage } from './BackgroundImage'
import ScrollDownIndicator from './ScrollDownIndicator'
import { useMeasure, useWindowScroll } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
// import { HeroImage } from '../heroImage';
// import { RichText } from '../richText';

export default function Hero({ title, subtitle, badge, image }: Hero) {
  const [ref, { height }] = useMeasure()
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
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8 min-h-screen grid place-items-center"
    >
      {image?.asset ? <BackgroundImage image={image} /> : null}
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
