import { Page as Props } from '~/types/page'
import Hero from './Hero'
import PageBuilder from './PageBuilder'
import { Heading } from './Heading'
import { Container } from './Container'
import { Posts } from './Posts'

export const Page = ({ page }: { page: Props }) => {
  const { sections, isPostsPage, postsPageData } = page

  return (
    <>
      {page.hero && !page.hero.hideHero ? (
        <Hero {...page.hero} />
      ) : (
        <Container className="no-hero min-h-[400px] grid items-center">
          <Heading as="h1" use="h1" className="pt-24 sm:pt-32">
            {page.title}
          </Heading>
        </Container>
      )}
      {isPostsPage ? (
        postsPageData.posts?.length ? (
          <Posts count={postsPageData.count} data={postsPageData.posts} />
        ) : (
          <p>No posts yet.</p>
        )
      ) : null}
      {sections?.length ? <PageBuilder sections={sections} /> : null}
    </>
  )
}
