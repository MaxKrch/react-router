import { Outlet } from 'react-router-dom'
import RaceHeader from '@/widgets/RaceHeader'
import NavigationLoader from '@/shared/ui/NavigationLoader/NagitionLoader'
import SectionErrorBoundary from '@/app/Router/error-boundary/SectionErrorBoundary/'

const RaceLayout = () => {
  return (
    <div data-testid="RaceLayout" className="race-container">
      <SectionErrorBoundary>
        <RaceHeader />
        <div className="race-body">
          <NavigationLoader>
            <Outlet />
          </NavigationLoader>
        </div>
      </SectionErrorBoundary>
    </div>
  )
}

export default RaceLayout
