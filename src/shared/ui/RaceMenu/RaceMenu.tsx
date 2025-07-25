import { ROUTES } from "@/shared/const/routes"
import { NavLink } from "react-router-dom"

const RaceMenu = () => {
    const baseClasses = 'race-menu__item';
    const activeClasses = `${baseClasses} race-menu__item-active`;
    const passiveClasses = `${baseClasses}`
    return (
      <nav className="race-menu">
        <NavLink
          to={ROUTES.RACE_TAXI.HOME}
          end
          className={({ isActive }) => (isActive ? activeClasses : passiveClasses)}
           >
          Главная
        </NavLink>
        <NavLink
          to={ROUTES.RACE_TAXI.DRIFT}
          className={({ isActive }) => (isActive ? activeClasses : passiveClasses)}
        >
          Дрифт-Такси
        </NavLink>
        <NavLink
          to={ROUTES.RACE_TAXI.TIME_ATTACK}
          className={({ isActive }) => (isActive ? activeClasses : passiveClasses)}
        >
          Time Attack
        </NavLink>
        <NavLink
          to={ROUTES.RACE_TAXI.FORZA}
          className={({ isActive }) => (isActive ? activeClasses : passiveClasses)}
        >
          Forza Carting
        </NavLink>
      </nav>
    )
}

export default RaceMenu