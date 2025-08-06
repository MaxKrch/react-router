import { useUser } from "@/features/user/model";
import { ROUTES } from "@/shared/const/routes";
import { AUTH_STATUS } from "@/shared/const/status";
import Spinner from "@/shared/ui/Spinner";
import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({children}: PropsWithChildren) => {
    const { state: user } = useUser();
    const location = useLocation();
    const state = {
        from: location
    };

    if(user.status === AUTH_STATUS.AUTH) return children
    if(user.status == AUTH_STATUS.PENDING) return <Spinner />

    return <Navigate to={ROUTES.NEWS_MAGAZINE.GUEST} state={state} />
}

export default PrivateRouter