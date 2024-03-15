// import blockContent from './blockContent'
// import post from './post'
import siteSettings from './singletons/siteSettings'
import imageObject from './objects/image'
import address from './objects/address'
import home from './singletons/home'
import badge from './objects/badge'
import link from './objects/link'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import hero from './objects/hero'

export const SINGLETON_TYPES = new Set(['home', 'media.tag', 'siteSettings'])

export const schemaTypes = [
  address,
  badge,
  hero,
  home,
  imageObject,
  link,
  linkExternal,
  linkInternal,
  siteSettings,
]
