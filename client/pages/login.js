import React from "react";
import Head from "next/head";
import SEO from "@/components/SEO";

const Login = () => {
  const SERVER_URL = process.env.SERVER_URL;
  return (
    <>
      <SEO />
      <div className="h-[100vh] pt-36 pb-8 w-[100vw] flex-col flex justify-between  items-center bg-black">
        <div className="flex flex-col w-full justify-center  lg:gap-[20px] md:gap-[16px] gap-[14px] items-center">
          <div className="text-white lg:text-[80px] md:text-[64px] sm:text-[54px] text-[42px]  font-semibold">
            Spoti<span className="text-spotify italic">Track</span>
          </div>
          <a href={`/api/login`} className="w-full flex justify-center items-center">
          <button className="bg-spotify text-white uppercase font-semibold lg:text-[24px] md:text-[22px] sm:text-[20px] text-[18px] md:py-3 py-2 lg:px-[70px] md:px-[54px] sm:px-[50px] px-[42px] rounded-full transform  duration-300 ease-in-out hover:bg-transparent border-[2px] border-spotify hover:text-spotify">
            Login to spotify
          </button>
          </a>

        </div>

        <div className="text-[#BFBFBF] font-mono flex flex-col justify-center items-center">
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
    </>
  );
};

export default Login;
