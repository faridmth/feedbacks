'use client'
const Button = ({text,action,disabeld}) => {
  return (
    <>
        <button 
          className='border-2 rounded-md bg-[#e16540] text-white px-4 py-2 w-full'
          onClick={()=>action?action():""}
          disabled={disabeld}
        >{text}</button>
    </>
  )
}

export default Button
