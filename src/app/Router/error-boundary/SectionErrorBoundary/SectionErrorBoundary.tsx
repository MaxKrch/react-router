import type { PropsWithChildren } from 'react'
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from 'react-error-boundary'

const SectionErrorBoundaryFallBack = ({
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 bg-green-100 h-[100vh]">
      <h2 className="text-2xl">Кажется, что-то пошло не так</h2>
      <div className="flex flex-col justify-center items-center text-sm">
        Попробовать снова?
      </div>
      <button
        className="roinde bg-blue-500 text-white text-sm cursor-pointer px-4 py-1 rounded border border-white hover:bg-blue-700"
        onClick={resetErrorBoundary}
      >
        Обновить
      </button>
    </div>
  )
}

const SectionErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <ReactErrorBoundary FallbackComponent={SectionErrorBoundaryFallBack}>
      {children}
    </ReactErrorBoundary>
  )
}

export default SectionErrorBoundary
