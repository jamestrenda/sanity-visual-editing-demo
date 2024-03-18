import { defineField } from 'sanity'
import { SlugInput } from '~/components/SlugInput'
import { formatSlug, validateSlug } from '~/utils/misc'

/**
 * Most common pattern for a slug field. If you need a different configuration, just replace this with your own custom field.
 * @see https://www.sanity.io/docs/slug-type
 */

type SlugFieldProps = {
  prefix?: string
  value?: string
  hidden?: boolean
  group?: string
  fieldset?: string
  source?: string
}

export const slugField = ({
  prefix,
  value,
  hidden,
  group,
  fieldset,
  source = 'title',
}: SlugFieldProps) =>
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    description: `A good URL tells users (and search engines) what to expect on the page.`,
    options: {
      slugify: (props) => formatSlug(props),
      source,
    },
    components: prefix
      ? {
          input: (props) => SlugInput(props, prefix),
        }
      : undefined,
    validation: validateSlug,
    initialValue: () => {
      if (value) {
        return { current: value }
      }
      return {
        current: undefined,
      }
    },
    hidden,
    group,
    fieldset,
  })
