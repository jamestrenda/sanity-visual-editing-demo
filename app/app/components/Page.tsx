import { Page as Props } from '~/types/page'
import Hero from './Hero'
import PageBuilder from './PageBuilder'
import { Heading } from './Heading'
import { Container } from './Container'

export const Page = ({ page }: { page: Props }) => {
  const { sections } = page
  return (
    <>
      {page.hero && !page.hero.hideHero ? (
        <Hero {...page.hero} />
      ) : (
        <Container className="">
          <Heading as="h1" use="h1" className="pt-24 sm:pt-32">
            {page.title}
          </Heading>
        </Container>
      )}
      {sections?.length ? <PageBuilder sections={sections} /> : null}
    </>
  )
}
