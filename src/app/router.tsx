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
import Header from '@/widgets/Header'
import NewsHeader from '@/widgets/NewsHeader'
import RaceHeader from '@/widgets/RaceHeader'
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

export function AppRouter() {
  return (
    <BrowserRouter basename="/react-router">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<MainPage />} />
          
          <Route path={ROUTES.RACE_TAXI.BASE} element={<RaceHeader />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.RACE_TAXI.FORZA} element={<ForzaCarting />} />
            <Route path={ROUTES.RACE_TAXI.DRIFT} element={<Drift />} />
            <Route
              path={ROUTES.RACE_TAXI.TIME_ATTACK}
              element={<TimeAttack />}
            />
          </Route>
          
          <Route path={ROUTES.NEWS_MAGAZINE.BASE} element={<NewsHeader/>}>
            <Route index element={<Guest />} />
            <Route path={ROUTES.NEWS_MAGAZINE.NEWS} element={<NewsFeed />} />
            <Route path={ROUTES.NEWS_MAGAZINE.NEWS_DEATILS} element={<News />} />
            <Route path='*' element={<NotFoundNews />} />
          </Route>
          
          <Route path={ROUTES.SOCIAL_NETWORK.BASE}>
            <Route index element={<Feed />} />
            <Route path={ROUTES.SOCIAL_NETWORK.POST_DETAILS} element={<Post />} />
            <Route path={ROUTES.SOCIAL_NETWORK.NEW_POST} element={<CreatePost />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
