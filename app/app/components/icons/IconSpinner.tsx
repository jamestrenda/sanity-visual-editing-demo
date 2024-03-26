import type { IconProps } from '.'

const IconSpinner = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M477.7 384c21.8-37.7 34.3-81.4 34.3-128C512 114.6 397.4 0 256 0V32c123.7 0 224 100.3 224 224c0 40.8-10.9 79.1-30 112l27.7 16z" />
    </svg>
  )
}

export { IconSpinner }
