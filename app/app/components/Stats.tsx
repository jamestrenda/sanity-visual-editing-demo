import { Heading } from './Heading'
import Image from './Image'
import PortableTextBlock from './PortableText'
import Badge from './Badge'
import { Stat, Stats } from '~/types/stats'
import { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue } from 'framer-motion'

export default function Stats({ badge, title, text, stats }: Stats) {
  return (
    <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
      <div className="mx-auto max-w-2xl">
        {badge ? <Badge {...badge} /> : null}
        <Heading as="h2" use="h2" className="text-center">
          {title}
        </Heading>
        {text ? <PortableTextBlock portableText={text} /> : null}
      </div>
      <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
        {stats?.map((stat, index) => (
          <div key={index} className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-base leading-7 text-white lowercase tracking-wider">
              {stat?.name}
            </dt>
            {stat.value ? (
              <Stat
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
              />
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  )
}

function Stat({
  value = 0,
  prefix = '',
  suffix = '',
}: Pick<Stat, 'value' | 'prefix' | 'suffix'>) {
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
    <dd className="order-first text-4xl font-light tracking-tight text-lime sm:text-5xl">
      {prefix && <span>{prefix}</span>}
      <span ref={ref}>0</span>
      {suffix && <span>{suffix}</span>}
    </dd>
  )
}
