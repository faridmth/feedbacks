import GoTodashboardBtn from "@/app/components/GoTodashboardBtn";
import CommentForm from "@/app/components/CommentForm";
import { auth } from "../../../../auth";
import PostDetails from "@/app/components/PostDetails";
import CommentsWrapper from "@/app/components/CommentsWrapper";
import { CommentsProvider } from "@/app/components/commentsContext";
import LogOutBtn from "@/app/components/LogOutBtn";
const page = async({params}) => {
  const {postId} =await params
  const session = await auth()  
  return (
    <div className="lg:px-44 sm:px-10 mb-6 p-2" >
      <CommentsProvider>
      <div className=" sm:mt-16 flex justify-between">
        <GoTodashboardBtn/>
        <LogOutBtn/>
      </div>
        <div className="flex flex-col md:flex-row  mt-10 lg:gap-20">
          <div className="md:w-1/2 md:max-w-96 md:mr-12 mb-10 w-full">
            <PostDetails postId={postId} userId={session.userId}/>
          </div>
          <div className="w-full lg:w-1/2 p-5 " >
          <CommentForm postid={postId} authorid={session.userId}/>
          <CommentsWrapper postid={postId} authorid={session.userId}/>
          </div>
        </div>
      </CommentsProvider>
    </div>
  )
}

export default page
