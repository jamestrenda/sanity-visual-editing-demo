import Image from './Image'
import { LogoCloud } from '~/types/logoCloud'
import Badge from './Badge'
import { Heading } from './Heading'
import React from 'react'
import { variants } from '~/utils/misc'

const LogoCloud = ({ badge, title, logos }: LogoCloud) => {
  return logos.length ? (
    <div className="px-6 lg:px-8 flex flex-col items-center justify-cente">
      {badge ? <Badge {...badge} variants={variants(0)} /> : null}
      <Heading as="h2" use="h2" className="text-center " variants={variants(2)}>
        {title}
      </Heading>
      <div className="mt-10 w-full max-w-7xl flex justify-center flex-wrap gap-y-12 sm:gap-y-14">
        {logos.map((logo, index) => {
          return logo.image.asset ? (
            <Image
              key={index}
              source={logo.image.asset}
              alt={logo.altText ?? logo.image.asset.altText ?? ''}
              // width={1920}
              // loading="eager"
              height={128}
              // preview={logo.asset.metadata?.lqip ?? ''}
              className={`h-auto max-h-20 w-full sm:w-1/3 md:w-1/5`}
              variants={variants(3 + index)}
              // sizes="(min-width: 768px) 96vw, 100vw"
            />
          ) : null
        })}
      </div>
    </div>
  ) : null
}

export default LogoCloud
