import { memo } from 'react'
import type { ButtonProps } from './types'

const PrimaryButton = ({
  title,
  onClick,
  type = 'button',
  size = 'normal',
  disabled = false,
}: ButtonProps) => {

  let classes = `text-white px-4 py-1 rounded uppercase font-semibold`

  switch (size) {
    case 'small':
      classes += ' text-[10px]'
      break

    case 'big':
      classes += ' text-[16px]'
      break

    default:
      classes += ' text-[12px]'
  }


  disabled
    ? (classes += ` bg-blue-400`)
    : (classes += ` bg-blue-600 hover:bg-blue-800 cursor-pointer`)

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

export default memo(PrimaryButton)
