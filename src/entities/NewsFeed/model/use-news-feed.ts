import { useContext } from "react"
import { NewsFeedDispatchContext, NewsFeedStateContext } from "./news-feed-contex"

const useNewsFeedState = () => {
    const context = useContext(NewsFeedStateContext)
    if (context === undefined) throw new Error('useNewsFeedDispatch must be used within NewsFeedProvider')
    return context
}

const useNewsFeedDispatch = () => {
    const context = useContext(NewsFeedDispatchContext)
    if (context === undefined) throw new Error('useNewsFeedDispatch must be used within NewsFeedProvider')
    return context
}

const useNewsFeed = () => ({
    news: useNewsFeedState(),
    setNews: useNewsFeedDispatch()
})

export default useNewsFeed
