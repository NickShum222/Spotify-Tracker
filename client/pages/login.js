import React from "react";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Spot my Stats</title>
        <meta name="description" content="Spotify Stat Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-[100vh] pt-64 pb-8 flex-col flex justify-between gap-[20px] items-center bg-black">
        <div className="flex flex-col justify-start gap-[20px] items-center">
          <div className="text-white text-[80px] font-semibold">
            Spot my <span className="text-spotify">Stats</span>
          </div>
          <button className="bg-spotify text-white uppercase font-semibold text-[24px] py-3 px-[70px] rounded-full transform  duration-300 ease-in-out hover:bg-transparent border-[2px] border-spotify hover:text-spotify">
            <a href="http://localhost:8888/login">Login to spotify</a>
          </button>
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
