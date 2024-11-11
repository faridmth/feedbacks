import { signOut } from "../../../auth"
import { redirect } from "next/navigation"

const LogOutBtn = () => {
  return (
    <form action={async()=>{
         "use server"
         signOut()
         redirect('/')
     }}>
        <button type="submit" className="underline">LogOut</button>
    </form>
  )
}

export default LogOutBtn
