import MainPage from '@/pages/Main'
import Drift from '@/pages/RaceTaxi/Drift'
import ForzaCarting from '@/pages/RaceTaxi/ForzaCarting'
import HomePage from '@/pages/RaceTaxi/Home'
import TimeAttack from '@/pages/RaceTaxi/TimeAttack'
import { ROUTES } from '@/shared/const/routes'
import Header from '@/widgets/Header'
import RaceHeader from '@/widgets/RaceHeader'
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom'


export function AppRouter() {
  return(
    <BrowserRouter basename="/react-router">
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path={ROUTES.RACE_TAXI.BASE} element={<RaceHeader />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.RACE_TAXI.FORZA} element={<ForzaCarting />} />
            <Route path={ROUTES.RACE_TAXI.DRIFT} element={<Drift />} />
            <Route path={ROUTES.RACE_TAXI.TIME_ATTACK} element={<TimeAttack />} />
          </Route>

          </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter