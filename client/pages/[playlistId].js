import React from "react";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";

const Playlist = () => {
  const router = useRouter();
  const { playlistId } = router.query;

  return (
    <>
      <SEO />
      <div
        className={`xl:pl-[370px] xl:pr-[120px] lg:pl-[350px] lg:pr-[100px] md:pl-36 md:pr-[80px] pl-6 pr-6 py-24 z-[5] flex flex-col justify-start items-start min-h-[100vh]`}
      >
        {playlistId}
      </div>
      ;
    </>
  );
};

export default Playlist;
