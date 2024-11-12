"use client"
import { useRouter } from "next/navigation";
const DeletePostBtn = ({postId}) => {
    const router = useRouter()
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
  return (
    <button className="text-gray-500 underline ml-5" onClick={()=> handleDelete()}>Delete</button>
)
}

export default DeletePostBtn
