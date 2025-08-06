import { useUser } from '@/features/user/model'
import { AUTH_STATUS, STATUS, type STATUS_TYPE } from '@/shared/const/status'
import { useCallback, useEffect, useState } from 'react'
import { requestLogin, requestProfile } from '@/features/auth/api/auth'
import { tokenStorage, userStorage } from '@/shared/lib/storage'

type AuthData = {
  login: string
  password: string
}

const useAuth = () => {
  const [loginStatus, setLoginStatus] = useState<STATUS_TYPE>(STATUS.IDLE)
  const [getProfileStatus, setGetProfileStatus] = useState<STATUS_TYPE>(
    STATUS.IDLE
  )
  const { state: user, setUserData, setUserStatus, removeUserData } = useUser()
  const getProfile = useCallback(async () => {
    setGetProfileStatus(STATUS.PENDING)
    const response = await requestProfile()

    if (response.status === STATUS.SUCCESS && response.data) {
      const { data: profile } = response
      setGetProfileStatus(STATUS.SUCCESS)
      userStorage.setProfile(profile)
      setUserData(profile)
    } else {
      setGetProfileStatus(STATUS.ERROR)
      tokenStorage.removeToken()
      setUserStatus(AUTH_STATUS.UNAUTH)
    }
  }, [setUserData, setUserStatus])

  const login = useCallback(
    async ({ login, password }: AuthData) => {
      setLoginStatus(STATUS.PENDING)
      setUserStatus(AUTH_STATUS.PENDING)

      const response = await requestLogin({
        login,
        password,
      })

      if (response.status === STATUS.SUCCESS && response.data) {
        tokenStorage.setToket(response.data?.token)
        setLoginStatus(STATUS.SUCCESS)
        setUserStatus(AUTH_STATUS.AUTH)
        getProfile()

        return STATUS.SUCCESS
      } else {
        tokenStorage.removeToken()
        setLoginStatus(STATUS.ERROR)
        setUserStatus(AUTH_STATUS.UNAUTH)

        return STATUS.ERROR
      }
    },
    [setUserStatus, getProfile]
  )

  const logout = useCallback(() => {
    tokenStorage.removeToken()
    userStorage.removeProfile()
    setUserStatus(AUTH_STATUS.UNAUTH)
    removeUserData()
  }, [setUserStatus, removeUserData])

  const autoLogin = useCallback(() => {
    if (tokenStorage.getToken()) {
      setUserStatus(AUTH_STATUS.AUTH)
      getProfile()

      return STATUS.SUCCESS
    } else {
      return STATUS.ERROR
    }
  }, [setUserStatus, getProfile])

  useEffect(() => {
    if (user.status === AUTH_STATUS.UNAUTH) {
      setGetProfileStatus(STATUS.IDLE)
    }
  }, [user.status])

  return {
    login,
    autoLogin,
    logout,
    getProfile,
    loginStatus,
    getProfileStatus,
    setGetProfileStatus,
  }
}

export default useAuth
