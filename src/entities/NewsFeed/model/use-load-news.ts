import { useUser } from '@/features/user/model'
import { AUTH_STATUS, STATUS, type STATUS_TYPE } from '@/shared/const/status'
import { useCallback, useState } from 'react'
import requestNews from '../api/request-news'
import useNewsFeed from './use-news-feed'

const useLoadNews = () => {
  const [status, setStatus] = useState<STATUS_TYPE>(STATUS.IDLE)
  const { state: user } = useUser()
  const { setNews } = useNewsFeed()

  const loadNews = useCallback(() => {
    if (user.status === AUTH_STATUS.AUTH && status !== STATUS.PENDING) {
      setStatus(STATUS.PENDING)

      requestNews()
        .then((resp) => {
          if (resp.status === STATUS.SUCCESS && resp.data) {
            setStatus(STATUS.SUCCESS)
            setNews(resp.data)
          }
        })
        .catch(() => {
          setStatus(STATUS.ERROR)
        })
    }
  }, [setNews, status, user.status])

  return {
    loadNews,
    status,
  }
}

export default useLoadNews
