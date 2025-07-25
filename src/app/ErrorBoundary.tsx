import type { PropsWithChildren } from "react"
import { ErrorBoundary as ReactErrorBoundary} from "react-error-boundary"

const ErrorBoundaryFallBack = () => {
    return(
        <div>
            I am fall
        </div>
    )
}

const ErrorBoundary = ({children}: PropsWithChildren) => {
    return(
        <ReactErrorBoundary FallbackComponent={ErrorBoundaryFallBack}>
            {children}
        </ReactErrorBoundary>
    )
}

export default ErrorBoundary