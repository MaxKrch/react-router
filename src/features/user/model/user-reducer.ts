import { AUTH_STATUS } from '@/shared/const/status'
import { USER_CONTEXT_ACTIONS } from './user-consts'
import { type UserAction, type UserState } from './user-types'

export const initialUserState: UserState = {
  profile: null,
  status: AUTH_STATUS.IDLE,
}

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case USER_CONTEXT_ACTIONS.SET_USER:
      return { ...state, profile: action.payload }

    case USER_CONTEXT_ACTIONS.REMOVE_USER:
      return { ...state, profile: null }
    
      case USER_CONTEXT_ACTIONS.SET_STATUS:
      return { ...state, status: action.payload }
    
      default:
      return state
  }
}
