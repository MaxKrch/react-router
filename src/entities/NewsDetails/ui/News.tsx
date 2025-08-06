import { ROUTES } from '@/shared/const/routes'
import type { NewsType } from '@/shared/types/news'
import { Link } from 'react-router-dom'

type NewsProps = {
  news: NewsType
}

const News = ({ news }: NewsProps) => {
  return (
    <article className="p-3 max-w-[900px] w-full m-auto flex flex-col gap-3">
      <div className="aspect-3/2 w-full flex justify-center">
        <img
          className="object-cover object-center"
          src={news.image}
          alt={news.title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">
          {`${news.title[0].toUpperCase()}${news.title.slice(1)}`}
        </h2>
        <div>{news.content}</div>
      </div>
      <Link
        className="bg-white text-blue-600 font-semibold border border-blue-600 rounded self-start flex justufy-center items-center px-3 py-1 hover:bg-gray-100"
        to={ROUTES.NEWS_MAGAZINE.NEWS_FEED}
      >
        К списку новостей
      </Link>
    </article>
  )
}

export default News
