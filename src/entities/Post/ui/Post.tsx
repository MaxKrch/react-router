import { ROUTES } from "@/shared/const/routes"
import generatePathWithId from "@/shared/lib/router/generate-path-with-id"
import type { PostType } from "@/shared/types/posts"
import dayjs from "dayjs"
import 'dayjs/locale/ru'
import { useCallback } from "react"
import { useFetcher } from "react-router-dom"

type PostProps = {
    post: PostType
}
const Post = ({post}: PostProps) => {
    const date = post.edited || post.created
    const fetcher = useFetcher()

    const formattedDate = date
        ? dayjs(date).locale('ru').format('DD MMMM YYYY-hh:mm').split('-')
        : null

    const handleEditPost = useCallback(() => {

    }, [])

    const handleRemovePost = useCallback(() => {
        if(!post.id) return;

        fetcher.submit(null, {
            method: 'post',
            action: generatePathWithId(ROUTES.SOCIAL_NETWORK.REMOVE_POST, post.id)
        })
    }, [fetcher])

    return(
        <article className="bg-white box-shadow border border-gray-100 rounded">
            <header className="h-5 bg-blue-100 flex justify-end items-center p-2 gap-2">
                {
                    formattedDate &&
                    <>
                        <span className="text-[12px] font-semibold">{formattedDate[0]}</span>
                        <span>{formattedDate[1]}</span>
                    </>
                }
            </header>
            <main className="p-4">
                {
                    post.content
                }
            </main>
            <footer className="h-8 flex justify-end gap-2 items-center p-2">
                <button
                    className="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer uppercase font-semibold text-[12px] hover:bg-blue-800"
                    onClick={handleEditPost}
                >
                    Редактировать
                </button>
                <button
                    className="bg-white text-blue-800 border border-blue px-4 py-1 rounded cursor-pointer uppercase font-semibold text-[11px] hover:bg-gray-100"
                    onClick={handleRemovePost}
                >
                    Удалить
                </button>
            </footer>
        </article>
    )
}

export default Post;