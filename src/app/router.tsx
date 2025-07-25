import Guest from '@/pages/Magazine/Guest'
import News from '@/pages/Magazine/News/News'
import NewsFeed from '@/pages/Magazine/NewsFeed'
import NotFoundNews from '@/pages/Magazine/NotFoundNews'
import MainPage from '@/pages/MainPage'
import CreatePost from '@/pages/Network/CreatePost'
import Feed from '@/pages/Network/Feed'
import Post from '@/pages/Network/Post'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import Drift from '@/pages/RaceTaxi/Drift'
import ForzaCarting from '@/pages/RaceTaxi/ForzaCarting'
import HomePage from '@/pages/RaceTaxi/Home'
import TimeAttack from '@/pages/RaceTaxi/TimeAttack'
import { ROUTES } from '@/shared/const/routes'
import RaceLayout from '@/layouts/RaceLayout'
import {
  // createBrowserRouter,
  // RouterProvider,
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import NetworkLayout from '@/layouts/NetworkLayout'
import MagazineLayout from '@/layouts/MagazineLayout'


export function AppRoutes() {
  return(
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<MainPage />} />
        
        <Route path={ROUTES.RACE_TAXI.BASE} element={<RaceLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.RACE_TAXI.FORZA} element={<ForzaCarting />} />
          <Route path={ROUTES.RACE_TAXI.DRIFT} element={<Drift />} />
          <Route
            path={ROUTES.RACE_TAXI.TIME_ATTACK}
            element={<TimeAttack />}
          />
        </Route>
        
        <Route path={ROUTES.NEWS_MAGAZINE.BASE} element={<MagazineLayout />}>
          <Route index element={<Guest />} />
          <Route path={ROUTES.NEWS_MAGAZINE.NEWS} element={<NewsFeed />} />
          <Route path={ROUTES.NEWS_MAGAZINE.NEWS_DEATILS} element={<News />} />
          <Route path='*' element={<NotFoundNews />} />
        </Route>
        
        <Route path={ROUTES.SOCIAL_NETWORK.BASE} element={<NetworkLayout />}>
          <Route index element={<Feed />} />
          <Route path={ROUTES.SOCIAL_NETWORK.POST_DETAILS} element={<Post />} />
          <Route path={ROUTES.SOCIAL_NETWORK.NEW_POST} element={<CreatePost />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

function AppRouter() {
  return (
    <BrowserRouter basename="/react-router">
      <AppRoutes />   
    </BrowserRouter>
  )
}

export default AppRouter

