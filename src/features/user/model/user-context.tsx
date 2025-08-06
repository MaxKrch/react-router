import { createContext, useReducer, type PropsWithChildren } from 'react'
import { userReducer, initialUserState } from './user-reducer'
import type { UserDispatch, UserState } from './user-types'

export const UserStateContext = createContext<UserState | null>(null)
export const UserDispatchContext = createContext<UserDispatch | null>(null)

const UserProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState)

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export default UserProvider
