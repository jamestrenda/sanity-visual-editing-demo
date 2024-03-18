import type { IconProps } from './type'

const IconBuilding = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 384 512"
      fill="currentColor"
      {...props}
    >
      <path d="M32 32V480h96V400 368h32 64 32v32 80h96V32H32zM160 480h64V400H160v80zm-32 32H32 0V480 32 0H32 352h32V32 480v32H352 256 224 160 128zM64 96H80h64 16v16 64 16H144 80 64V176 112 96zm32 32v32h32V128H96zM240 96h64 16v16 64 16H304 240 224V176 112 96h16zm16 64h32V128H256v32zM64 224H80h64 16v16 64 16H144 80 64V304 240 224zm32 32v32h32V256H96zm144-32h64 16v16 64 16H304 240 224V304 240 224h16zm16 64h32V256H256v32z" />
    </svg>
  )
}

export { IconBuilding }
