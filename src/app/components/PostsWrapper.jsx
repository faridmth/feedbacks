"use client"
import Post from "./Post"
import { useEffect,useState } from "react"

const PostsWrapper = ({userid}) => {
    const [loading,setLoading]=useState(false)
    const [posts,setPosts]=useState([]) 
    useEffect(()=>{
        setLoading(true)
        const getPosts = async ()=>{
            try{
                let posts = await fetch('./api/post')
            posts = await posts.json()
            setPosts(posts)
            setLoading(false)
            }catch(err){
                setLoading(false)
                console.error(err)
            }
        }
        getPosts()
    },[])
    //imageSrc,name,title,content,upvotesCount,commentsCount
    console.log(posts)
    if(loading) {return <h1>Loading...</h1>}
    if(posts.length<1) {return <h1>There is no posts yet</h1>}
  return (
    <>
        {
            posts.map(post=>{
                console.log(post.author.image)
                return <Post 
                key={post.id}
                postid={post.id}
                userid={userid}
                upvotes={post.upvotes}
                imageSrc={post.author.image}
                name={post.author.name}
                title={post.title}
                content={post.content}
                upvotesCount={post['_count'].upvotes}
                commentsCount={post['_count'].comments}
                />
            })
        }
    </>
  )
}

export default PostsWrapper
