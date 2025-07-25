import { memo } from 'react'

type ErrorMessageProps = {
  error?: string
  onClick?: () => void
}
const ErrorMessage = ({ error = `Что-то пошло не так...`, onClick }: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-3 h-full w-full">
      <div className="font-semibold text-xl">{error}</div>
      {onClick && (
        <button
          aria-label="попробовать снова"
          className="cursor-pointer py-1 px-3 border text-white rounded bg-blue-500 font-semibold hover:bg-blue-700"
          onClick={onClick}
        >
          Попробовать снова
        </button>
      )}
    </div>
  )
}

export default memo(ErrorMessage)
