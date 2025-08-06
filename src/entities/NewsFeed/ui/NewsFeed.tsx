import NewsItem from "@/entities/NewsFeed/ui/NewsItem"
import type { NewsType } from "@/shared/types/news"

type NewsFeedType = {
    news: NewsType[]
}

const NewsFeed = ({news}: NewsFeedType) => {
    return (
        <ul className="w-full grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] justify-center gap-3 px-3">
            {
                news.map((item) => (
                    <li className="border border-gray-300" key={item.id}>
                        <NewsItem news={item} />
                    </li>
                ))
            }
        </ul>
    )
}

export default NewsFeed