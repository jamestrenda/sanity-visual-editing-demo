import type { IconProps } from './type'

const IconBadge = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 576 512"
      fill="currentColor"
      {...props}
    >
      <path d="M416 128c70.7 0 128 57.3 128 128s-57.3 128-128 128H160C89.3 384 32 326.7 32 256s57.3-128 128-128H416zM576 256c0-88.4-71.6-160-160-160H160C71.6 96 0 167.6 0 256s71.6 160 160 160H416c88.4 0 160-71.6 160-160zm-352 0A64 64 0 1 1 96 256a64 64 0 1 1 128 0zM64 256a96 96 0 1 0 192 0A96 96 0 1 0 64 256z" />
    </svg>
  )
}

export { IconBadge }
