import type { PropsWithChildren } from 'react'
import ErrorBoundary from './ErrorBoundary'

const AppProviders = ({children}: PropsWithChildren) => {
  return(
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}

export default AppProviders;