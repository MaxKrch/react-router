import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes'

const Router = createBrowserRouter(routes, {
  basename: '/react-router',
})

const AppRouter = () => {

  return (
    <RouterProvider 
        router={Router}
    />
  )
}

export default AppRouter
