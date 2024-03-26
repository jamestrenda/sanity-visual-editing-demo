import { Heading } from './Heading'
import { Container } from './Container'
import { Link, useFetcher } from '@remix-run/react'
import { m } from 'framer-motion'
import { variants } from '~/utils/misc'
import { PostListing, PostsPage } from '~/types/post'
import Image from './Image'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Button } from './Button'
import { IconSpinner } from './icons/IconSpinner'
import Badge from './Badge'
import { useSpinDelay } from 'spin-delay'
// import Stripes from './Stripes'

export const Posts = ({
  data,
  count,
}: {
  data: PostListing[]
  count: number
}) => {
  const fetcher = useFetcher<PostsPage>()
  const { state: fetcherState } = fetcher

  const [posts, setPosts] = useState(data ?? [])

  useEffect(() => {
    if (fetcher.data) {
      setPosts((prev) => [...prev, ...(fetcher.data?.posts ?? [])])
    }
  }, [fetcher.data])

  const isSubmitting = Boolean(fetcherState === 'submitting')

  const showSpinner = useSpinDelay(isSubmitting, {
    delay: 500,
    minDuration: 200,
  })

  return posts?.length ? (
    <Container className="mt-16 py-14">
      {/* <Heading as="h2" use="h1" className="mb-8 md:mb-24 text-center">
        Latest Posts
      </Heading> */}
      <ul className="divide-y divide-gray-200 md:grid md:grid-cols-3 md:gap-8 md:divide-y-0 md:justify-center">
        {posts.map((post, index) => {
          const { featuredImage, author, publishedAt, body } = post
          const teaser = body?.[0]?.teaser?.replace(/\.$/, '')
          return (
            <m.li
              key={post._id}
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
              variants={variants(index)}
              className="py-8 md:py-0"
            >
              <Link to={post.slug} className="group relative block">
                <Badge
                  className="absolute top-4 left-4 bg-white text-primary-dark-500 z-10"
                  text={post.category.name ?? 'Uncategorized'}
                />
                {featuredImage.image.asset ? (
                  <figure className="mb-4 relative overflow-hidden bg-black">
                    <Image
                      source={featuredImage.image}
                      alt={featuredImage.altText ?? undefined}
                      width={1000}
                      className="group-hover:scale-105 transition duration-500 group-hover:opacity-90"
                    />

                    {/* <div className="grid grid-cols-12 grid-rows-12 -skew-y-12 absolute bottom-0 origin-[0] w-full h-[20vw] pointer-events-none translate-y-1/2">
                      <m.span
                        className="col-start-3 col-span-3 row-start-4 bg-secondary-yellow-500"
                        initial="initial"
                        whileHover="visible"
                        variants={{
                          initial: { x: -100 },
                          visible: {
                            x: 0,
                            transition: { duration: 0.5 },
                          },
                        }}
                      ></m.span>
                      <span className="col-span-2 row-start-5 bg-secondary-green-500"></span>
                      <span className="col-start-11 col-span-2 row-start-5 bg-secondary-green-500"></span>
                      <span className="col-start-8 col-span-3 row-start-6 bg-secondary-yellow-500"></span>
                      <span className="col-start-10 col-span-3 row-start-9 bg-secondary-green-500"></span>
                      <span className="col-start-11 col-span-2 row-start-10 bg-primary-orange-500"></span>
                    </div> */}
                  </figure>
                ) : null}
                <Heading use="h4" as="h3" className="mb-1">
                  {post.title}
                </Heading>
                <div className="space-x-2 mb-2">
                  <span>by {author?.name ?? 'TMG'}</span>
                  <span>|</span>
                  <time dateTime={publishedAt}>
                    {dayjs(publishedAt).format('MMMM D, YYYY')}
                  </time>
                </div>
                {teaser ? (
                  <p className="mt-2 line-clamp-3">{teaser}...</p>
                ) : null}
                <p className="mt-2 text-primary-blue-500 group-hover:underline underline-offset-4 transition">
                  Read More
                </p>
              </Link>
            </m.li>
          )
        })}
      </ul>
      <m.div
        className="text-center my-8"
        initial="initial"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants()}
      >
        {/* TODO: no scripts? do better... */}
        {count === posts.length ? null : (
          <fetcher.Form
            action="/resource/getMorePosts"
            method="post"
            className="grid place-items-center"
          >
            <input
              type="hidden"
              name="postsPerPage"
              value={6}
              // TODO: pull in this value dynamically
            />
            <input
              type="hidden"
              name="lastPostId"
              value={posts[posts.length - 1]._id}
            />
            <Button type="submit" className="" disabled={isSubmitting}>
              {showSpinner ? (
                <IconSpinner className="animate-spin h-4 w-4 inline-block" />
              ) : (
                'Load More Posts'
              )}
            </Button>
          </fetcher.Form>
        )}
      </m.div>
    </Container>
  ) : null
}

// Related Posts
