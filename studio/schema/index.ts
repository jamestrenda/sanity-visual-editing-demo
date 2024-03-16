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
import blockContent from './objects/blockContent'
import pageBuilder from './objects/pageBuilder'
import seo from './objects/seo'
import page from './documents/page'
import globalContent from './documents/globalContent'
import portableText from './objects/portableText'
import logoCloud from './objects/logoCloud'
// import sections from './objects/sections'

export const SINGLETON_TYPES = new Set(['home', 'media.tag', 'siteSettings'])

export const schemaTypes = [
  address,
  badge,
  blockContent,
  globalContent,
  hero,
  home,
  imageObject,
  link,
  linkExternal,
  linkInternal,
  logoCloud,
  page,
  pageBuilder,
  portableText,
  seo,
  siteSettings,
]
