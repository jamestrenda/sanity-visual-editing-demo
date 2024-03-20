import { Page as Props } from '~/types/page'
import Hero from './Hero'
import PageBuilder from './PageBuilder'

// TODO: add types

export default function Page({ page }: { page: Props }) {
  const { sections } = page
  return (
    <>
      {page.hero && !page.hero.hideHero ? <Hero {...page.hero} /> : null}
      {sections?.length ? <PageBuilder sections={sections} /> : null}
    </>
  )
}
