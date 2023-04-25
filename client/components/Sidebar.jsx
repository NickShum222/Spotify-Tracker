import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiHomeAlt2 } from "react-icons/bi";
import { TbMicrophone2 } from "react-icons/tb";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { getUserPlaylist } from "@/components/SpotifyAuth";

const Sidebar = () => {
  const catchErrors = (fn) => {
    return function (...args) {
      return fn(...args).catch((err) => {
        console.error(err);
      });
    };
  };
  const [playlists, setPlaylists] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/login");
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      const getPlaylists = await getUserPlaylist(token);
      setPlaylists(getPlaylists.data);
    };
    const timeoutId = setTimeout(() => {
      catchErrors(fetchData)();
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [token]);

  const router = useRouter();
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Top Artists",
      path: `/topArtist`,
    },
    {
      name: "Top Tracks",
      path: `/topTrack`,
    },
  ];

  const [active, setActive] = useState("/");
  return (
    <div className="bg-black h-[100vh] w-[250px] fixed flex flex-col justify-start items-center shadow-2xl z-50">
      <h3 className="text-white font-bold text-[28px] pt-5">
        Spot my <span className="text-spotify">Stats</span>
      </h3>
      <div className="flex flex-col justify-start items-start w-full pl-6 mt-16">
        <p className="text-semiwhite text-[22px] font-light mb-2">Menu</p>
        {navLinks.map((link, index) => (
          <div
            key={index}
            className={`duration-150  ease-in transform  rounded-l-sm border-r-[4px] flex flex-row  border-spotify justify-start items-center w-full py-2 px-4 cursor-pointer ${
              active === link.path
                ? "border-opacity-100 "
                : "border-opacity-0 hover:border-opacity-100"
            }`}
            onClick={() => {
              setActive(link.path);
              router.push(link.path);
            }}
          >
            {index === 0 && (
              <BiHomeAlt2 className="text-semiwhite text-[20px] mr-2" />
            )}
            {index === 1 && (
              <TbMicrophone2 className="text-semiwhite text-[20px] mr-2" />
            )}
            {index === 2 && (
              <IoMusicalNotesOutline className="text-semiwhite text-[20px] mr-2" />
            )}
            <Link href={link.path}>
              <p className="text-semiwhite text-[18px]">{link.name}</p>
            </Link>
          </div>
        ))}
        <div className="flex flex-col justify-start items-start mt-4 w-full">
          <p className="text-semiwhite text-[22px] font-light mb-2">
            Playlists
          </p>
          <div className="w-full h-[350px] overflow-y-scroll mt-2">
            {playlists && playlists.items && (
              <div className="flex flex-col w-full gap-1 justify-start items-start">
                {playlists.items.map((playlist, index) => (
                  <div key={index} className={` w-full `}>
                    <p
                      onClick={() => {
                        setActive(playlist.id);
                        router.push(playlist.id);
                      }}
                      className={`hover:text-spotify duration-150 ease-in transition-all ${active === playlist.id ? "text-spotify" : "text-semiwhite"} text-[18px] cursor-pointer`}
                    >
                      {playlist.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className=" w-full flex flex-col justify-start items-start"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
