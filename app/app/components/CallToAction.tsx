// import { SanityImageObjectExtended } from '~/types/image'
import { Heading } from './Heading'
import Badge from './Badge'
import { BackgroundImage } from './BackgroundImage'
import BackgroundParticles from './BackgroundParticles'
import { Button } from './Button'
import { CallToActionBlock } from '~/types/ctaBlock'
import { cn, variants } from '~/utils/misc'
import { m } from 'framer-motion'

type Props = CallToActionBlock & { className?: string }

export default function CallToAction({
  title,
  subtitle,
  badge,
  image,
  style,
  primaryCTA,
  secondaryCTA,
  className,
}: Props) {
  return (
    <div
      className={cn(
        `cta-block bg-primary-dark-900 relative isolate px-6 py-24 sm:py-32 lg:px-8 grid place-items-center ${className} ${style?.fullHeight ? 'min-h-screen' : ''}`,
      )}
    >
      {image?.asset ? (
        <BackgroundImage source={image} />
      ) : (
        <div className="[&_canvas]:!-z-10 [&_canvas]:!absolute [&_#tsparticles]:absolute [&_#tsparticles]:inset-0 [&_#tsparticles]:pointer-events-none">
          <BackgroundParticles />
        </div>
      )}

      <div className="mx-auto max-w-sm md:max-w-2xl text-center flex flex-col items-center justify-center z-10">
        {badge ? <Badge {...badge} /> : null}
        <Heading
          as="h1"
          use="h1"
          className="mt-2  !text-white"
          variants={variants(1)}
        >
          {title}
        </Heading>
        <div className="mt-6 text-xl sm:text-2xl md:text-3xl font-extralight text-white ">
          <m.p
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants(2)}
          >
            {subtitle}
          </m.p>
        </div>
        {primaryCTA || secondaryCTA ? (
          <m.div
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6 text-center"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants(3)}
          >
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
          </m.div>
        ) : null}
      </div>
    </div>
  )
}
