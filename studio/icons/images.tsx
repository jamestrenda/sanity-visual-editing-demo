import type { IconProps } from './type'

const IconImages = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 576 512"
      fill="currentColor"
      {...props}
    >
      <path d="M128 64H544V201.4l-68.7-68.7L464 121.4l-11.3 11.3L304 281.4l-84.7-84.7L208 185.4l-11.3 11.3L128 265.4V64zm448 0V32H544 128 96V64 304v48 32h32H240h0H544h32V352 240 240 64zM464 166.6l80 80V352H278.6l36.7-36.7L464 166.6zM281.4 304l-48 48H128V310.6l80-80L281.4 304zM32 112V96H0v16V464v16H16 464h16V448H464 32V112zm232 48a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
    </svg>
  )
}

export { IconImages }
