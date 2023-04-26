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
        className={`xl:pl-[370px] xl:pr-[120px] lg:pl-[350px] lg:pr-[100px] md:pl-36 md:pr-[80px] pl-6 pr-6 py-24 z-[5] flex flex-col justify-start items-start min-h-[100vh] bg-[#121212]`}
      >
        {playlistItems && (
          <>
            <div className="flex flex-row justify-start items-end w-full">
              <img
                src={playlistItems.images[0].url}
                alt={playlistItems.name}
                className={`h-[225px] w-[225px]`}
              />
              <div className="w-full flex flex-col justify-start items-start">
              <h1 className="text-white font-semibold text-[36px] pb-4 w-full">
                {playlistItems.name}
              </h1>
              <p className="text-white">{playlistItems.owner.display_name}</p>
              </div>

            </div>
            <div></div>
          </>
        )}
      </section>
      ;
    </>
  );
};

export default Playlist;
