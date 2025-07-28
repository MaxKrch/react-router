import { Outlet } from 'react-router-dom'
import RaceHeader from '@/widgets/RaceHeader'
import ErrorBoundary from '@/app/ErrorBoundary'
import NavigationLoader from '@/shared/ui/NavigationLoader/NagitionLoader'

const RaceLayout = () => {
  return (
    <div data-testid="RaceLayout" className="race-container">
      <ErrorBoundary>
        <RaceHeader />
        <div className="race-body">
          <NavigationLoader>
            <Outlet />
          </NavigationLoader>
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default RaceLayout
