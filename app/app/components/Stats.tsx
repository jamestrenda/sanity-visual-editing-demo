import { Heading } from './Heading'
import Image from './Image'
import PortableTextBlock from './PortableText'
import Badge from './Badge'
import { Stat, Stats } from '~/types/stats'
import { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue } from 'framer-motion'
import { BackgroundImage } from './BackgroundImage'

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
      <div className="mx-auto max-w-5xl">
        {badge ? <Badge {...badge} /> : null}
        <Heading as="h2" use="h2" className="text-center">
          {title}
        </Heading>
        {text ? (
          <div className="text-center">
            <PortableTextBlock portableText={text} />
          </div>
        ) : null}
      </div>
      <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl sm:grid-cols-2 xl:grid-cols-4 max-w-96 sm:max-w-none mx-auto">
        {stats?.map((stat, index) =>
          stat.value ? (
            <div
              key={index}
              className="flex flex-col bg-white/50 backdrop-blur-md p-8"
            >
              <dt className="text-lg leading-7 tracking-wider mb-5 font-bold border-b-4 pb-2 border-primary-dark-500 border-solid">
                {stat?.name}
              </dt>

              {/* // <Stat
              //   value={stat.value}
              //   suffix={stat.suffix}
              //   prefix={stat.prefix}
              // /> */}
              <>
                <dd className="text-6xl tracking-tight sm:text-5xl font-bold">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <span>{stat.value}</span>
                  {stat.suffix && <span>{stat.suffix}</span>}
                </dd>
                <dd className="text-sm leading-7 mt-5">{stat?.description}</dd>
              </>
            </div>
          ) : null,
        )}
      </dl>
      {image ? <BackgroundImage image={image} /> : null}
    </div>
  )
}

function Stat({ value = 0, prefix = '', suffix = '' }: Stat) {
  const count = useMotionValue(0)
  // const rounded = useTransform(count, Math.round);

  const ref = useRef(null)
  //   const valueRef = useRef<string | number>(0);

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

      return animation.stop
    }
  }, [isInView])

  return (
    <dd className="text-4xl font-bold sm:text-5xl">
      {prefix ? <span>{prefix}</span> : null}
      <span ref={ref}>0</span>
      {suffix ? <span>{suffix}</span> : null}
    </dd>
  )
}
