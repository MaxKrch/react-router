import SectionErrorBoundary from '@/app/Router/error-boundary/SectionErrorBoundary'
import NewsFeedProvider from '@/entities/NewsFeed/model/news-feed-contex'
import { UserProvider } from '@/features/user/model'
import MagazineHeader from '@/widgets/MagazineHeader'
import { Outlet } from 'react-router-dom'

const MagazineLayout = () => {
  return (
    <SectionErrorBoundary>
      <UserProvider>
        <header className="w-full h-12 bg-gray-50 p-3">
          <MagazineHeader />
        </header>

        <main className="min-w-[300px] w-[90%] mx-auto mt-4">
          <NewsFeedProvider>
            <Outlet />
          </NewsFeedProvider>
        </main>
      </UserProvider>
    </SectionErrorBoundary>
  )
}

export default MagazineLayout
