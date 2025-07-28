import type { PropsWithChildren } from 'react'
import ErrorBoundary from './Router/error-boundary/AppErrorBoundary/AppErrorBoundary'

const AppProviders = ({ children }: PropsWithChildren) => {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

export default AppProviders
