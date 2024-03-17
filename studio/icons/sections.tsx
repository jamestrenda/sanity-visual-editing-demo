import type { IconProps } from './type'

const IconSections = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 576 512"
      fill="currentColor"
      {...props}
    >
      <path d="M288 64V224H32V64H288zM32 32H0V64 224v32H32 288h32V224 64 32H288 32zM544 64V352H416V64H544zM416 32H384V64 352v32h32H544h32V352 64 32H544 416zM96 336H304V448H96V336zM64 304v32V448v32H96 304h32V448 336 304H304 96 64z" />
      {/* <path d="M480 192c0-17.7-14.3-32-32-32L64 160c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32l0-256zm-32-64c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 192c0-35.3 28.7-64 64-64l384 0zm0-64c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 96c-8.8 0-16-7.2-16-16s7.2-16 16-16l384 0zM400 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L112 32c-8.8 0-16-7.2-16-16s7.2-16 16-16L400 0z" /> */}
    </svg>
  )
}

export { IconSections }
