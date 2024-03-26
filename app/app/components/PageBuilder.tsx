import { cn } from '~/utils/misc'
import { SectionBlock } from './PageSection'
import { Block } from '~/types/block'

/**
 *
 *  Renders a page builder module based on the _type property.
 */
export default function PageBuilder({ sections }: { sections: Block[] }) {
  let classNames = 'py-24 sm:py-32 lg:py-40 group'

  return sections?.length ? (
    sections.map((section, index) => {
      switch (section._type) {
        case 'imageObject':
          return (
            <section
              key={section._key}
              className={cn(classNames, 'has-[.block-image]:py-0')}
            >
              <SectionBlock block={section} />
            </section>
          )
        case 'ctaBlock':
          return <SectionBlock key={section._key} block={section} />
        case 'textBlock':
          return (
            <section
              key={section._key}
              className={cn(classNames, 'textBlock [&+.textBlock]:pt-0')}
            >
              <SectionBlock block={section} />
            </section>
          )
        case 'statsBlock':
          return (
            <section
              key={section._key}
              className={cn(
                classNames,
                'has-[.stats]:relative max-md:has-[.stats]:pb-16 has-[.stats]:p-0 md:[&:has(.stats)+section]:pt-56',
              )}
            >
              <SectionBlock block={section} />
            </section>
          )
        default:
          return (
            <section key={section._key} className={cn(classNames)}>
              <SectionBlock block={section} />
            </section>
          )
      }
    })
  ) : (
    <></>
  )
  // return (
  //   <Suspense fallback={<></>}>
  //     {type ? <SectionComponent {...component} index={index} /> : <></>}
  //   </Suspense>
  // )
}
