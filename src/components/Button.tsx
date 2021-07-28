import { ReactNode } from 'react'
import { classNames } from 'classNames'

type Variant = 'primary' | 'outline'
type Color = 'default' | 'red' | 'blue'
type Template = `${Variant}_${Color}`

const templates: Record<Template, string> = {
  primary_default: 'bg-gray-400 text-gray-50 hover:bg-gray-500',
  primary_red: 'bg-red-400 text-red-50 hover:bg-red-500',
  primary_blue: 'bg-blue-400 text-blue-50 hover:bg-blue-500',
  outline_default:
    'bg-white text-black border border-gray-400 hover:bg-gray-100',
  outline_red: ' bg-white text-red-600 border border-red-400 hover:bg-red-50',
  outline_blue:
    'bg-white text-blue-600 border border-blue-400 hover:bg-blue-50',
}

type Props = {
  variant?: Variant
  color?: Color
  disabled?: true | boolean | undefined
  children?: ReactNode
  onClick?: () => void
}

export const Button: React.FC<Props> = ({
  variant = 'primary',
  color = 'default',
  disabled,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'px-4 py-2 transition duration-300 rounded cursor-pointer outline-none',
        templates[`${variant}_${color}` as Template],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  )
}
