import type { PostType } from "@/shared/types/posts"
import 'dayjs/locale/ru'
import PostFooter from "./PostFooter"
import clsx from "clsx"
import formatDate from "../lib/formatted-date"
import useHandlePost from "../model/use-handle-post"

type PostProps = {
    post: PostType
    onClick?: (id: PostType['id']) => void
}

const Post = ({post, onClick}: PostProps) => {
    const  { handleEditPost, handleRemovePost } = useHandlePost(post)
    const formattedDate = formatDate(post)

    return(
        <article className="bg-white box-shadow border border-gray-100 rounded overflow-hidden">
            {
                post.saved &&
                <header className="h-5 bg-blue-100 flex justify-end items-center p-2 gap-2">
                    {
                        formattedDate &&
                        <>
                            <span className="text-[12px] font-semibold">{formattedDate[0]}</span>
                            <span>{formattedDate[1]}</span>
                        </>
                    }
                </header>
            }
            <main 
                className={clsx(
                   "p-4",
                   {
                    "cursor-pointer": onClick
                   }
                )}
                onClick={() => {
                    if(onClick) {
                        onClick(post.id)
                    }
                }}
            >
                {
                    post.content
                }
            </main>
            <PostFooter 
                saved={post.saved}
                onEdit={handleEditPost}
                onRemove={handleRemovePost}
            />
        </article>
    )
}

export default Post;