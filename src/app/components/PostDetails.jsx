"use client"
import { useState,useEffect } from "react"
import Image from "next/image"
import { formatDate } from "../functions/formateDate"
import UpvoteBtn from "./UpvoteBtn"
import { useRouter } from "next/navigation"
const PostDetails = ({postId,userId}) => {
    const router = useRouter()
    const [post,setPost]=useState(null)
    console.log(post)
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                let post = await fetch(`/api/p/${postId}`)
                post = await post.json()
                console.log(post.post)
                setPost(post.post)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    },[])
    const handleDelete = async ()=>{
      try {
        const response = await fetch(`/api/p/${postId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        router.push('/dashboard')
      } catch (err) {
        console.log(err)
      }
    }
    if(post===null) return <h2 className="mt-12">Loading Post...</h2>
  return (
    <div className="flex">
      <div className=" mr-5">
        <UpvoteBtn userid={userId} postid={postId} upvotes={post.upvotes} upvotesCount={post['_count'].upvotes}/>
      </div>
      <div>
        <h1 className="text-3xl mb-4">{post.title}</h1>
        <p className="text-lg  mb-2">{post.content}</p>
        <div className="flex items-center gap-4 ">
        <div className="flex gap-3 justify-start">
              <Image 
              src={post.author.image}
              width={25}
              height={25}
              alt={`${post.author.name} profile's picture`}
              className="rounded-full"
              />
              <p>{post.author.name}</p>

            </div>
            <p className="text-sm text-gray-700">{formatDate(post.createdAt)}</p>
            {
              post.authorid===userId&&  
              <button className="text-gray-500 underline ml-5" onClick={()=> handleDelete()}>Delete</button>

            }
        </div>
      </div>
    </div>
  )
}

export default PostDetails
