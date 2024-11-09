'use client'
import { GoComment } from "react-icons/go";
import Image from "next/image";
import UpvoteBtn from "./UpvoteBtn";
import { useRouter } from "next/navigation";
const Post = ({imageSrc,name,title,content,upvotesCount,commentsCount,postid,userid,upvotes}) => {
  const router = useRouter()

  return (
    <div
     className='w-full md:w-2/3 bg-white p-8 sm:p-18 rounded-2xl
      shadow-lg hover:shadow-xl cursor-pointer flex justify-center items-center'
      onClick={()=>router.push(`/post/${postid}`)}
      >

        <div className="w-full">
          <div className="flex gap-3 mb-4">
            <Image 
            src={imageSrc}
            width={25}
            height={25}
            alt={`${name} profile's picture`}
            className="rounded-full"
            />
            <p>{name}</p>

          </div>
            <h2 className='font-bold text-xl text-[#262946] '>{title}</h2>
              <p className='text-[#71665d] mt-4 w-full'>{content}</p>
              <a href="" className="flex items-end text-[#71665d] mt-3 text-sm">
                  <GoComment size={18} color="#71665d"/>
                  {commentsCount}
              </a>
        </div>
        <UpvoteBtn upvotesCount={upvotesCount} postid={postid} userid={userid} upvotes={upvotes}/>
     </div>
  )
}

export default Post
