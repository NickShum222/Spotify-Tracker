import React from "react";
import Image from "next/image";

const Artist = ({ index, img, name, url }) => {
  const num = index + 1;
  return (
    <div className="w-[250px] flex flex-col justify-center items-center m-4">
      <a href={url} className="flex flex-col justify-center items-center w-full" target="_blank" rel="noopener noreferrer" >
      <img
        src={img}
        alt={name}
        className="rounded-full object-cover h-[200px] w-[200px] "
      />
      <div className="flex flex-row justify-center items-center mt-2 gap-2">
        <p className="text-semiwhite text-[16px]">{num}.</p>
        <p className="text-semiwhite text-[16px] ">{name}</p>
      </div>
      </a>
    </div>
  );
};

export default Artist;
