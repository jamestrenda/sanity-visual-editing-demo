import { Post as Props } from '~/types/post'
import PageBuilder from './PageBuilder'
import { Heading } from './Heading'
import { Container } from './Container'

export const Post = ({ post }: { post: Props }) => {
  const { title, sections } = post
  return (
    <>
      <Container className="no-hero min-h-[400px] grid items-center">
        <Heading as="h1" use="h2" className="pt-24 sm:pt-32">
          {title}
        </Heading>
      </Container>
      {sections?.length ? <PageBuilder sections={sections} /> : null}
    </>
  )
}

// Related Posts
