import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import { getTopTracks } from "@/components/SpotifyAuth";
import Track from "@/components/Track";

const TopTrack = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [topTracks, setTopTracks] = useState(null);
  const [range, setRange] = useState("short_term");
  const catchErrors = (fn) => {
    return function (...args) {
      return fn(...args).catch((err) => {
        router.push("/login");
        console.error(err);
      });
    };
  };

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
      const getTopTrack = await getTopTracks(token, range);
      setTopTracks(getTopTrack.data);
      console.log(getTopTrack);
    };
    const timeoutId = setTimeout(() => {
      catchErrors(fetchData)();
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [token, range]);

  return (
    <>
      <SEO />
      <section
        className={`xl:pl-[370px] xl:pr-[120px] bg-[#121212] lg:pl-[320px] lg:pr-[100px] md:pl-[200px] md:pr-[80px] pl-5 pr-5 md:py-24 py-12 z-[5] pt-[90px] flex flex-col justify-start items-start min-h-[100vh]`}
      >
        <h1 className="text-white font-semibold text-[28px] pb-4">
          Top Tracks
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
        <div className="border-b-[1px] w-full flex flex-row justify-around items-center border-semiwhite  pb-2 md:mb-5 mb-3  md:pr-6 pr-2 md:pl-[44px] pl-[26px]">
          <p className="text-semiwhite lg:w-[50%] sm:w-[80%] w-[70%] lg:text-[17px] text-[16px] ">Track</p>
          <p className="text-semiwhite w-[30%] lg:text-[17px] text-[16px] lg:inline hidden">Album</p>
          <p className="text-semiwhite sm:w-[20%] w-[30%] lg:text-[17px] text-[16px] text-end">Duration</p>
        </div>
        {topTracks && topTracks.items && (
          <div className="w-full flex flex-col gap-3 justify-start items-start">
            {topTracks.items.map((track, index) => (
              <div className="flex flex-row justify-start items-center w-full">
                <p className="text-semiwhite w-[10px] mr-2 md:text-[16px] sm:text-[14px] text-[13px]">{index + 1}.</p>
                <Track
                  key={index}
                  img={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                  album={track.album.name}
                  time={track.duration_ms}
                  url={track.external_urls.spotify}
                  current={false}
                  recent={false}
                />
              </div>
            ))}
          </div>
        )}
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

export default TopTrack;
