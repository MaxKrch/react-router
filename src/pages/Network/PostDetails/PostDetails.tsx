import Post from "@/entities/Post/ui/Post"
import usePostDetails from "../../../features/post/model/use-post-details"
import PageErrorMessage from "@/shared/ui/PageErrorMessage"

const PostDetails = () => {
  const post = usePostDetails()
  return (
    <div className="p-4">
      { 
        post 
          ? <Post post={post} />
          : <PageErrorMessage />
      }
    </div>
  )
}

export default PostDetails
