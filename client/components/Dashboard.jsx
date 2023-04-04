import { useEffect, useState } from "react";
import { logout, getUserProfile } from "@/components/SpotifyAuth";

const Dashboard = ({ token }) => {
  const handleLogout = () => {
    logout();
  };
  const [profile, setProfile] = useState(null);
  const fetchData = async () => {
    try {
      const { data } = await getUserProfile(token);
      setProfile(data);
    } catch (e) {
      console.error(e);
    }
  };

  fetchData();

  return (
    <div className="h-[100vh] bg-black">
      <button className="text-[14px] text-white" onClick={handleLogout}>
        Logout
      </button>
      <div className="text-white">{token}</div>
      {profile && (
        <div>
          <h1>{profile.display_name}</h1>
          <p className="text-white">{profile.followers.total} Followers</p>
          {profile.images.length && profile.images[0].url && (
            <img src={profile.images[0].url} alt="Avatar" />
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
