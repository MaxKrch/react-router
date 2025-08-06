import { renderHook, act } from '@testing-library/react'
import UserProvider from './user-context'
import useUser from './use-user-context'
import type { PropsWithChildren } from 'react'
import type { UserProfile } from '@/shared/types' 

describe('User context integration', () => {
  const mockUser: UserProfile = {
    id: '123',
    login: 'max',
    avatar: 'www.avatar.com/1',
    name: 'Max',
  }

  it('sets and removes user', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <UserProvider>{children}</UserProvider>
    )

    const { result } = renderHook(
      () => useUser(),
      { wrapper }
    )

    await act(() => {
      result.current.setUserData(mockUser)
    })

    expect(result.current.state.profile).toEqual(mockUser)

    await act(() => {
      result.current.removeUserData()
    })

    expect(result.current.state.profile).toBeNull()
  })
})
