import { Checklist } from '~/types/checklist'
import PortableTextBlock from './PortableText'
import { IconCircleCheck } from './icons/IconCircleCheck'
import { twMerge } from 'tailwind-merge'

type Props = Checklist & { className?: string }

const Checklist = ({ _type, items, anchor, className }: Props) => {
  return items?.length ? (
    <ul
      id={anchor ?? undefined}
      className={twMerge(
        'checklist group w-full self-center space-y-8 :not(:last-child):my-6 mt-6 max-w-7xl px-4 md:px-8 text-xl md:text-2xl [&+p]:mt-8 mx-auto peer-[.cta-block]:!mt-0',
        className,
      )}
    >
      {items.map(({ item, _key }) => {
        return (
          <li key={_key} className="flex flex-nowrap items-start">
            <IconCircleCheck className="h-7 w-7 mr-4 mt-1 fill-secondary-green-500" />
            <div>
              {item?.length
                ? item.map((block: any) => <PortableTextBlock {...block} />)
                : null}
            </div>
          </li>
        )
      })}
    </ul>
  ) : null
}

export default Checklist
