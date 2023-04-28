import React from "react";
import { Audio } from "react-loader-spinner";

const Track = ({
  img,
  title,
  artist,
  album,
  time,
  url,
  index,
  current,
  recent,
  playedAt,
  isPlaying,
}) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const timeDisplay = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  const playedDate = new Date(playedAt);
  const dateOptions = { year: "numeric", month: "short", day: "numeric" };
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const playedDateDisplay = `${playedDate.toLocaleDateString(
    undefined,
    dateOptions
  )}, ${playedDate.toLocaleTimeString(undefined, timeOptions)}`;
  return (
    <div className="w-full flex flex-row justify-start items-center">
           <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer w-full flex flex-row justify-start items-center md:px-6 px-2"
        >
      <div className="flex flex-row lg:w-[50%] sm:w-[80%] w-[70%] sm:gap-4 gap-2 justify-start items-center">
  
          <div className="relative">
            <img src={img} alt="track" className={`md:h-[60px] md:w-[60px] h-[55px] w-[55px]`} />
            {current && isPlaying &&(
              <div className="absolute top-0 left-0 w-full  bg-black bg-opacity-60 h-full flex justify-center items-center z-10">
                <Audio
                  color="#1DB954"
                  height={40}
                  width={40}
                  className="z-20"
                />
              </div>
            )}
          </div>
        
        <div className="flex flex-col h-[60px] justify-between">
          <p
            className={`${current ? "text-spotify" : "text-white"} md:text-[16px] sm:text-[14px] text-[13px]`}
          >
            {title}
          </p>
          <div className="w-full flex sm:flex-row flex-col justify-start items-start sm:gap-4 gap-0">
          <p
            className={`${
              current ? "text-spotify" : "text-semiwhite"
            } md:text-[16px] sm:text-[14px] text-[13px]`}
          >
            {artist}
          </p>
          <ul className="list-disc list-inside">
          <li  className={`lg:hidden sm:list-item hidden ${
              current ? "text-spotify" : "text-semiwhite"
            } md:text-[16px] sm:text-[14px] text-[13px]`}>
          {album}
          </li>
          </ul>

          </div>

        </div>
      </div>
      <div
        className={`w-[30%]  ${
          current ? "text-spotify" : "text-semiwhite"
        } md:text-[16px] sm:text-[14px] text-[13px] lg:inline hidden `}
      >
        {album}
      </div>
      { recent && (
      <div
      className={`${
        current ? "text-spotify" : "text-semiwhite"
      } sm:w-[20%] w-[30%] md:text-[16px] sm:text-[14px] text-[13px]`}
    >
      {playedDateDisplay}
    </div>
      )}

{ !recent && (
      <div
      className={` text-end ${
        current ? "text-spotify" : "text-semiwhite"
      } sm:w-[20%] w-[30%] md:text-[16px] sm:text-[14px] text-[13px]`}
    >
      {timeDisplay}
    </div>
      )}
      </a>
    </div>
  );
};

export default Track;
