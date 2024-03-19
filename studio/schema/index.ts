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
import faq from './documents/faq'
import faqBlock from './objects/faqBlock'
import service from './documents/service'
import servicesBlock from './objects/servicesBlock'
import button from './objects/button'
import video from './objects/video'
import iconList from './objects/iconList'
import checklist from './objects/checklist'
import cta from './objects/cta'
import team from './documents/team'
import socialMedia from './objects/socialMedia'
import teamGrid from './objects/teamGrid'
import post from './post'
import category from './documents/category'
import company from './singletons/company'
import redirect from './objects/redirect'
import redirectSettings from './singletons/redirectSettings'
import postsGrid from './objects/postsGrid'
import form from './objects/form'
import stat from './objects/stat'
import statsBlock from './objects/statsBlock'
import notFoundSettings from './singletons/notFoundSettings'
import menu from './objects/menu'
import menuItem from './objects/menuItem'

// TODO: Remove home from schemaTypes, and SINGLETON_TYPES, and singletons directory
export const SINGLETON_TYPES = new Set([
  'company',
  'home',
  'media.tag',
  'redirectSettings',
  'siteSettings',
  'notFoundSettings',
])

export const schemaTypes = [
  address,
  badge,
  blockContent,
  button,
  category,
  checklist,
  company,
  cta,
  globalContent,
  faq,
  faqBlock,
  form,
  hero,
  home,
  iconList,
  imageObject,
  link,
  linkExternal,
  linkInternal,
  logoCloud,
  menu,
  menuItem,
  notFoundSettings,
  page,
  pageBuilder,
  portableText,
  post,
  postsGrid,
  redirect,
  redirectSettings,
  seo,
  service,
  servicesBlock,
  siteSettings,
  socialMedia,
  stat,
  statsBlock,
  team,
  teamGrid,
  video,
]
