import React from "react";
import { useRouter } from "next/router";
import { getPlaylistItems } from "@/components/SpotifyAuth";
import { useEffect, useState } from "react";
import SEO from "@/components/SEO";
import Track from "@/components/Track";

const Playlist = () => {
  const router = useRouter();
  const { playlistId } = router.query;
  const [token, setToken] = useState("");
  const catchErrors = (fn) => {
    return function (...args) {
      return fn(...args).catch((err) => {
        router.push("/login");
        console.error(err);
      });
    };
  };
  const [playlistItems, setPlaylistItems] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const getPlaylist = await getPlaylistItems(token, playlistId);
      setPlaylistItems(getPlaylist.data);
      console.log(getPlaylist);
    };
    const timeoutId = setTimeout(() => {
      catchErrors(fetchData)();
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [token, playlistId]);

  return (
    <>
      <SEO />
      <section
        className={`overflow-hidden xl:pl-[370px] xl:pr-[120px] bg-[#121212] lg:pl-[320px] lg:pr-[100px] md:pl-[200px] md:pr-[80px] pl-5 pr-5 md:py-24 py-12 z-[5] pt-[90px] flex flex-col justify-start items-start min-h-[100vh]`}
      >
        <div className="flex flex-col w-full justify-start items-center">
          {playlistItems && (
            <>
              <div className="flex md:flex-row flex-col md:justify-start md:items-end justify-center items-center w-full gap-8 mb-14">
                <a   href={playlistItems.external_urls.spotify}
                      rel="noopener noreferrer"
                      target="_blank" className="lg:h-[250px] lg:w-[250px] w-[225px] h-[225px] aspect-square cursor-pointer" >
                <img
                  src={playlistItems.images[0].url}
                  alt={playlistItems.name}
                  className={` w-full h-full  rounded-md`}
                />
                </a>
             
                <div className="w-full flex flex-col justify-start items-start">
                  <h1 className="hover:text-spotify text-white font-bold lg:text-[64px] md:text-[54px] text-[48px] mb-2 w-full md:truncate">
                    <a
                      href={playlistItems.external_urls.spotify}
                      rel="noopener noreferrer"
                      target="_blank"
                      
                    >
                      {playlistItems.name}
                    </a>
                  </h1>
                  {playlistItems.description && (
                    <p className="text-[#BFBFBF] lg:text-[18px] text-[15px] mb-2">
                      {playlistItems.description}
                    </p>
                  )}
                  <div className="flex flex-row lg:text-[18px] text-[15px] justify-start w-full items-center">
                    <p className="text-white font-semibold hover:text-spotify">
                      <a href={playlistItems.owner.external_urls.spotify} rel="noopener noreferrer"
                      target="_blank">
                      {playlistItems.owner.display_name}
                      </a>
                      
                    </p>
                    <p className="text-semiwhite ml-1">
                      • {playlistItems.tracks.items.length} tracks
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-start items-center w-full">
                <div className="border-b-[1px] w-full flex flex-row justify-around items-center border-semiwhite  pb-2 md:mb-5 mb-3  md:pr-6 pr-2 md:pl-[38px] pl-[22px]">
                  <p className="text-semiwhite lg:w-[50%] sm:w-[80%] w-[70%] lg:text-[17px] text-[14px] md:text-[16px] ">
                    Track
                  </p>
                  <p className="text-semiwhite w-[30%] lg:text-[17px] text-[14px] md:text-[16px] lg:inline hidden">
                    Album
                  </p>
                  <p className="text-semiwhite sm:w-[20%] w-[30%] lg:text-[17px] text-[14px] md:text-[16px] text-end">
                    Duration
                  </p>
                </div>
                <div className="flex flex-col w-full gap-3 justify-center items-center">
                  {playlistItems.tracks.items.map((track, index) => (
                    <div className="flex flex-row justify-start items-center w-full">
                      <p className="text-white w-[10px] mr-1 md:text-[16px] sm:text-[14px] text-[13px]">
                        {index + 1}.
                      </p>
                      <Track
                        key={index}
                        img={track.track.album.images[0].url}
                        title={track.track.name}
                        artist={track.track.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                        album={track.track.album.name}
                        time={track.track.duration_ms}
                        url={track.track.external_urls.spotify}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      {/* <section
        className={`xl:pl-[370px] xl:pr-[120px] lg:pl-[320px] lg:pr-[100px] md:pl-[200px] md:pr-[80px] pl-5 pr-5 md:py-24  z-[90] pt-[90px] flex flex-col justify-start items-start bg-[#121212]`}
      >
          <div className="flex flex-col w-full justify-start items-center">
          {playlistItems && (
            <>
          <div className="flex flex-row justify-start items-end w-full gap-8 mb-14">
              <img
                src={playlistItems.images[0].url}
                alt={playlistItems.name}
                className={`h-[250px] w-[250px] rounded-md`}
              />
              <div className="w-full flex flex-col justify-start items-start">
                <h1 className="text-white font-bold text-[64px] mb-2 w-full">
                  {playlistItems.name}
                </h1>
                {playlistItems.description && (
                  <p className="text-[#BFBFBF] mb-2">
                    {playlistItems.description}
                  </p>
                )}
                <div className="flex flex-row justify-start w-full items-center">
                  <p className="text-white font-semibold">
                    {playlistItems.owner.display_name}
                  </p>
                  <p className="text-semiwhite ml-1">
                    • {playlistItems.tracks.items.length} tracks
                  </p>
                </div>
              </div>
            </div>
          
            <div className="flex flex-col justify-start items-center w-full">
              <div className="border-b-[1px] w-full flex flex-row justify-around items-center border-semiwhite  pb-2 md:mb-5 mb-3  md:pr-6 pr-2 md:pl-[38px] pl-[22px]">
                <p className="text-semiwhite lg:w-[50%] sm:w-[80%] w-[70%] lg:text-[17px] text-[14px] md:text-[16px] ">
                  Track
                </p>
                <p className="text-semiwhite w-[30%] lg:text-[17px] text-[14px] md:text-[16px] lg:inline hidden">
                  Album
                </p>
                <p className="text-semiwhite sm:w-[20%] w-[30%] lg:text-[17px] text-[14px] md:text-[16px] text-end">
                  Duration
                </p>
              </div>
              <div className="flex flex-col w-full gap-3 justify-center items-center">
                {playlistItems.tracks.items.map((track, index) => (
                  <div className="flex flex-row justify-start items-center w-full">
                    <p className="text-white w-[10px] mr-1 md:text-[16px] sm:text-[14px] text-[13px]">{index + 1}.</p>
                    <Track
                      key={index}
                      img={track.track.album.images[0].url}
                      title={track.track.name}
                      artist={track.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                      album={track.track.album.name}
                      time={track.track.duration_ms}
                      url={track.track.external_urls.spotify}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
            </>
          )}
          </div>
          
          
 
        
      </section> */}
    </>
  );
};

export default Playlist;
