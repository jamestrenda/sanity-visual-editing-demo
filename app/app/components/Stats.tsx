import { Heading } from './Heading'
import PortableTextBlock from './PortableText'
import Badge from './Badge'
import { Stat, Stats } from '~/types/stats'
import { useEffect, useRef } from 'react'
import {
  animate,
  useInView,
  useMotionValue,
  m,
  MotionProps,
} from 'framer-motion'
import { BackgroundImage } from './BackgroundImage'
import { variants } from '~/utils/misc'

export default function Stats({
  badge,
  title,
  text,
  stats,
  image,
  anchor,
}: Stats) {
  return (
    <div
      id={anchor ?? 'stats'}
      className="stats mx-auto max-w-7xl px-6 lg:px-8"
    >
      {image ? (
        <BackgroundImage
          source={image}
          wrapperClassNames="lg:before:absolute lg:before:bottom-0 lg:before:inset-x-0 lg:before:bg-gradient-to-t lg:from-white lg:from-20% lg:to-transparent lg:before:h-full lg:before:z-10 max-md:relative max-md:-mx-6"
          classNames="max-md:relative max-md:opacity-100"
        />
      ) : null}
      <div className="mx-auto max-w-5xl max-md:mt-16 md:pt-56">
        {badge ? <Badge {...badge} variants={variants()} /> : null}
        <Heading
          as="h2"
          use="h2"
          className="text-center"
          variants={variants(1)}
        >
          {title}
        </Heading>
        {text ? (
          <m.div
            className="text-center"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants(2)}
          >
            <PortableTextBlock portableText={text} />
          </m.div>
        ) : null}
      </div>
      <dl className="mt-8 md:mt-16 grid grid-cols-1 gap-4 overflow-hidden rounded-2xl sm:grid-cols-2 xl:grid-cols-4 max-w-96 sm:max-w-3xl xl:max-w-none mx-auto md:-mb-32 md:pb-8">
        {stats?.length
          ? stats.map((stat, index) =>
              stat?.value && stat.value > 0 ? (
                <m.div
                  key={index}
                  className="flex flex-col bg-white/50 backdrop-blur-md max-md:px-0 p-8 md:shadow-sm"
                  initial="initial"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={variants(3 + index)}
                >
                  <dt className="text-lg leading-7 tracking-wider mb-5 font-bold border-b-4 pb-2 border-primary-dark-500 border-solid">
                    {stat?.name}
                  </dt>

                  <Stat
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    description={stat.description}
                    variants={variants(4 + index)}
                  />
                </m.div>
              ) : (
                false
              ),
            )
          : null}
      </dl>
    </div>
  )
}

function Stat({
  value = 0,
  prefix = '',
  suffix = '',
  description,
  variants,
}: Stat & MotionProps) {
  const count = useMotionValue(0)

  const ref = useRef(null)

  const isInView = useInView(ref)
  const isDecimal = value ? value % 1 != 0 : false
  const needsComma = value ? value > 999 : false

  useEffect(() => {
    const node = ref.current

    if (isInView) {
      value = value || 0
      const animation = animate(count, value, {
        duration: 2,
        onUpdate: (latest) => {
          if (!node) return
          // @ts-ignore
          node.textContent = isDecimal
            ? latest.toLocaleString('en-US', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              })
            : needsComma
              ? latest.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                })
              : Math.round(latest)
        },
      })
    }
    return
  }, [isInView])

  return (
    <>
      <dd className="text-4xl font-bold sm:text-5xl">
        {prefix ? <span>{prefix}</span> : null}
        <span ref={ref}>0</span>
        {suffix ? <span>{suffix}</span> : null}
      </dd>
      {description ? (
        <m.dd
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          className="text-sm leading-7 mt-5"
        >
          {description}
        </m.dd>
      ) : null}
    </>
  )
}
