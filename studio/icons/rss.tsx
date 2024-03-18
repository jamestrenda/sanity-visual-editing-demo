import type { IconProps } from './type'

const IconRSS = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      width="1em"
      viewBox="0 0 448 512"
      fill="currentColor"
      {...props}
    >
      <path d="M16 32C7.2 32 0 39.2 0 48s7.2 16 16 16c220.9 0 400 179.1 400 400c0 8.8 7.2 16 16 16s16-7.2 16-16C448 225.4 254.6 32 16 32zm0 144c-8.8 0-16 7.2-16 16s7.2 16 16 16c141.4 0 256 114.6 256 256c0 8.8 7.2 16 16 16s16-7.2 16-16c0-159.1-128.9-288-288-288zM32 416a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm96 0A64 64 0 1 0 0 416a64 64 0 1 0 128 0z" />
    </svg>
  )
}

export { IconRSS }
