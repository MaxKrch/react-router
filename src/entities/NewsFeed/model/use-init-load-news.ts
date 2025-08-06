import { useUser } from "@/features/user/model"
import { AUTH_STATUS, STATUS, type STATUS_TYPE } from "@/shared/const/status"
import type { NewsType } from "@/shared/types/news"
import { useEffect, useRef, useState } from "react"
import requestNews from "../api/request-news"

const useInitLoadNews = () => {
    const [news, setNews] = useState<NewsType[] | null>(null)
    const status = useRef<STATUS_TYPE>(STATUS.IDLE)
    const { state: user } = useUser();

    useEffect(() => {
        if(user.status === AUTH_STATUS.AUTH && status.current === STATUS.IDLE) {
            status.current = STATUS.PENDING;
           
            requestNews()
                .then(resp => {
                    if(resp.status === STATUS.SUCCESS && resp.data) {
                        setNews(resp.data);
                        status.current = STATUS.SUCCESS
                    } 
                })
                .catch(() => {
                    status.current === STATUS.ERROR;                    
                })
        }

    }, [user, status])

    return news
}

export default useInitLoadNews