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
    <div className='bg-black h-[100vh] w-[20%]'>
      
    </div>
  )
}

export default Sidebar