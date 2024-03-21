import type { IconProps } from './type'

const IconAlignCenter = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 448 512"
      fill="currentColor"
      {...props}
    >
      <path d="M112 48H96V80h16H336h16V48H336 112zM16 176H0v32H16 432h16V176H432 16zM96 304v32h16H336h16V304H336 112 96zM16 432H0v32H16 432h16V432H432 16z" />
    </svg>
  )
}

export { IconAlignCenter }
