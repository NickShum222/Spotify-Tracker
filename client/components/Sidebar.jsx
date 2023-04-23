import { useState } from "react"

const Sidebar = () => {
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Top Artists",
      path: "/top-artists",
    },
    {
      name: "Top Tracks",
      path: "/top-tracks",
    },

  ]
  const [active, setActive] = useState("/");
  return (
    <div className='bg-black h-[100vh] w-[15%] fixed flex flex-col justify-end items-center shadow-2xl'>
      
    </div>
  )
}

export default Sidebar