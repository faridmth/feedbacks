import { auth } from "../../../auth"
import { IoIosArrowRoundUp } from "react-icons/io";
import PostForm from "../components/PostForm";
import { redirect } from "next/navigation";
import PostsWrapper from "../components/PostsWrapper";
import LogOutBtn from "../components/LogOutBtn";
const page = async() => {
  const session = await auth()
  if(!session){
    redirect("/signin")
  }
  console.log(session)
  return(
    <div className="lg:px-44 sm:px-10 mb-6 p-2">
        <div className="m-8 sm:mt-16 flex justify-between">
            <a href="#" className="bordr-2 border-[#f5f4f4] bg-white p-3 shadow-md rounded-lg flex w-fit items-end">
              ProductName
              <IoIosArrowRoundUp size={20} className="rotate-45"/>
            </a>
            <LogOutBtn/>
        </div>
        <div className="flex flex-col md:flex-row sm:justify-between mt-8 sm:mt-16 w-full ">
          <div className="md:w-[28rem]">
            <PostForm userid={session.userId}/>
          </div>
          <div className="flex flex-col items-center w-full md:w-3/4 gap-4 mt-5">
              <PostsWrapper userid={session.userId}/>
          </div>
        </div>
    </div>
  )

}
export default page
