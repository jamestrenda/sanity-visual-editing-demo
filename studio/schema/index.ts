// import blockContent from './blockContent'
// import post from './post'
import siteSettings from './singletons/siteSettings'
import imageObject from './objects/image'
import address from './objects/address'

export const SINGLETON_TYPES = new Set(['media.tag', 'siteSettings'])

export const schemaTypes = [address, imageObject, siteSettings]
