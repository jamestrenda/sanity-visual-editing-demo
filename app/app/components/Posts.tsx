import { Heading } from './Heading'
import { Container } from './Container'
import { Link } from '@remix-run/react'
import { m } from 'framer-motion'
import { variants } from '~/utils/misc'
import { Post, PostListing } from '~/types/post'
import Image from './Image'
import dayjs from 'dayjs'

export const Posts = ({ posts }: { posts: PostListing[] }) => {
  return posts?.length ? (
    <Container className="mt-16 py-14">
      <Heading as="h2" use="h1" className="mb-8 md:mb-24 text-center">
        Latest Posts
      </Heading>
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
              <Link to={post.slug} className="group">
                {featuredImage.image.asset ? (
                  <figure className="mb-4">
                    <Image
                      source={featuredImage.image}
                      alt={featuredImage.altText ?? undefined}
                      width={1000}
                    />
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

                {teaser ? <p className="mt-2">{teaser}...</p> : null}
                <p className="mt-2 text-primary-blue-500 group-hover:underline underline-offset-4 transition">
                  Read More
                </p>
              </Link>
            </m.li>
          )
        })}
      </ul>
    </Container>
  ) : null
}

// Related Posts
