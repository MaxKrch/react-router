import { Outlet } from "react-router-dom";
import RaceHeader from "@/widgets/RaceHeader";
import ErrorBoundary from "@/app/ErrorBoundary";

const RaceLayout = () => {
    return(
      <div className="race-container">
        <ErrorBoundary>
          <RaceHeader />
          <div className="race-body">
              <Outlet />
          </div>
        </ErrorBoundary>
      </div>

    )
}

export default RaceLayout