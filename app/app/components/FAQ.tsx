import { Disclosure } from '@headlessui/react'
import { FAQ as Props } from '~/types/faqs'
import { Heading } from './Heading'
import { IconChevronUp } from './icons/IconChevronUp'
import { IconChevronDown } from './icons/IconChevronDown'
import { Container } from './Container'
import PortableTextBlock from './PortableText'
import { AnimatePresence, m } from 'framer-motion'
import { variants } from '~/utils/misc'

export function FAQ({ title, text, faqs, anchor }: Props) {
  return (
    <Container className="faqs" id={anchor ?? 'faq'}>
      <Heading use="h2" as="h2" className="text-center" variants={variants()}>
        {title ?? 'Frequently Asked Questions'}
      </Heading>
      <div className="text-lg md:[&>p]:text-2xl my-6 max-w-3xl mx-auto text-center">
        <m.p
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants(1)}
        >
          {text}
        </m.p>
      </div>
      <dl className="mt-10 divide-y divide-gray-900/10 space-y-2">
        {faqs.map((faq, index) => (
          <m.div
            key={faq._id}
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants(2 + index)}
          >
            <Disclosure as="div" className="" id={faq.anchor ?? undefined}>
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="bg-gray-100 flex w-full items-start justify-between text-left text-gray-900 relative space-y-2">
                      <Heading use="h3" as="h3" className="p-6 pr-14">
                        {faq.question}
                      </Heading>
                      <span className="ml-6 flex items-center absolute inset-y-0 right-6 my-atuo">
                        {open ? (
                          <IconChevronUp
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <IconChevronDown
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>

                  <Disclosure.Panel
                    as="dd"
                    className="py-6 [&>.prose]:!w-full [&>.prose]:!max-w-none"
                  >
                    <AnimatePresence>
                      <m.div
                        key={index}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: { duration: 0.3 },
                          transitionTimingFunction:
                            'cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        exit={{ y: 10, opacity: 0 }}
                      >
                        {faq.answer ? (
                          <PortableTextBlock portableText={faq.answer} />
                        ) : (
                          <p className="text-gray-900">
                            {faq.answer ?? 'No answer provided'}
                          </p>
                        )}
                      </m.div>
                    </AnimatePresence>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </m.div>
        ))}
      </dl>
    </Container>
  )
}
