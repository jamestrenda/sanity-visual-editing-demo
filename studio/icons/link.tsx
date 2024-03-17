import type { IconProps } from './type'

const IconLink = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 576 512"
      fill="currentColor"
      {...props}
    >
      <path d="M0 256C0 167.6 71.6 96 160 96h80 16v32H240 160C89.3 128 32 185.3 32 256s57.3 128 128 128h80 16v32H240 160C71.6 416 0 344.4 0 256zm576 0c0 88.4-71.6 160-160 160H336 320V384h16 80c70.7 0 128-57.3 128-128s-57.3-128-128-128H336 320V96h16 80c88.4 0 160 71.6 160 160zM152 240H424h16v32H424 152 136V240h16z" />
    </svg>
  )
}

export { IconLink }