import { memo } from 'react'

type ErrorMessageProps = {
  error?: string
  onClick?: () => void
}
const ErrorMessage = ({
  error = `Что-то пошло не так...`,
  onClick,
}: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-3 h-full w-full px-1 py-3">
      <div className="font-semibold text-xl">{error}</div>
      {onClick && (
        <button
          aria-label="попробовать снова"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          onClick={onClick}
        >
          Попробовать снова
        </button>
      )}
    </div>
  )
}

export default memo(ErrorMessage)
