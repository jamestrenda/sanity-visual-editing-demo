export function addHrefAnchor(href: string, anchor?: string) {
  return `${href.replace(/^\//, '')}${anchor ? `#${anchor}` : null}`
}
