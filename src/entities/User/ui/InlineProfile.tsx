import useAuth from "@/features/auth/model/use-auth"
import { useUser } from "@/features/user/model"

const InlineProfile = () => {
    const { state } = useUser()
    const { logout } = useAuth()
    const handleClickLogout = () => {
        logout()
    }

    return (
        <div className="flex gap-3 items-center">
        <div className="text-sm">
            Hello, <span>{state.profile?.name}</span>
        </div>
        <div className="h-9 w-9 rounded-full overflow-hidden">
            <img
            className="object-cover object-center"
            src={state.profile?.avatar}
            alt={state.profile?.name}
            />
        </div>
        <button
            className="h-6 flex items-center px-3 border border-red-600 text-red-600 font-semibold rounded cursor-pointer hover:bg-gray-250"
            onClick={handleClickLogout}
            aria-label="logout"
        >
            Logout
        </button>
        </div>
    )
}

export default InlineProfile