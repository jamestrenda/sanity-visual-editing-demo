import type { IconProps } from './type'

const IconFile = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 384 512"
      fill="currentColor"
      {...props}
    >
      <path d="M352 192H208 192V176 32H32V480H352V192zm-5.3-32L224 37.3V160H346.7zM32 0H232L384 152V480v32H352 32 0V480 32 0H32z" />
    </svg>
  )
}

export { IconFile }
