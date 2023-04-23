import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ token }) => {
  const router = useRouter();
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Top Artists",
      path: `/topArtist?token=${token}`,
    },
    {
      name: "Top Tracks",
      path: `/topTrack?token=${token}`,
    },
  ];

  const [active, setActive] = useState("/");
  return (
    <div className="bg-black h-[100vh] w-[250px] fixed flex flex-col justify-start items-center shadow-2xl z-50">
      <h3 className="text-white font-bold text-[28px] pt-5">
        Spot my <span className="text-spotify">Stats</span>
      </h3>
      <div className="flex flex-col justify-start items-start w-full pl-6">
        <p className="text-semiwhite text-[22px]">Menu</p>
        {navLinks.map((link, index) => (
          <div
            key={index}
            className={`duration-150 ease-in transform border-r-[4px] flex flex-row border-spotify justify-start items-center w-full py-2 px-4 cursor-pointer ${
              active === link.path ? "border-opacity-100 " : "border-opacity-0 hover:border-opacity-100"
            }`}
            onClick={() => {
              setActive(link.path);
              router.push(link.path);
            }}
          >
            <Link href={link.path}>
              <p className="text-semiwhite">{link.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
