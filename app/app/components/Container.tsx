import { twMerge } from 'tailwind-merge'

export function Container({ className = '', ...props }) {
  return (
    <div
      className={twMerge('w-full mx-auto max-w-7xl px-4', className)}
      {...props}
    />
  )
}
