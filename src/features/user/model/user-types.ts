import type { Dispatch } from 'react'

import { USER_CONTEXT_ACTIONS } from './user-consts'
import type { UserProfile } from '@/shared/types'
import type { AUTH_STATUS_TYPE } from '@/shared/const/status'

export type UserState = {
  profile: UserProfile | null
  status: AUTH_STATUS_TYPE
}

export type UserAction =
  | { type: typeof USER_CONTEXT_ACTIONS.SET_USER; payload: UserProfile }
  | { type: typeof USER_CONTEXT_ACTIONS.REMOVE_USER }
  | { type: typeof USER_CONTEXT_ACTIONS.SET_STATUS; payload: AUTH_STATUS_TYPE }

export type UserDispatch = Dispatch<UserAction>
