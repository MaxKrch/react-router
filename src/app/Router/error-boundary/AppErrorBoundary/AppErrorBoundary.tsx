import type { PropsWithChildren } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

const AppErrorBoundaryFallBack = () => {
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 bg-green-100 h-[100vh]">
      <h2 className="text-2xl">Кажется, что-то пошло не так</h2>
      <div className="flex flex-col justify-center items-center text-sm">
        <p>Попробуйте обновить страницу.</p>
        <p>Если ошибка повторится - напишите нам, мы все починим!</p>
      </div>
      <button
        className="roinde bg-blue-500 text-white text-sm cursor-pointer px-4 py-1 rounded border border-white hover:bg-blue-700"
        onClick={reloadPage}
      >
        Обновить
      </button>
    </div>
  )
}

const AppErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <ReactErrorBoundary FallbackComponent={AppErrorBoundaryFallBack}>
      {children}
    </ReactErrorBoundary>
  )
}

export default AppErrorBoundary
