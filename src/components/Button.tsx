import { ReactNode } from 'react'
import { classNames } from 'classNames'

type Variant = 'default' | 'red' | 'blue'

const variants: Record<Variant, string> = {
  default: 'bg-white  border-gray-400 hover:bg-gray-50',
  red: 'text-red-600 border-red-400 hover:bg-red-50',
  blue: 'text-blue-600 border-blue-400 hover:bg-blue-50',
}

type Props = {
  variant?: Variant
  disabled?: true | boolean | undefined
  children?: ReactNode
}

export const Button: React.FC<Props> = ({
  variant = 'default',
  disabled,
  children,
}) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        'px-4 py-2  transition duration-300 bg-white border  rounded cursor-pointer ',
        variants[variant],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  )
}
