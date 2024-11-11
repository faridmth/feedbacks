'use client'
import { useState,useEffect } from "react"
import { useComments } from "./commentsContext"
import Comment from "./Comment"
const CommentsWrapper = ({postid,authorid}) => {
    const {refreshComments} = useComments()
    const [comments,setComments]=useState([])
    useEffect(()=>{
        const getComments = async () =>{
            try {
                let fetchComments = await fetch(`/api/p/${postid}`)
                fetchComments = await fetchComments.json()
                const comments = fetchComments.post.comments
                console.log(comments)
                setComments(comments)

            } catch (err) {
                console.log(err)
            }
        }
        getComments()
    },[refreshComments])

  return (
    <div className="py-8 flex flex-col gap-5 sm:gap-10 items-start">
      {
        comments.map((comment)=>{
            return <Comment details={comment} key={comment.id} authorid={authorid}/>
        })
      }
    </div>
  )
}

export default CommentsWrapper
