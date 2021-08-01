import React, { ReactNode } from 'react'
import { classNames } from 'classNames'

type Variant = 'filled' | 'outline'
type Color = 'red' | 'blue' | 'gray'
type Template = `${Variant}_${Color}`

const templates: Record<Template, string> = {
  filled_red: 'bg-red-400 text-red-50 hover:bg-red-500',
  filled_blue: 'bg-blue-400 text-blue-50 hover:bg-blue-500',
  filled_gray: 'bg-gray-400 text-gray-50 hover:bg-gray-500',
  outline_red: 'bg-white text-red-600 border border-red-400 hover:bg-red-50',
  outline_blue:
    'bg-white text-blue-600 border border-blue-400 hover:bg-blue-50',
  outline_gray: 'bg-white text-black border border-gray-400 hover:bg-gray-100',
}

type Size = 'small' | 'medium' | 'large'

const sizes: Record<Size, string> = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-5 py-3 text-lg font-semibold',
}

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  variant?: Variant
  color?: Color
  size?: Size
  disabled?: true | boolean | undefined
  children?: ReactNode
  // onClick?: () => void
}

// type a = React.HTMLProps<HTMLButtonElement>

// type a = React.ButtonHTMLAttributes
// React.HtmlHTMLAttributes<HTMLButtonElement> &
//   React.ButtonHTMLAttributes &

export const Button: React.FC<Props> = ({
  variant = 'filled',
  color = 'blue',
  size = 'medium',
  disabled,
  children,
  // onClick,
  ...props
}) => {
  return (
    <button
      // onClick={onClick}
      disabled={disabled}
      className={classNames(
        'transition duration-300 rounded cursor-pointer outline-none',
        templates[`${variant}_${color}` as Template],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
