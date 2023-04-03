import React from 'react'

export const Login = () => {
  return (
    <div className="h-full pt-64 pb-8 flex-col flex justify-between gap-[20px] items-center bg-black">
      <div className="flex flex-col justify-start gap-[20px] items-center">
        <div className="text-white text-[80px] font-semibold">
          Spot my <span className="text-[#1bb954]">Stats</span>
        </div>
        <button className="bg-[#1bb954] text-white uppercase font-semibold text-[24px] py-3 px-[70px] rounded-full">
          <a href="http://localhost:8888/login">Login to spotify</a>
        </button>
      </div>

      <div className="text-[#BFBFBF] font-mono flex flex-col justify-center items-center">
        {" "}
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="font-mono  transition-all duration-150 text-[12px] sm:text-[14px]"
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
