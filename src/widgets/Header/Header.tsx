import { ROUTES } from '@/shared/const/routes'
import { NavLink, Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <div className="">
      <nav className="">
        <NavLink
          to={ROUTES.RACE_TAXI.HOME}
          className={(isActive) => (isActive ? '' : '')}
        >
          Race Taxi
        </NavLink>
        <NavLink
          to={ROUTES.NEWS_MAGAZINE.GUEST}
          className={(isActive) => (isActive ? '' : '')}
        >
          News Magazine
        </NavLink>
        <NavLink
          to={ROUTES.SOCIAL_NETWORK.POSTS}
          className={(isActive) => (isActive ? '' : '')}
        >
          Social Nwtwork
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default Header
