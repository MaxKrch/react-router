import Post from "@/entities/Post/ui/Post"
import usePost from "@/features/post/model/use-posts"
import type { RequestResult } from "@/shared/api/fetch-request/fetch-request"
import { ROUTES } from "@/shared/const/routes"
import { STATUS } from "@/shared/const/status"
import type { PostType } from "@/shared/types/posts"
import { useEffect } from "react"
import { Link, useLoaderData } from "react-router-dom"

const PostFeed = () => {
  const loaderPosts = useLoaderData<RequestResult<PostType[]>>()
  const { 
    state: posts,
    setPost
  } = usePost()

  useEffect(() => {
    if(loaderPosts.status === STATUS.SUCCESS && loaderPosts.data) setPost(loaderPosts.data)
  }, [loaderPosts])

  return(
    <div className="flex flex-col gap-4 w-full min-h-full p-2">
      <div className="flex justify-end p-2 bg-white rounded box-shadow-inset">
        <Link 
          className="bg-blue-600 text-white px-4 py-1 text-[12px] rounded cursor-pointer uppercase font-semibold hover:bg-blue-800"
          to={ROUTES.SOCIAL_NETWORK.NEW_POST}
        >Создать пост</Link>
      </div>
      <ul className="flex flex-col gap-2">
        {
          posts.map(post => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))
        }
      </ul>  
    </div>
  )
}

export default PostFeed
