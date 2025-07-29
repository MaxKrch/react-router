import SectionErrorBoundary from '@/app/Router/error-boundary/SectionErrorBoundary'
import PostContext from '@/features/post/model/PostContext'
import Spinner from '@/shared/ui/Spinner'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const NetworkLayout = () => {
  return (
    <SectionErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <PostContext>
          <Outlet />
        </PostContext>
      </Suspense>
    </SectionErrorBoundary>
  )
}

export default NetworkLayout
