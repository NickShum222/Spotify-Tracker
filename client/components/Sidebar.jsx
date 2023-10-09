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
        router.push("/login");
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
  const [nav, setNav] = useState(false);
  const toggleNav = () => {
    setNav(!nav);
  };
  return (
    <>
      <div className="bg-black md:h-[100vh] max-md:w-[100vw] lg:w-[250px] md:w-[150px] md:px-0 px-4 fixed h-[70px] flex md:flex-col flex-row md:justify-start items-center justify-between shadow-2xl z-50">
        <h3 className="text-white font-semibold lg:text-[28px] text-[22px] md:pt-5 transform duration-300">
          <a href="/">
            Spoti<span className="text-spotify italic ">Track</span>
          </a>
        </h3>
        {/* Desktop Menu */}
        <div className=" md:flex md:flex-col hidden lg:justify-start lg:items-start justify-center items-center w-full lg:px-0 px-4 lg:pl-6 mt-16">
          <p className="text-semiwhite transform duration-300 lg:text-[22px] md:text-[20px] font-light mb-2">
            Menu
          </p>
          <div className="w-full lg:bg-transparent md:bg-[#121212] rounded-lg">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className={`duration-150 group ease-in transform  rounded-l-sm border-r-[4px] flex lg:flex-row md:flex-col  border-spotify md:justify-start md:items-center justify-center items-center w-full py-2 md:px-4 cursor-pointer ${
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
                  <BiHomeAlt2
                    className="group-hover:text-spotify text-semiwhite mr-2"
                    size={"1.1em"}
                  />
                )}
                {index === 1 && (
                  <TbMicrophone2
                    className="group-hover:text-spotify text-semiwhite mr-2"
                    size={"1.3em"}
                  />
                )}
                {index === 2 && (
                  <IoMusicalNotesOutline
                    className="group-hover:text-spotify text-semiwhite  mr-2"
                    size={"1.3em"}
                  />
                )}
                <Link href={link.path}>
                  <p className="group-hover:text-spotify text-semiwhite transform duration-300 lg:text-[18px] md:text-[15px]">
                    {link.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:justify-start lg:items-start justify-center items-center  lg:mt-4 mt-8 w-full">
            <p className="text-semiwhite transform duration-300 lg:text-[22px] md:text-[20px] font-light mb-2">
              Playlists
            </p>
            <div className="w-full h-[350px] overflow-y-scroll md:bg-[#121212] lg:bg-transparent rounded-lg  mt-2">
              {playlists && playlists.items && (
                <div className="flex flex-col w-full transform duration-300 lg:gap-1 gap-3 lg:px-0 px-4 lg:pt-0  md:pt-4 justify-start items-start">
                  {playlists.items.map((playlist, index) => (
                    <div key={index} className={` w-full `}>
                      <p
                        onClick={() => {
                          setActive(playlist.id);
                          router.push(playlist.id);
                        }}
                        className={`hover:text-spotify duration-150 lg:inline hidden ease-in transition-all ${
                          active === playlist.id
                            ? "text-spotify"
                            : "text-semiwhite"
                        } transform duration-300 text-[18px] cursor-pointer`}
                      >
                        {playlist.name}
                      </p>
                      <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        className="h-full w-full rounded-md lg:hidden inline cursor-pointer"
                        onClick={() => {
                          setActive(playlist.id);
                          router.push(playlist.id);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}

        <div
          className="md:hidden flex flex-col cursor-pointer z-[99]"
          onClick={toggleNav}
        >
          <div
            className={`transform duration-300 w-[25px] h-[3px] bg-white rounded-full ease-in-out my-[2px] mx-1 ${
              nav ? "translate-y-[7px] origin rotate-45 transition " : ""
            }`}
          ></div>
          <div
            className={`transform duration-300 w-[25px] h-[3px] bg-white rounded-full ease-in-out my-[2px] mx-1 ${
              nav ? "translate-x-[100%] opacity-0" : ""
            }`}
          ></div>
          <div
            className={`transform duration-300 w-[25px] h-[3px] bg-white rounded-full ease-in-out my-[2px] mx-1 ${
              nav ? "translate-y-[-7px] origin -rotate-45 transition" : ""
            }`}
          ></div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 transform ${
          nav
            ? "fixed left-0 top-0 w-full h-screen opacity-100"
            : "opacity-0 pointer-events-none"
        } md:hidden backdrop-blur-lg z-[40]`}
        onClick={() => {
          toggleNav();
        }}
      >
        <div
          className={` ${
            nav ? "" : "-translate-y-[300px]"
          } duration-300 ease-out transition-all transform md:hidden w-full rounded-md z-[40] fixed bg-black  flex flex-col justify-center items-center mt-[70px] py-6 gap-3`}
        >
          {navLinks.map((link, index) => (
            <div
              key={index}
              className={`flex group flex-row items-center w-full justify-center`}
              onClick={() => {
                setActive(link.path);
                router.push(link.path);
                toggleNav();
              }}
            >
              {index === 0 && (
                <BiHomeAlt2
                  className="group-hover:text-spotify text-semiwhite mr-2"
                  size={"1.5em"}
                />
              )}
              {index === 1 && (
                <TbMicrophone2
                  className="group-hover:text-spotify text-semiwhite mr-2"
                  size={"1.5em"}
                />
              )}
              {index === 2 && (
                <IoMusicalNotesOutline
                  className=" group-hover:text-spotify text-semiwhite  mr-2"
                  size={"1.5em"}
                />
              )}
              <Link href={link.path}>
                <p className="group-hover:text-spotify text-semiwhite text-[20px]">
                  {link.name}
                </p>
              </Link>
            </div>
          ))}
          <div className="flex flex-col justify-center items-center mt-6">
            <h3 className="text-semiwhite text-[20px] mb-4">Playlists</h3>
            <div className="w-full h-[200px] overflow-y-scroll md:bg-[#121212] lg:bg-transparent rounded-lg  mt-2 px-4">
              {playlists && playlists.items && (
                <div className="grid grid-cols-3 justify-center items-center w-full transform duration-300 gap-x-5 gap-y-3 px-4 lg:pt-0  md:pt-4 ">
                  {playlists.items.map((playlist, index) => (
                    <div key={index} className={` w-full `}>
                      <p
                        key={index}
                        onClick={() => {
                          setActive(playlist.id);
                          router.push(playlist.id);
                        }}
                        className={`text-semiwhite duration-150  ease-in transition-all  transform text-[16px] cursor-pointer`}
                      >
                        {playlist.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
