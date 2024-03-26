import { Post as Props } from '~/types/post'
import PageBuilder from './PageBuilder'
import { Heading } from './Heading'
import { Container } from './Container'
import Image from './Image'
import Badge from './Badge'
import dayjs from 'dayjs'
import { variants } from '~/utils/misc'
import { m } from 'framer-motion'

export const Post = ({ post }: { post: Props }) => {
  const { title, sections, featuredImage, category, publishedAt } = post
  return (
    <>
      <div className="[&+section]:pt-8 [&~section]:!bg-white [&:is(.blog_&)~section]:max-w-4xl [&:is(.blog_&)~section]:mx-auto">
        <Container className="no-hero min-h-[400px] grid items-center pt-40">
          <Badge
            text={category.name ?? 'Uncategorized'}
            className="bg-gray-200 text-primary-dark-500"
          />
          <Heading
            as="h1"
            use="h2"
            className="text-center mb-4"
            variants={variants(1)}
          >
            {title}
          </Heading>
          <m.div
            className="flex justify-center mb-12"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants(2)}
          >
            <time dateTime={dayjs(publishedAt).format()}>
              {dayjs(publishedAt).format('MMMM DD, YYYY')}
            </time>
          </m.div>
          <m.figure
            className="mb-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants(3)}
          >
            <Image
              source={featuredImage?.image}
              alt={featuredImage.altText ?? undefined}
              width={1000}
              className="rounded-md"
            />
          </m.figure>
        </Container>
      </div>
      {sections?.length ? <PageBuilder sections={sections} /> : null}
    </>
  )
}

// Related Posts
