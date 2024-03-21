// import { twMerge } from 'tailwind-merge'
import { Disclosure } from '@headlessui/react'
// import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { FAQ } from '~/types/faqsZ'
import { Heading } from './Heading'
import { IconChevronUp } from './icons/IconChevronUp'
import { IconChevronDown } from './icons/IconChevronDown'
import { PortableText } from '@portabletext/react'
import { Container } from './Container'

export function FAQ({ title, text, faqs, anchor }: FAQ) {
  return (
    <Container>
      <div id={anchor ?? 'faq'} className="">
        <div className="px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="">
            <Heading use="h2" as="h2" className="text-center">
              {title ?? 'Frequently Asked Questions'}
            </Heading>
            <div className="[&>*]:text-2xl my-6 max-w-3xl mx-auto text-center">
              <PortableText value={text} />
            </div>
            <dl className="mt-10 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure
                  as="div"
                  key={faq.question}
                  className=""
                  id={faq.anchor ?? undefined}
                >
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="bg-gray-100 flex w-full items-start justify-between text-left text-gray-900 relative">
                          <Heading as="h3" className="leading-7 p-6">
                            {faq.question}
                          </Heading>
                          <span className="ml-6 flex items-center absolute inset-y-0 right-4 my-atuo">
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
                        className="mt-2 pr-12 p-6 [&>p]:text-2xl"
                      >
                        <PortableText value={faq.answer} />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Container>
  )
}
