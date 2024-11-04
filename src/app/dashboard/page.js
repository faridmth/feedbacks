import { auth } from "../../../auth"
import { IoIosArrowRoundUp } from "react-icons/io";
import PostForm from "../components/PostForm";
import { redirect } from "next/navigation";
import PostsWrapper from "../components/PostsWrapper";
const page = async() => {
  const session = await auth()
  if(!session){
    redirect("/signin")
  }
  return(
    <div className="lg:px-44 sm:px-10 ">
        <div className="mt-16">
            <a href="#" className="bordr-2 border-[#f5f4f4] bg-white p-3 shadow-md rounded-lg flex w-fit items-end">
              ProductName
              <IoIosArrowRoundUp size={20} className="rotate-45"/>
            </a>
        </div>
        <div className="flex flex-col md:flex-row sm:justify-between mt-16 w-full ">
          <div className="md:w-[28rem]">
            <PostForm userid={session.userId}/>
          </div>
          <div className="flex flex-col items-center w-full md:w-3/4 gap-4">
              <PostsWrapper userid={session.userId}/>
          </div>
        </div>
    </div>
  )

}
export default page
