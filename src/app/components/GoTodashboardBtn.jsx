'use client'
import { useRouter } from "next/navigation"
import { RiArrowGoBackLine } from "react-icons/ri";

const GoTodashboardBtn = () => {
    const router = useRouter()
  return (
    <a href="#" onClick={()=>router.push('/dashboard')}
    className="bordr-2 border-[#f5f4f4] bg-white p-3 shadow-md rounded-lg flex w-fit items-baseline gap-2">
        <RiArrowGoBackLine size={12}/>
        All Posts
    </a>

  )
}

export default GoTodashboardBtn
