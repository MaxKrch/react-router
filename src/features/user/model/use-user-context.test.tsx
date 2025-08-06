import React, { type PropsWithChildren } from 'react'
import { vi } from 'vitest'
import useUser from './use-user-context'
import { AUTH_STATUS } from '@/shared/const/status' 
import { USER_CONTEXT_ACTIONS } from './user-consts'
import type { UserAction } from './user-types'
import { renderHook } from '@testing-library/react'
import { UserDispatchContext, UserStateContext } from './user-context'

describe('Hook: useUserContext', () => {      
  const mockUserStateContext = {
    profile: null,
    status: AUTH_STATUS.IDLE,
  }
  
  describe('useUserState', () => {
    it('throws if no context', () => {
      expect(() => {
        renderHook(() => useUser())
      }).toThrow('useUserState must be used within a UserProvider')
    })

    it('returns context if present', () => {


      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UserStateContext.Provider value={mockUserStateContext}>
          <UserDispatchContext.Provider value={null}>
            {children}
          </UserDispatchContext.Provider>
        </UserStateContext.Provider>
      )

      const { result } = renderHook(() => useUser(), { wrapper })

      expect(result.current.state).toBe(mockUserStateContext)
    })
  })

  describe('useUserDispatch', () => {
    const mockUserDispatchContext = vi.fn()
    const mockUser = {
      id: `123`,
      login: `max`,
      avatar: `http://www.avatar.com/1`,
      name: `Max`,
    }

    const MockUserDispatchProvider = ({ children }: PropsWithChildren) => (
      <UserDispatchContext.Provider value={mockUserDispatchContext}>
        <UserStateContext.Provider value={mockUserStateContext}>
          {children}
        </UserStateContext.Provider>
      </UserDispatchContext.Provider>
    )

    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('setUserData calls dispatch with correct action', () => {
      const expected: UserAction = {
        type: USER_CONTEXT_ACTIONS.SET_USER,
        payload: mockUser,
      }

      const { result } = renderHook(() => useUser(), {
        wrapper: MockUserDispatchProvider,
      })

      result.current.setUserData(mockUser)

      expect(mockUserDispatchContext).toHaveBeenCalledWith(expected)
    })

    it('removeUserData calls dispatch with correct action', () => {
      const expected: UserAction = {
        type: USER_CONTEXT_ACTIONS.REMOVE_USER,
      }

      const { result } = renderHook(() => useUser(), {
        wrapper: MockUserDispatchProvider,
      })

      result.current.removeUserData()

      expect(mockUserDispatchContext).toHaveBeenCalledWith(expected)
    })

    it('setUserStatus calls dispatch with correct action', () => {
      const expected: UserAction = {
        type: USER_CONTEXT_ACTIONS.SET_STATUS,
        payload: AUTH_STATUS.AUTH,
      }

      const { result } = renderHook(() => useUser(), {
        wrapper: MockUserDispatchProvider,
      })

      result.current.setUserStatus(expected.payload)

      expect(mockUserDispatchContext).toHaveBeenCalledWith(expected)
    })
  })
})
