import { ROUTES } from "@/shared/const/routes"
import { NavLink } from "react-router-dom"

const AppMenu = () => {
    const baseClasses = `
        hover:bg-blue-400
        border border-gray-300 
        flex justify-center items-center 
        h-[90%] w-24 rounded 
        text-center uppercase font-semibold`
    const activeClasses = `${baseClasses} bg-blue-700 text-white` 
    const passiveClasses = `${baseClasses} bg-white`

    return (
      <nav className="h-full flex gap-3 items-center w-full px-1">
        <NavLink
          to={ROUTES.RACE_TAXI.HOME}
          className={({ isActive }) => (isActive ? activeClasses : passiveClasses)}
        >
          Race Taxi
        </NavLink>
        <NavLink
          to={ROUTES.NEWS_MAGAZINE.GUEST}
          className={({ isActive }) => (isActive ? activeClasses : passiveClasses)}
        >
          Magazine
        </NavLink>
        <NavLink
          to={ROUTES.SOCIAL_NETWORK.POST_FEED}
          className={({ isActive }) => (isActive ? activeClasses : passiveClasses)}
        >
          Network
        </NavLink>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? activeClasses : passiveClasses)}
        >
          Main Page
        </NavLink>
      </nav>
    )
}

export default AppMenu