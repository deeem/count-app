import { classNames } from 'classNames'
import { ReactNode } from 'react'

type Variant = 'teal' | 'orange' | 'fuchsia'

const variants: Record<Variant, string> = {
  teal: 'bg-teal-500 text-teal-50',
  orange: 'bg-orange-400 rounded text-orange-50',
  fuchsia: 'bg-fuchsia-400 text-fuchsia-50',
}

type Props = {
  variant: Variant
  children?: ReactNode
}

export const Badge: React.FC<Props> = ({ variant, children }) => {
  return (
    <span className={classNames('px-4 py-2 rounded', variants[variant])}>
      {children}
    </span>
  )
}
