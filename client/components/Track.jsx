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
    <div className="w-full group flex flex-row justify-start items-center">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer w-full flex flex-row justify-start items-center md:px-6 px-2"
      >
        <div className="flex flex-row lg:w-[50%] w-[70%] sm:gap-4 gap-2 justify-start items-center">
          <div className="relative">
            <img
              src={img}
              alt="track"
              className={`max-h-[60px] max-w-[60px] aspect-square`}
            />
            {current && isPlaying && (
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

          <div className="flex flex-col h-[60px] lg:w-[500px] sm:w-[400px] w-[200px] justify-between truncate">
            <p
              className={`group-hover:text-spotify ${
                current ? "text-spotify" : "text-white"
              } sm:text-[16px] text-[15px] `}
            >
              {title}
            </p>
            <div className="w-full flex sm:flex-row flex-col justify-start items-start sm:gap-4 gap-0">
              <p
                className={`group-hover:text-spotify ${
                  current ? "text-spotify" : "text-semiwhite"
                } sm:text-[16px] text-[15px] `}
              >
                {artist}
              </p>
              <ul className="list-disc list-inside">
                <li
                  className={`group-hover:text-spotify lg:hidden sm:list-item hidden ${
                    current ? "text-spotify" : "text-semiwhite"
                  } sm:text-[16px] text-[15px]`}
                >
                  {album}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`w-[30%] group-hover:text-spotify  ${
            current ? "text-spotify" : "text-semiwhite"
          } sm:text-[16px] text-[15px] lg:inline hidden truncate`}
        >
          {album}
        </div>
        {recent && (
          <div
            className={`group-hover:text-spotify ${
              current ? "text-spotify" : "text-semiwhite"
            } lg:w-[20%] w-[30%]  sm:text-[16px] text-[15px]`}
          >
            {playedDateDisplay}
          </div>
        )}

        {!recent && (
          <div
            className={` group-hover:text-spotify text-end ${
              current ? "text-spotify" : "text-semiwhite"
            } lg:w-[20%] w-[30%]  sm:text-[16px] text-[15px]`}
          >
            {timeDisplay}
          </div>
        )}
      </a>
    </div>
  );
};

export default Track;
