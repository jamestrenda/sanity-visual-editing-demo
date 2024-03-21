import { Link } from '@remix-run/react'
import { Heading } from './Heading'

// TODO - make more content editable from sanity (title, text, quick links, etc)
const PageNotFound = ({ slug, title }: { title?: string; slug?: string }) => {
  return (
    <div className="min-h-96 grid place-items-center">
      <div className="text-center">
        <Heading>{title ?? '404 Page Not Found'}</Heading>
        <p className="prose mx-auto mt-6">
          We couldn't find a page at "{slug}". Perhaps the{' '}
          <Link to="/">home page</Link> can help?
        </p>
      </div>
    </div>
  )
}

export default PageNotFound
