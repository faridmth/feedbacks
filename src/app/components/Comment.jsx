import { formatDate } from "../functions/formateDate"
import toast from "react-hot-toast"
import Image from "next/image"
import { useComments } from "./commentsContext"
const Comment = ({details,authorid}) => {
    const {triggerRefresh} = useComments()
    const handleDelete = async ()=>{
        try{
            const deleteComment = await fetch(`/api/c/${details.id}`,{
                method:"DELETE",
                headers:{
                    "Conetnt-Type":"application/json"
                }
            })
            if(deleteComment.ok){
                toast.success('comment deleted')
                triggerRefresh()
            }else{
                toast.error('something went wrong. Try again')
            }

        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className="flex gap-2 w-full">
        <div className="w-fit pt-1">
            <Image 
                src={details.author.image}
                width={25}
                height={25}
                alt={`${details.author.name} profile's picture`}
                className="rounded-full"
              />
        </div>
        <div  className="bg-white w-full p-3 pt-0 rounded-md shadow-sm flex justify-between">
            <div>
                <p className="text-[rgb(36,36,36)] mb-1">{details.author.name}</p>
                <p>
                    {details.content}
                </p>
            </div>
            <div className="flex flex-col justify-between ">
                {
                    authorid===details.author.id?
                    <button className="text-gray-700 text-[10px] underline" onClick={()=>handleDelete()}>delete</button>
                    :<p></p>
                }
               <div>
                    <p className="text-gray-700 text-[10px]">{formatDate(details.updatedAt)}</p>
               </div>

            </div>
        </div>
       

    </div>
  )
}

export default Comment
