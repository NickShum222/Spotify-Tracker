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
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const getTopArtist = await getTopArtists(token, range);
      setTopArtists(getTopArtist.data);
      console.log(getTopArtist)
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
        <h1 className="text-white font-semibold text-[28px] pb-4">Top Artists</h1>
        <div className="flex flex-row w-full gap-4 ">
          <button className="text-white" onClick={() => setRange('short_term')}>Last Month</button>
          <button className="text-white" onClick={() => setRange('medium_term')}>Last 6 Months</button>
          <button className="text-white" onClick={() => setRange('long_term')}>All Time</button>
        </div>
        {/* index, img, name, url */}
        <div className="grid grid-cols-5 w-full">
          {topArtists && topArtists.items.map((artist, index) => (
            <Artist key={artist.id} index={index}  name={artist.name} img={artist.images[0].url} url={artist.external_urls.spotify} />
          ))}

        </div>
      </section>
    </>
  );
};

export default TopArtists;
