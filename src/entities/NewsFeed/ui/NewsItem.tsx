import { ROUTES } from '@/shared/const/routes'
import generatePathWithId from '@/shared/lib/router/generate-path-with-id'
import type { NewsType } from '@/shared/types/news'
import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'

type NewsItemProps = {
  news: NewsType
}

const NewsItem = ({ news }: NewsItemProps) => {
  const link = useMemo(
    () => generatePathWithId(ROUTES.NEWS_MAGAZINE.NEWS_DEATILS, news.id),
    [news.id]
  )

  return (
    <article className="w-full">
      <Link to={link}>
        <div className="aspect-video w-full">
          <img
            className="object-cover object-center"
            src={news.image}
            alt={news.title}
          />
        </div>
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <Link to={link}>
          <h2 className="text-lg font-semibold">
            {`${news.title[0].toUpperCase()}${news.title.slice(1)}`}
          </h2>
          <div>{news.content}</div>
        </Link>
      </div>
    </article>
  )
}

export default memo(NewsItem)
