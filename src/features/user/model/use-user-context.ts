import { useContext } from 'react'
import { UserDispatchContext, UserStateContext } from './user-context'
import type { UserDispatch } from './user-types'
import type { UserProfile } from '@/shared/types'
import { USER_CONTEXT_ACTIONS } from './user-consts'
import type { AUTH_STATUS_TYPE } from '@/shared/const/status'

const useUserState = () => {
  const context = useContext(UserStateContext)
  if (!context)
    throw new Error('useUserState must be used within a UserProvider')
  return context
}

const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext) as UserDispatch

  const setUserData = (profile: UserProfile) =>
    dispatch({
      type: USER_CONTEXT_ACTIONS.SET_USER,
      payload: profile,
    })

  const removeUserData = () =>
    dispatch({
      type: USER_CONTEXT_ACTIONS.REMOVE_USER,
    })

  const setUserStatus = (status: AUTH_STATUS_TYPE) => {
    dispatch({
      type: USER_CONTEXT_ACTIONS.SET_STATUS,
      payload: status,
    })
  }

  return {
    setUserData,
    removeUserData,
    setUserStatus,
  }
}

const useUser = () => ({
  state: useUserState(),
  ...useUserDispatch()
})

export default useUser;