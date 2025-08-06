import { useUser } from '@/features/user/model'
import Logo from '../../shared/ui/Logo'
import { AUTH_STATUS, STATUS } from '@/shared/const/status'
import LoginForm from '@/features/auth/ui/LoginForm'
import InlineProfile from '@/entities/User/ui/InlineProfile'
import InlineSpinner from '@/shared/ui/InlineSpinner'
import useAuth from '@/features/auth/model/use-auth'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/const/routes'

const MagazineHeader = () => {
  const { state: user } = useUser()
  const { autoLogin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const getAuthComponent = () => {
    if (user.status === AUTH_STATUS.PENDING) return InlineSpinner
    if (user.status === AUTH_STATUS.AUTH) {
      return user.profile ? InlineProfile : InlineSpinner
    }
    return LoginForm
  }
  const AuthComponent = getAuthComponent()

  useEffect(() => {
    if (user.status === AUTH_STATUS.IDLE) {
      const result = autoLogin()

      if (
        result === STATUS.SUCCESS &&
        location.pathname === ROUTES.NEWS_MAGAZINE.GUEST
      ) {
        navigate(
          location.state?.from.pathname ?? ROUTES.NEWS_MAGAZINE.NEWS_FEED
        )
      }
    }
  }, [autoLogin, user.status, location, navigate])

  return (
    <div className="max-w-[1280px] min-w-[320px] w-full flex justify-between items-center m-auto h-full">
      <Logo />
      <div>
        <AuthComponent />
      </div>
    </div>
  )
}

export default MagazineHeader
