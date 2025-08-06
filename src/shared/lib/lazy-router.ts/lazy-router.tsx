import PrivateRouter from '@/features/auth/ui/PrivateRouter'
import PublicRouter from '@/features/auth/ui/PublicRouter'
import { ROUTE_ACCESS, type ROUTE_ACCESS_TYPE } from '@/shared/const/routes'
import PageErrorMessage from '@/shared/ui/PageErrorMessage'
import Spinner from '@/shared/ui/Spinner'
import { Suspense, type ComponentType, type PropsWithChildren } from 'react'
import type { RouteObject } from 'react-router-dom'

const WithAccessWrapper = ({
  children,
  access,
}: PropsWithChildren<{ access: ROUTE_ACCESS_TYPE }>) => {
  switch (access) {
    case ROUTE_ACCESS.AUTH:
      return <PrivateRouter>{children}</PrivateRouter>

    case ROUTE_ACCESS.NO_AUTH:
      return <PublicRouter>{children}</PublicRouter>

    default:
      return <>{children}</>
  }
}

const lazyRouter = (
  loader: () => Promise<{ default: ComponentType }>,
  access: ROUTE_ACCESS_TYPE = ROUTE_ACCESS.ANY
): Pick<RouteObject, 'lazy' | 'errorElement'> => ({
  lazy: async () => {
    try {
      const { default: LazyComponent } = await loader()

      return {
        Component: () => (
          <Suspense fallback={<Spinner />}>
            <WithAccessWrapper access={access}>
              <LazyComponent />
            </WithAccessWrapper>
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
