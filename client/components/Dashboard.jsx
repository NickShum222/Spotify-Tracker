import { useEffect, useState } from "react";
import {
  logout,
  getUserProfile,
  getUserPlaylist,
  getRecentlyPlayed,
} from "@/components/SpotifyAuth";
import { styles } from "@/styles";
import Track from "./Track";

const Dashboard = ({ token }) => {
  const catchErrors = (fn) => {
    return function (...args) {
      return fn(...args).catch((err) => {
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

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getUserProfile(token);
      setProfile(userProfile.data);
      console.log(userProfile);
      const userPlaylists = await getUserPlaylist(token);
      setPlaylists(userPlaylists.data);
      console.log(userPlaylists);
      const recentlyPlayed = await getRecentlyPlayed(token);
      setTracks(recentlyPlayed.data);
      console.log(recentlyPlayed);
    };

    catchErrors(fetchData());
  }, []);
  return (
    <section
      className={`xl:px-[370px] lg:px-[350px] md:px-36 px-6 py-24 z-[5] flex flex-col justify-start items-center min-h-[100vh]`}
    >
      {profile && (
        <div className="w-full flex flex-row gap-[60px]  justify-start items-center pb-10 border-b-[1px]">
          <div>
            {profile.images.length && profile.images[0].url && (
              <img
                src={profile.images[0].url}
                alt="Avatar"
                className="rounded-full object-contain h-[240px] "
              />
            )}
          </div>
          <div className="flex flex-col justify-start items-start">
            <a
              href={profile.external_urls.spotify}
              rel="noopener noreferrer"
              target="_blank"
              className="text-white font-bold text-[72px]"
            >
              {profile.display_name}
            </a>
            <div className="flex flex-row justify-start gap-[20px] items-center w-full">
              <p className="text-white text-[18px]">
                {profile.followers.total} Followers
              </p>

              {playlists && (
                <p className="text-white text-[18px]">
                  {playlists.total} playlists
                </p>
              )}
            </div>
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
      {/* <button className="text-[14px] text-white" onClick={handleLogout}>
        Logout
      </button> */}
      <div className="flex flex-col w-full justify-start items-start mt-[75px] ">
        <h3 className="text-white font-semibold text-[28px] pb-4">
          Recently Played
        </h3>
        {tracks && tracks.items && (
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            {tracks.items.map((track, index) => (
              <Track
                key={index}
                img={track.track.album.images[0].url}
                title={track.track.name}
                artist={track.track.artists[0].name}
                album={track.track.album.name}
                time={track.track.duration_ms}
                url={track.track.external_urls.spotify}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
