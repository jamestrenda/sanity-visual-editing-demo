import type { IconProps } from './type'

const IconPlane = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M0 288l37 15.9 155 66.4v0V416v72l64 24 55.7-90.4-29.7-12.7-39.4 64-18.6-7V416 384v0l193.5 82.9L448 480l4.4-32.9L506.7 39.7 512 0 477.1 19.6 35.1 268.2 0 288zm239.4 67.8L468 87.7 421.9 434 239.4 355.8zM430.2 82.7L208.6 342.6 72.2 284.1l358-201.4z" />
    </svg>
  )
}

export { IconPlane }