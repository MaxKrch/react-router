import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes'
import { Suspense } from 'react'
import Spinner from '@/shared/ui/Spinner'
const Router = createBrowserRouter(routes, {
  basename: '/react-router',
})

const AppRouter = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={Router} />
    </Suspense>
  )
}

export default AppRouter
