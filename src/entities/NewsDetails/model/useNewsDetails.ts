import useNewsFeed from "@/entities/NewsFeed/model/use-news-feed"
import type { NewsType } from "@/shared/types/news"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const useNewsDetails = () => {
    const [newsDetails, setNewsDetails] = useState<NewsType | null | undefined>(null)
    const { news } = useNewsFeed()
    const { id } = useParams()

    if(!id) throw new Error("missing news id")

    useEffect(() => {
        const targetNews = news
            ? news.find(item => item.id === id)
            : null

        setNewsDetails(targetNews)
    }, [id, news])

    return newsDetails
}

export default useNewsDetails