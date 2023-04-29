import React from 'react'

const Footer = () => {
  return (
    <div className="text-[#BFBFBF] bg-[#121212] font-mono flex flex-col justify-center items-center w-full xl:pl-[370px] xl:pr-[120px] lg:pl-[320px] lg:pr-[100px] md:pl-[200px] md:pr-[80px] pl-5 pr-5 py-5">
      <div className='flex w-full flex-col border-t-[1px] border-[#9c9c9c] justify-center items-center pt-4'>
      <a
          href="https://github.com/NickShum222/Spotify-Tracker"
          target="_blank"
          rel="noreferrer"
          className="font-mono  transition-all duration-150 hover:text-spotify text-[12px] sm:text-[14px]"
        >
          Designed & Built by Nick Shum
        </a>
        <p className="font-mono text-[12px] sm:text-[14px] transition-all">
          © Copyright 2023.
        </p>
      </div>
  
      </div>
  )
}

export default Footer