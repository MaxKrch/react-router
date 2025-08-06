import { useUser } from '@/features/user/model'
import { ROUTES } from '@/shared/const/routes'
import { AUTH_STATUS } from '@/shared/const/status'
import Spinner from '@/shared/ui/Spinner'
import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const PublicRouter = ({ children }: PropsWithChildren) => {
  const { state: user } = useUser()
  const location = useLocation()

  if (user.status === AUTH_STATUS.UNAUTH) return children
  if (user.status === AUTH_STATUS.PENDING) return <Spinner />

  return (
    <Navigate
      to={location.state?.from.pathname ?? ROUTES.NEWS_MAGAZINE.NEWS_FEED}
    />
  )
}

export default PublicRouter
