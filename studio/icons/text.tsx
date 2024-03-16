import type { IconProps } from './type'

const IconText = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 448 512"
      fill="currentColor"
      {...props}
    >
      <path d="M0 32H16 432h16V48v64 16H416V112 64H240l0 384h64 16v32H304 144 128V448h16 64l0-384H32v48 16H0V112 48 32z" />
    </svg>
  )
}

export { IconText }
