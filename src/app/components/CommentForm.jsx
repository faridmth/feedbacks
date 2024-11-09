'use client'
import Button from "@/app/components/Button";
import { useState,useEffect } from "react";

const CommentForm = ({postid,authorid}) => {
    const [comment,setComment]=useState('')
    const handleClick = async ()=>{
      try {
        fetch("../api/comment",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          content:comment,
          postid,
          authorid
        })
    
        })
    
      } catch (err) {
        console.error(err)
      }
    }
  return (
    <div className="w-full  flex flex-col items-center">
         <textarea
            name=""
            id=""
            className="border-2 border-border-[#f5f4f4]  outline-none 
            resize-none w-full   focus:border-[#e16540] mb-4
            h-12 p-2"
            placeholder="leave a comment..."
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
      
            ></textarea>
          <div className='w-full'>
             <Button text="coomment" action={handleClick}/>
          </div>
      
    </div>
  )
}

export default CommentForm
