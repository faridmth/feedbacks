import Image from "next/image"
import { formatDate } from "../functions/formateDate"
import UpvoteBtn from "./UpvoteBtn"
import DeletePostBtn from "./DeletePostBtn"
const PostDetails = async({postId,userId}) => {
       let post =null
       try{
        post = await fetch(`https://feedbacks-five.vercel.app/api/p/${postId}`,{cache: 'force-cache' })
        post = await post.json()
        post=post.post
        console.log(post)
       }catch(err){
        console.log(err)
       }

    if(post===null) return <h2 className="mt-12">Loading Post...</h2>
  return (
    <div className="flex w-full">
      <div className=" sm:mr-5 mr-2">
        <UpvoteBtn userid={userId} postid={postId} upvotes={post.upvotes} upvotesCount={post['_count'].upvotes}/>
      </div>
      <div>
        <h1 className="mb-4 text-xl font-bold">{post.title}</h1>
        <p className="sm:text-base text-[4vw] mb-2 ">{post.content}</p>
        <div className="flex sm:items-center lg:flex-row gap-4 flex-col ">
        <div className="flex gap-3 justify-start  ">
              <Image 
              src={post.author.image}
              width={25}
              height={25}
              alt={`${post.author.name} profile's picture`}
              className="rounded-full w-[25px] h-[25px]"
              />
              <p>{post.author.name}</p>

            </div>
            <div className="flex">
            <p className="text-sm text-gray-700">{formatDate(post.createdAt)}</p>
            {
              post.authorid===userId&&
              <DeletePostBtn postId={postId}/>  
            }

            </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
