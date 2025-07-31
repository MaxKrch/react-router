import PageErrorMessage from '@/shared/ui/PageErrorMessage'
import { Suspense, type ComponentType } from 'react'
import type { RouteObject } from 'react-router-dom'

const lazyRouter = (
  loader: () => Promise<{ default: ComponentType }>
): Pick<RouteObject, 'lazy' | 'errorElement'> => ({
  lazy: async () => {
    try {
      const { default: Component } = await loader()

      return {
        Component: () => (
          <Suspense fallback={<div>Загрузка...</div>}>
            <Component />
          </Suspense>
        ),
      }
    } catch (error) {
      console.error('Ошибка загрузки модуля:', error)
      return {
        Component: () => <PageErrorMessage />,
      }
    }
  },
  errorElement: <PageErrorMessage />,
})

export default lazyRouter
