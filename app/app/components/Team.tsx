import { Team } from '~/types/team'
import { Heading } from './Heading'
import Image from './Image'
import { m } from 'framer-motion'
import PortableTextBlock from './PortableText'
import Badge from './Badge'
import React from 'react'
import { variants } from '~/utils/misc'

export default React.forwardRef(function Team(
  { badge, title, text, members }: Team,
  ref,
) {
  return (
    <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Badge {...badge} variants={variants()} />
        <Heading
          as="h2"
          use="h2"
          className="text-center"
          variants={variants(1)}
        >
          {title}
        </Heading>
        {text ? <PortableTextBlock portableText={text} /> : null}
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        {members?.map((person, index) => {
          const { image } = person.image
          return (
            <li key={index}>
              {image?.asset ? (
                <Image
                  alt={image.asset.altText ?? undefined}
                  height={450}
                  width={450}
                  // @ts-ignore
                  source={image}
                  variants={variants(2 + index)}
                  className="mx-auto h-40 w-40 sm:h-56 sm:w-56 rounded-full"
                />
              ) : null}
              <Heading
                as="h3"
                use="h3"
                className="mt-4"
                variants={variants(3 + index)}
              >
                {person.firstName} {person.lastName}
              </Heading>
              <m.p
                className="text-lg leading-6 text-gray-600"
                initial="initial"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants(4 + index)}
              >
                {person.position}
              </m.p>
              {person.socialMedia ? (
                <ul role="list" className="mt-6 flex justify-center gap-x-6">
                  {person.socialMedia.x ? (
                    <m.li
                      initial="initial"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={variants(5 + index)}
                    >
                      <a
                        href={person.socialMedia.x}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">X</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                        </svg>
                      </a>
                    </m.li>
                  ) : null}
                  {person.socialMedia.linkedin ? (
                    <li>
                      <a
                        href={person.socialMedia.linkedin}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
})
