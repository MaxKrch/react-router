import type { NewsType } from '@/shared/types/news'
import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'
import useInitLoadNews from './use-init-load-news'

export const NewsFeedStateContext = createContext<NewsType[] | null>([])
export const NewsFeedDispatchContext = createContext<
  Dispatch<SetStateAction<NewsType[] | null>> | undefined
>(undefined)

const NewsFeedProvider = ({ children }: PropsWithChildren) => {
  const [news, setNews] = useState<NewsType[] | null>(null)
  const loadedNews = useInitLoadNews()

  useEffect(() => {
    if (loadedNews) setNews(loadedNews)
  }, [loadedNews])

  return (
    <NewsFeedStateContext.Provider value={news}>
      <NewsFeedDispatchContext.Provider value={setNews}>
        {children}
      </NewsFeedDispatchContext.Provider>
    </NewsFeedStateContext.Provider>
  )
}

export default NewsFeedProvider
