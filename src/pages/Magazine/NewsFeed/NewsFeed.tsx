import useLoadNews from '@/entities/NewsFeed/model/use-load-news'
import useNewsFeed from '@/entities/NewsFeed/model/use-news-feed'
import NewsFeed from '@/entities/NewsFeed/ui/NewsFeed'
import { STATUS } from '@/shared/const/status'
import ErrorMessage from '@/shared/ui/ErrorMessage'
import Spinner from '@/shared/ui/Spinner'
import { useEffect } from 'react'

const NewsPage = () => {
  const { loadNews, status } = useLoadNews()
  const { news } = useNewsFeed()

  useEffect(() => {
    if (!news && status === STATUS.IDLE) loadNews()
  }, [loadNews, news, status])

  let content
  if (news) {
    content = <NewsFeed news={news} />
  } else if (status === STATUS.PENDING) {
    content = <Spinner />
  } else {
    content = <ErrorMessage onClick={loadNews} />
  }

  return (
    <div
      data-testid="news-feed"
      className="max-w-[1280px] min-w-[320px] w-full"
    >
      {content}
    </div>
  )
}

export default NewsPage
