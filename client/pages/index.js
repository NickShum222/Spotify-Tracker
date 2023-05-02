import {
  getAccessToken,
  logout,
  getUserProfile,
  getUserPlaylist,
  getRecentlyPlayed,
  getCurrentlyPlaying,
} from "@/components/SpotifyAuth";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import SEO from "@/components/SEO";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Track from "@/components/Track";
export default function Home() {
  const token = getAccessToken();
  const router = useRouter();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!token) {
        router.push("/login");
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [token, router]);
  const catchErrors = (fn) => {
    return function (...args) {
      return fn(...args).catch((err) => {
        router.push("/login");
        console.error(err);
      });
    };
  };
  const handleLogout = () => {
    logout();
  };
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getUserProfile(token);
      setProfile(userProfile.data);

      const userPlaylists = await getUserPlaylist(token);
      setPlaylists(userPlaylists.data);

      const recentlyPlayed = await getRecentlyPlayed(token);
      setTracks(recentlyPlayed.data);

      const currentlyPlaying = await getCurrentlyPlaying(token);
      setCurrentTrack(currentlyPlaying.data);
    };

    const timeoutId = setTimeout(() => {
      catchErrors(fetchData)();
    }, 10);
    return () => clearTimeout(timeoutId);
  }, [token]);
  return (
    <>
      <SEO />
      <main>
        <div className="w-full min-h-[100vh] overflow-hidden bg-[#121212]">
          {token ? (
            <div className="w-full overflow-hidden bg-[#121212]">
              <section
                className={`xl:pl-[370px] xl:pr-[120px] lg:pl-[320px] lg:pr-[100px] md:pl-[200px] md:pr-[80px] pl-5 pr-5 md:py-24 py-12 z-[5] pt-[90px] flex flex-col justify-start items-start min-h-[100vh]`}
              >
                {profile && (
                  <div className="w-full flex flex-row md:gap-[60px] sm:gap-[35px] gap-[20px]  justify-start items-center pb-10 ">
                    {profile.images.length && profile.images[0].url && (
                      <a
                        href={profile.external_urls.spotify}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <img
                          src={profile.images[0].url}
                          alt="Avatar"
                          className="rounded-full aspect-square object-contain transform duration-300 lg:h-[240px] md:h-[200px] sm:h-[150px] h-[140px] "
                        />
                      </a>
                    )}

                    <div className="flex flex-col justify-start items-start">
                      <a
                        href={profile.external_urls.spotify}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-white font-bold transform duration-300 lg:text-[72px] md:text-[64px] sm:text-[60px] text-[50px] max-md:leading-[76px] max-sm:leading-[60px] hover:text-spotify"
                      >
                        {profile.display_name}
                      </a>
                      <div className="flex flex-row justify-start lg:gap-[20px] sm:gap-[16px] gap-[8px] leading-[12px] items-center w-full">
                        <p className="text-white lg:text-[18px] transform duration-300 sm:text-[16px] text-[14px]">
                          {profile.followers.total} Followers
                        </p>

                        {playlists && (
                          <p className="text-white lg:text-[18px] transform duration-300 sm:text-[16px] text-[14px]">
                            {playlists.total} playlists
                          </p>
                        )}
                      </div>
                      <button
                        className=" text-white border-white border-[1px] py-2 md:text-[15px] text-[12px] px-8 rounded-full mt-5 transform duration-300 hover:bg-white font-semibold hover:text-black ease-in-out"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  // <div className="bg-[#151515] h-full">
                  //   <h1 className="text-white">{profile.display_name}</h1>
                  //   <p className="text-white">{profile.followers.total} Followers</p>
                  //   {profile.images.length && profile.images[0].url && (
                  //     <img src={profile.images[0].url} alt="Avatar" />
                  //   )}
                  // </div>
                )}

                <div className="flex flex-col w-full justify-start items-start  ">
                  <h3 className="text-white font-semibold lg:text-[28px] sm:text-[24px] text-[18px] pb-4">
                    Recently Played
                  </h3>
                  <div className="border-b-[1px] w-full flex flex-row justify-around items-center border-semiwhite pb-2 md:mb-5 mb-3  md:px-6 px-2">
                    <p className="text-semiwhite lg:w-[50%] sm:w-[80%] w-[70%] lg:text-[17px] text-[14px] md:text-[16px] ">
                      Track
                    </p>
                    <p className="text-semiwhite w-[30%] lg:text-[17px] text-[14px] md:text-[16px] lg:inline hidden">
                      Album
                    </p>
                    <p className="text-semiwhite sm:w-[20%] w-[30%] lg:text-[17px] text-[14px] md:text-[16px]">
                      Played at
                    </p>
                  </div>
                  {currentTrack && currentTrack.item && (
                    <div className="w-full flex flex-col gap-3 justify-start items-start mb-3">
                      <Track
                        img={currentTrack.item.album.images[0].url}
                        title={currentTrack.item.name}
                        artist={currentTrack.item.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                        album={currentTrack.item.album.name}
                        time={currentTrack.item.duration_ms}
                        url={currentTrack.item.external_urls.spotify}
                        current={true}
                        recent={true}
                        playedAt={currentTrack.timestamp}
                        isPlaying={currentTrack.is_playing}
                      />
                    </div>
                  )}
                  {tracks && tracks.items && (
                    <div className="w-full flex flex-col gap-3 justify-start items-start ">
                      {tracks.items.map((track, index) => (
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
                          current={false}
                          recent={true}
                          playedAt={track.played_at}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
