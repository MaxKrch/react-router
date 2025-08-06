import useNewsDetails from '@/entities/NewsDetails/model/useNewsDetails'
import News from '@/entities/NewsDetails/ui/News'
import useLoadNews from '@/entities/NewsFeed/model/use-load-news'
import useNewsFeed from '@/entities/NewsFeed/model/use-news-feed'
import { ROUTES } from '@/shared/const/routes'
import { STATUS, type STATUS_TYPE } from '@/shared/const/status'
import type { NewsType } from '@/shared/types/news'
import ErrorMessage from '@/shared/ui/ErrorMessage'
import PageErrorMessage from '@/shared/ui/PageErrorMessage'
import Spinner from '@/shared/ui/Spinner'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type NewsState =
  | 'LOADING'
  | 'NEWS_ERROR'
  | 'DETAILS_ERROR'
  | 'UNKNOWN_ERROR'
  | 'SUCCESS'

const getNewsPageState = (
  status: STATUS_TYPE,
  news: NewsType[] | null,
  newsDetails: NewsType | null | undefined
): NewsState => {
  if (!news && (status === STATUS.PENDING || status === STATUS.IDLE))
    return 'LOADING'
  if (!news && status === STATUS.ERROR) return 'NEWS_ERROR'
  if (news && !newsDetails) return 'DETAILS_ERROR'
  if (!news && status === STATUS.SUCCESS) return 'UNKNOWN_ERROR'
  return 'SUCCESS'
}

const NewsDetails = () => {
  const { loadNews, status } = useLoadNews()
  const { news } = useNewsFeed()
  const newsDetails = useNewsDetails()
  const navigate = useNavigate()

  useEffect(() => {
    if (!news) loadNews()
  }, [news, loadNews])

  const state = getNewsPageState(status, news, newsDetails)

  switch (state) {
    case 'LOADING':
      return <Spinner />

    case 'NEWS_ERROR':
      return <ErrorMessage onClick={loadNews} />

    case 'DETAILS_ERROR':
      return (
        <ErrorMessage
          onClick={() => navigate(ROUTES.NEWS_MAGAZINE.NEWS_FEED)}
          error="Похоже, такой новости нет на сайте..."
          retryMessage="К новостям"
        />
      )

    case 'UNKNOWN_ERROR':
      return <PageErrorMessage />

    case 'SUCCESS':
    default:
      return <News news={newsDetails!} />
  }
}

export default NewsDetails
