'use client'
import Button from "./components/Button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-center text-xl sm:text-3xl">Your feedback makes the <br /> difference.</h1>
        <Button text="Leave us a feedback" action={()=>router.push('/signin')}/>
      </div>
    </div>
  );
}
