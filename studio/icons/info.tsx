import type { IconProps } from './type'

const IconInfo = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM192 352v32h16 96 16V352H304 272V240 224H256 216 200v32h16 24v96H208 192zm88-168V136H232v48h48z" />
    </svg>
  )
}

export { IconInfo }