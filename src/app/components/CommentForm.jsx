'use client'
import Button from "@/app/components/Button";
import { useState,useEffect } from "react";
import { useComments } from "./commentsContext";
import toast from "react-hot-toast";

const CommentForm = ({postid,authorid}) => {
  const {triggerRefresh}=useComments()
    const [comment,setComment]=useState('')
    const handleClick = async () => {
      try {
        const response = await fetch("../api/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            content: comment,
            postid,
            authorid
          })
        });
    
        if (!response.ok) {
          throw new Error('Failed to post comment');
        }    
        setComment(''); 
        
        toast.success('Comment Posted!');
        triggerRefresh(); 
        
      } catch (err) {
        toast.error("Something went wrong. Try again.");
        console.log(err);
      }
    };
    
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
             <Button text="Add Comment" action={handleClick}/>
          </div>
      
    </div>
  )
}

export default CommentForm
