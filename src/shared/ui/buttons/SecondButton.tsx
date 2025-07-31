import { memo } from 'react'
import type { ButtonProps } from './types'

const SecondButton = ({
  title,
  onClick,
  type = 'button',
  size = 'normal',
  disabled = false,
}: ButtonProps) => {
  
  let classes = `bg-white text-blue-800 border border-blue px-4 py-1 rounded cursor-pointer uppercase font-semibold hover:bg-gray-100`

  switch (size) {
    case 'small':
      classes += ' text-[9px]'
      break

    case 'big':
      classes += ' text-[15px]'
      break

    default:
      classes += ' text-[11px]'
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  )
}

export default memo(SecondButton)
