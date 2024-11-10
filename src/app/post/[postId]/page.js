import GoTodashboardBtn from "@/app/components/GoTodashboardBtn";
import CommentForm from "@/app/components/CommentForm";
import { auth } from "../../../../auth";
import UpvoteBtn from "@/app/components/UpvoteBtn";
import PostDetails from "@/app/components/PostDetails";
const page = async({params}) => {
  const {postId} =await params
  const session = await auth()  
  return (
    <div className="lg:px-44 sm:px-10 px-4 py-12" >
      <GoTodashboardBtn/>
      <div className="flex flex-col md:flex-row justify-around mt-12">
        <div className="md:w-1/3 md:mr-12 mb-10">
          <PostDetails postId={postId} userId={session.userId}/>
          <p>{session.userId}</p>
        </div>
        <div className="w-full md:w-2/5 p-5 " >
         <CommentForm postid={postId} authorid={session.userId}/>
        </div>
      </div>
    </div>
  )
}

export default page
