'use client'
import { useState } from "react";
import Button from "./Button"
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
const PostForm = ({userid}) => {
    const router= useRouter()
    const [content,setContent]=useState('')
    const [title,setTitle]=useState('')
    const [loading,setLoading]=useState(false)
    const submitHandler = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            let post = await fetch('./api/post',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    content,
                    userid,
                    title
                    })
            })
            post = await post.json()
            console.log(post.ok)

            setTitle('')
            setContent('')
            setLoading(false)
            router.push(`/post/${post.postid}`)



        }catch(err){
            setLoading(false)
            console.error(err)
            toast.error("Submission failed. Please try again")

        }
    }
  return (
    <form onSubmit={submitHandler} className="flex flex-col bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl  w-full">
    <h3 className="text-xl font-bold mb-6">Suggest a feature</h3>

    <p className="mb-2 text-gray-700">Title</p>
    <input type="text"
     placeholder="Feature Title (e.g., 'Add Dark Mode')" 
     className="border-2 border-border-[#f5f4f4] outline-none 
      resize-none w-full  focus:border-[#e16540] mb-4
      min-h-12 p-2" 
      name="title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}

     />
     <p className="mb-2 text-gray-700">Description</p>
    <textarea 
      className="border-2 border-border-[#f5f4f4] outline-none 
      resize-none w-full  focus:border-[#e16540] mb-4
      min-h-36 p-2" 
      name="content"
      id="" 
      placeholder="Got an idea to make our app even better? Share your thoughts here!"
      value={content}
      onChange={(e)=>setContent(e.target.value)}

     ></textarea>
    <Button text={loading?"Posting..":"Suggest feature"} type="submit" disabeld={loading}/>

  </form>

  )
}

export default PostForm
