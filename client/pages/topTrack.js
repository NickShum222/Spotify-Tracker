import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
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
        className={` w-full min-h-[100vh] overflow-hidden bg-[#121212] xl:pl-[370px] xl:pr-[120px] lg:pl-[350px] lg:pr-[100px] md:pl-36 md:pr-[80px] pl-6 pr-6 py-24 z-[5] flex flex-col justify-start items-start `}
      >
        <h1 className="text-white font-semibold text-[28px] pb-4">
          Top Tracks
        </h1>
        <div className="flex flex-row w-full gap-4 ">
          <button className="text-white" onClick={() => setRange("short_term")}>
            Last Month
          </button>
          <button
            className="text-white"
            onClick={() => setRange("medium_term")}
          >
            Last 6 Months
          </button>
          <button className="text-white" onClick={() => setRange("long_term")}>
            All Time
          </button>
        </div>
        <div className="border-b-[1px] w-full flex flex-row justify-around items-center border-semiwhite pb-2 mb-5 px-6">
          <p className="text-semiwhite w-[50%] text-[17px]">Track</p>
          <p className="text-semiwhite w-[30%] text-[17px]">Album</p>
          <p className="text-semiwhite w-[20%] text-[17px]">Duration</p>
        </div>
        {topTracks && topTracks.items && (
          <div className="w-full flex flex-col gap-3 justify-start items-start">
            {topTracks.items.map((track, index) => (
              <div className="flex flex-row justify-start items-center w-full">
                <p className="text-white w-[1%]">{index + 1}.</p>
                <Track
                  key={index}
                  img={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
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
    </>
  );
};

export default TopTrack;
