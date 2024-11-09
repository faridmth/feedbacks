import GoTodashboardBtn from "@/app/components/GoTodashboardBtn";
import CommentForm from "@/app/components/CommentForm";
import { auth } from "../../../../auth";
import UpvoteBtn from "@/app/components/UpvoteBtn";
const page = async({params}) => {
  const {postId} =await params
  const session = await auth()  
  return (
    <div className="lg:px-44 sm:px-10" >
      <GoTodashboardBtn/>
      <div className="flex">
        <div className="w-1/2">
        </div>
        <div className="w-full md:w-2/5" >
         <CommentForm postid={postId} authorid={session.userId}/>
        </div>
      </div>
    </div>
  )
}

export default page
