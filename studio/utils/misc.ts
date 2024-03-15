import { CurrentUser } from 'sanity'

export function isAdminUser(user: Omit<CurrentUser, 'role'> | null) {
  return !!user?.roles.find(({ name }) => name === 'administrator')
}
