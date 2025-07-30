import SectionErrorBoundary from '@/app/Router/error-boundary/SectionErrorBoundary'
import PostContext from '@/features/post/model/PostContext'
import { Outlet } from 'react-router-dom'

const NetworkLayout = () => {
  return (
    <SectionErrorBoundary>
      <PostContext>
        <Outlet />
      </PostContext>
    </SectionErrorBoundary>
  )
}

export default NetworkLayout
