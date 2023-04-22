import React from "react";

const Track = ({ img, title, artist, album, time, url, index }) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const timeDisplay = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  return (
    <div className="w-full flex flex-row justify-start items-center">
      <div className="flex flex-row w-[40%] gap-4 justify-start items-center">
        <a href={url} className="cursor-pointer">
          <img src={img} alt="track" className="h-[60px] w-[60px]" />
        </a>
        <div className="flex flex-col justify-between">
        <p className="text-white">{title}</p>
        <p className="text-[#BFBFBF]">{artist}</p>
      </div>
      </div>
      <div className="w-[40%] text-[#BFBFBF]">{album}</div>
      <div className="text-[#BFBFBF] w-[20%] text-end">{timeDisplay}</div>
    </div>
  );
};

export default Track;
