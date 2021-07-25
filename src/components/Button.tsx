import { ReactNode } from 'react'
import { classNames } from '../classNames'

enum Variant {
  DEFAULT,
  RED,
  BLUE,
}
const VARIANT_MAPS: Record<Variant, string> = {
  [Variant.DEFAULT]: 'bg-white  border-gray-400 hover:bg-gray-50',
  [Variant.RED]: 'text-red-600 border-red-400 hover:bg-red-50',
  [Variant.BLUE]: 'text-blue-600 border-blue-400 hover:bg-blue-50',
}

type Props = {
  variant: Variant
  children?: ReactNode
}

export const Button = (props: Props) => {
  const { variant, children } = props

  return (
    <button
      className={classNames(
        'px-4 py-2  transition duration-300 bg-white border  rounded cursor-pointer ',
        VARIANT_MAPS[variant]
      )}
    >
      {children}
    </button>
  )
}

// Button.variant = VARIANT_MAPS
