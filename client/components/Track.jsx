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
    <div className="w-full flex flex-row justify-start items-center px-6">
      <div className="flex flex-row w-[50%] gap-4 justify-start items-center">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer"
        >
          <div className="relative">
            <img src={img} alt="track" className={`h-[60px] w-[60px]`} />
            {current && (
              <div className="absolute top-0 left-0 w-full  bg-black opacity-70 h-full flex justify-center items-center z-10">
                <Audio
                  color="#1DB954"
                  height={40}
                  width={60}
                  className="z-20"
                />
              </div>
            )}
          </div>
        </a>
        <div className="flex flex-col h-[60px] justify-between">
          <p
            className={`${current ? "text-spotify" : "text-white"} text-[16px]`}
          >
            {title}
          </p>
          <p
            className={`${
              current ? "text-spotify" : "text-semiwhite"
            } text-[16px]`}
          >
            {artist}
          </p>
        </div>
      </div>
      <div
        className={`w-[30%] ${
          current ? "text-spotify" : "text-semiwhite"
        } text-[16px] `}
      >
        {album}
      </div>
      <div
        className={`${
          current ? "text-spotify" : "text-semiwhite"
        } w-[20%]  text-[16px]`}
      >
        {recent ? playedDateDisplay : timeDisplay}
      </div>
    </div>
  );
};

export default Track;
