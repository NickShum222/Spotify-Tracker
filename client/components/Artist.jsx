import React from "react";
import Image from "next/image";

const Artist = ({ index, img, name, url }) => {
  const num = index + 1;
  return (
    <div className="flex flex-col justify-center items-center w-full h-full py-5">
      <a href={url} className="flex flex-col justify-center items-center w-full" target="_blank" rel="noopener noreferrer" >
        <div className="aspect-square max-w-full">
          <img
            src={img}
            alt={name}
            className="object-cover rounded-full aspect-square"
          />
        </div>
        <div className="flex flex-row justify-center items-center mt-4 gap-2">
          <p className="text-semiwhite text-[17px]">{num}.</p>
          <p className="text-semiwhite text-[17px] ">{name}</p>
        </div>
      </a>
    </div>
  );
};


export default Artist;
