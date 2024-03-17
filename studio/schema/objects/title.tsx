import type { Rule, StringFieldProps } from 'sanity'
import { TextInputWithCharCount } from '~/components/TextInputWithCharCount'

type TitleFieldProps = {
  name?: string
  group?: string
  fieldset?: string
  required?: boolean
}
// TODO: all titles have "Site title | tagline" appended to them, so we should factor that into the char count
// These values are set in the Site Settings in the Studio
export const titleField = ({
  group,
  fieldset,
  name = 'title',
  required = true,
}: TitleFieldProps) => ({
  name,
  title: 'Title',
  description: `This is the text that is displayed on search engine results pages (SERP) and in the title bar of the web browser. The best page titles are between 10 and 65 characters and include keywords for which the page should rank.${
    !required ? ' If blank, the document title will be used.' : ''
  }`,
  type: 'string',
  validation: required ? (Rule: Rule) => [Rule.required()] : undefined,
  components: {
    field: (props: StringFieldProps) => (
      <TextInputWithCharCount min={30} max={65} {...props} />
    ),
  },
  group,
  fieldset,
})