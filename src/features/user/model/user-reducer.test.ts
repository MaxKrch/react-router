import { userReducer, initialUserState } from './user-reducer'
import { USER_CONTEXT_ACTIONS } from './user-consts'
import type { UserProfile } from '@/shared/types'
import { AUTH_STATUS } from '@/shared/const/status'
import type { UserAction } from './user-types'

describe('userReducer', () => {
  const mockUser: UserProfile = {
    id: `123`,
    login: `max`,
    avatar: `www.avatar.com/1`,
    name: `Max`,
  }

  it('sets user', () => {
    const result = userReducer(initialUserState, {
      type: USER_CONTEXT_ACTIONS.SET_USER,
      payload: mockUser,
    })

    expect(result.profile).toEqual(mockUser)
  })

  it('removes user', () => {
    const state = {
      ...initialUserState,
      profile: mockUser,
    }

    const result = userReducer(state, {
      type: USER_CONTEXT_ACTIONS.REMOVE_USER,
    })

    expect(result.profile).toBeNull()
  })

  it('sets status', () => {
    const result = userReducer(initialUserState, {
      type: USER_CONTEXT_ACTIONS.SET_STATUS,
      payload: AUTH_STATUS.PENDING,
    })

    expect(result.status).toBe(AUTH_STATUS.PENDING)
  })

  it('returns current state on unknown action', () => {
    const invalidAction = {
      type: 'UNKNOWN_ACTION',
    } as unknown as UserAction

    const result = userReducer(initialUserState, invalidAction)

    expect(result).toBe(initialUserState)
  })
})
