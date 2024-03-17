import { CurrentUser, SlugRule } from 'sanity'
import slug from 'slug'

export function isAdminUser(user: Omit<CurrentUser, 'role'> | null) {
  return !!user?.roles.find(({ name }) => name === 'administrator')
}

const MAX_LENGTH = 96

export const validateSlug = (rule: SlugRule) => {
  return rule.required().custom((value) => {
    const currentSlug = value && value.current
    if (!currentSlug) {
      return true
    }

    if (currentSlug.length >= MAX_LENGTH) {
      return `Must be less than ${MAX_LENGTH} characters`
    }

    return true
  })
}

export const formatSlug = (input: string) => {
  const formattedSlug = slug(input)

  return formattedSlug
}
