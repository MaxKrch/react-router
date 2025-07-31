import type { PropsWithChildren } from "react";

const PrivateRouter = ({children}: PropsWithChildren) => {
    return(
        <div>
            hello
            {children}
        </div>
    )
}

export default PrivateRouter

