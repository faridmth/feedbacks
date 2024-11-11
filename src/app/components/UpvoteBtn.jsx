"use client"
import { MdKeyboardArrowUp } from "react-icons/md";

import { useState,useEffect } from "react";
const UpvoteBtn = ({upvotesCount,postid,userid,upvotes}) => {
    const [uppvotesNum,setUppvotedNum]=useState(upvotesCount)
    const [uppvoted,setUppvoted]=useState(false)
    useEffect(()=>{
        const isUpVoted = upvotes.filter(e=>e.userid===userid)
        if(isUpVoted.length>0){
          setUppvoted(true)
        }
      },[])
    const handleUppvote = async(e)=>{
      e.stopPropagation();
        setUppvoted(pre=>!pre)
        if(uppvoted){
          setUppvotedNum(pre=>pre-1)
          try{
            const uppvote = await fetch("/api/upvote",{
              method:"DELETE",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                userid,
                postid
    
              })
            })
          }catch(err){
            console.error(err)
            setUppvotedNum(pre=>pre+1)
            setUppvoted(pre=>!pre)

          }
        }else{
          setUppvotedNum(pre=>pre+1)
          try{
            const uppvote = await fetch("/api/upvote",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                userid,
                postid
    
              })
            })
          }catch(err){
            console.error(err)
            setUppvotedNum(pre=>pre-1)
            setUppvoted(pre=>!pre)

          }
        }
      }
  return (
    <div className={`group flex flex-col items-center justify-center cursor-pointer
        border-1 ml-4 border-border-[#f3f3f3] rounded-2xl px-4 py-2 transition-all duration-200 ease-in-out
        ${uppvoted?"bg-[#e16540]":""}`}
       onClick={handleUppvote}
        >
           <MdKeyboardArrowUp size={22} color={uppvoted?"#ffffff":"#312643"}
            className="group-hover:-translate-y-[3px] transition-transform duration-200"/>
           <span className={uppvoted?"text-white":'text-[#312643]'}>{uppvotesNum}</span>
       </div>


  )
}

export default UpvoteBtn
