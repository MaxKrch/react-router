import { Outlet } from "react-router-dom";
import RaceHeader from "@/widgets/RaceHeader";

const RaceLayout = () => {
    return(
      <div className="race-container">
        <RaceHeader />
        <div className="race-body">
            <Outlet />
        </div>
      </div>

    )
}

export default RaceLayout