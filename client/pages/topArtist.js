import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getTopArtists } from "@/components/SpotifyAuth";
import SEO from "@/components/SEO";
import Artist from "@/components/Artist";

const TopArtists = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const catchErrors = (fn) => {
    return function (...args) {
      return fn(...args).catch((err) => {
        router.push("/login");
        console.error(err);
      });
    };
  };

  const [topArtists, setTopArtists] = useState(null);
  const [range, setRange] = useState("short_term");

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
      const getTopArtist = await getTopArtists(token, range);
      setTopArtists(getTopArtist.data);
      console.log(getTopArtist);
    };
    const timeoutId = setTimeout(() => {
      catchErrors(fetchData)();
    }, 10);
    return () => clearTimeout(timeoutId);
  }, [token, range]);

  return (
    <>
      <SEO />
      <section
        className={` xl:pl-[370px] xl:pr-[120px] lg:pl-[320px] lg:pr-[100px] md:pl-[200px] md:pr-[80px] pl-5 pr-5 md:py-24 py-12 z-[5] pt-[90px] flex flex-col justify-start items-start min-h-[100vh] bg-[#121212]`}
      >
        <h1 className="text-white font-semibold text-[28px] pb-4">
          Top Artists
        </h1>
        <div className=" flex-row w-full gap-4 mb-6 md:flex hidden">
          <button
            className={` text-[18px] border-spotify hover:text-spotify cursor-pointer transform duration-150 ${
              range === "short_term"
                ? "border-b-[2px] text-spotify"
                : "text-white"
            } `}
            onClick={() => setRange("short_term")}
          >
            Last Month
          </button>
          <button
            className={` text-[18px] border-spotify hover:text-spotify cursor-pointer transform duration-150 ${
              range === "medium_term"
                ? "border-b-[2px] text-spotify"
                : "text-white"
            } `}
            onClick={() => setRange("medium_term")}
          >
            Last 6 Months
          </button>
          <button
            className={` text-[18px] border-spotify hover:text-spotify cursor-pointer transform duration-150 ${
              range === "long_term"
                ? "border-b-[2px] text-spotify"
                : "text-white"
            } `}
            onClick={() => setRange("long_term")}
          >
            All Time
          </button>
        </div>
        {/* index, img, name, url */}
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 w-full lg:gap-10 md:gap-8 gap-10">
          {topArtists &&
            topArtists.items.map((artist, index) => (
              <Artist
                key={artist.id}
                index={index}
                name={artist.name}
                img={artist.images[0].url}
                url={artist.external_urls.spotify}
              />
            ))}
        </div>
      </section>
      <div className="h-[70px] w-full bg-black bottom-0 fixed md:hidden inline">
        <div className="w-full h-full flex flex-row justify-around items-center ">
          <button
            className={` text-[16px] font-semibold h-full border-spotify hover:text-spotify cursor-pointer transform duration-150 ${
              range === "short_term"
                ? "border-t-[3px] text-spotify"
                : "text-white"
            } `}
            onClick={() => setRange("short_term")}
          >
            Last Month
          </button>
          <button
            className={` text-[16px] h-full font-semibold  border-spotify hover:text-spotify cursor-pointer transform duration-150 ${
              range === "medium_term"
                ? "border-t-[3px] text-spotify"
                : "text-white"
            } `}
            onClick={() => setRange("medium_term")}
          >
            Last 6 Months
          </button>
          <button
            className={` text-[16px] h-full font-semibold border-spotify hover:text-spotify cursor-pointer transform duration-150 ${
              range === "long_term"
                ? "border-t-[3px] text-spotify"
                : "text-white"
            } `}
            onClick={() => setRange("long_term")}
          >
            All Time
          </button>
        </div>
      </div>
    </>
  );
};

export default TopArtists;
