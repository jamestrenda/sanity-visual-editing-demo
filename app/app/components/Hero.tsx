import { SanityImageObjectExtended } from '~/types/image'
import { Heading } from './Heading'
// import { HeroImage } from '../heroImage';
// import { RichText } from '../richText';

type Props = {
  data: {
    heading: string
    byline: string
    text: any
  }
  image?: SanityImageObjectExtended
}
export default function Hero({ data, image }: Props) {
  return (
    <div className="pb-6 md:p-6 lg:p-8">
      <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        {/* {image?.asset ? <HeroImage image={image} /> : null} */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold leading-7 text-lime uppercase tracking-wider">
            {data?.byline}
          </p>
          <Heading as="h1" use="h1" className="mt-2 xl:text-[100px]">
            {data?.heading}
          </Heading>
          <div className="mt-6 text-lg leading-8 ">
            {/* <RichText richText={data?.text} /> */}
            <p>{data?.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
