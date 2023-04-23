import { useEffect, useState } from "react";
import {
  logout,
  getUserProfile,
  getUserPlaylist,
  getRecentlyPlayed,
  getCurrentlyPlaying,
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
  const [currentTrack, setCurrentTrack] = useState(null);

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
      const currentlyPlaying = await getCurrentlyPlaying(token);
      setCurrentTrack(currentlyPlaying.data);
      console.log(currentlyPlaying);
    };

    catchErrors(fetchData());
  }, []);
  return (
    <section
      className={`xl:pl-[370px] xl:pr-[120px] lg:pl-[350px] lg:pr-[100px] md:pl-36 md:pr-[80px] pl-6 pr-6 py-24 z-[5] flex flex-col justify-start items-start min-h-[100vh]`}
    >
      {profile && (
        <div className="w-full flex flex-row gap-[60px]  justify-start items-center pb-10 ">
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
            <div className="flex flex-row justify-start gap-[20px] leading-[12px] items-center w-full">
              <p className="text-white text-[18px]">
                {profile.followers.total} Followers
              </p>

              {playlists && (
                <p className="text-white text-[18px]">
                  {playlists.total} playlists
                </p>
              )}
            </div>
            <button className=" text-white border-white border-[1px] py-2 text-[15px] px-8 rounded-full mt-5 transform duration-300 hover:bg-white font-semibold hover:text-black ease-in-out" onClick={handleLogout}>
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
        <h3 className="text-white font-semibold text-[28px] pb-4">
          Recently Played
        </h3>
        <div className="border-b-[1px] w-full flex flex-row justify-around items-center border-semiwhite pb-2 mb-5 px-6">
            <p className="text-semiwhite w-[50%] text-[17px]">Track</p>
            <p className="text-semiwhite w-[30%] text-[17px]">Album</p>
            <p className="text-semiwhite w-[20%] text-[17px]">Played at</p>
        </div>
        {currentTrack && currentTrack.item && (
          <div className="w-full flex flex-col gap-3 justify-start items-start mb-3">
            <Track
              img={currentTrack.item.album.images[0].url}
              title={currentTrack.item.name}
              artist={currentTrack.item.artists[0].name}
              album={currentTrack.item.album.name}
              time={currentTrack.item.duration_ms}
              url={currentTrack.item.external_urls.spotify}
              current = {true}
              recent = {true}
              playedAt = {currentTrack.timestamp}
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
                artist={track.track.artists[0].name}
                album={track.track.album.name}
                time={track.track.duration_ms}
                url={track.track.external_urls.spotify}
                current = {false}
                recent = {true}
                playedAt = {track.played_at}

              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
