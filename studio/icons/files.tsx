import type { IconProps } from './type'

const IconFiles = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 448 512"
      fill="currentColor"
      {...props}
    >
      <path d="M128 384V32H304v96 16h16 96V384H128zM336 57.5L390 112H336V57.5zM324 0H128 96V32 384v32h32H416h32V384 125L324 0zM32 112V96H0v16V496v16H16 336h16V480H336 32V112z" />
    </svg>
  )
}

export { IconFiles }
