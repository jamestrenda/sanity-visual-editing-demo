import type { IconProps } from './type'

const IconRedirect = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M22.6 278.6L0 256l22.6-22.6L233.4 22.6 256 0l22.6 22.6L489.4 233.4 512 256l-22.6 22.6L278.6 489.4 256 512l-22.6-22.6L22.6 278.6zM45.3 256L256 466.7 466.7 256 256 45.3 45.3 256zM304 137.4l11.3 11.3 64 64L390.6 224l-11.3 11.3-64 64L304 310.6 281.4 288l11.3-11.3L329.4 240H208v80 16H176V320 224 208h16H329.4l-36.7-36.7L281.4 160 304 137.4z" />
    </svg>
  )
}

export { IconRedirect }