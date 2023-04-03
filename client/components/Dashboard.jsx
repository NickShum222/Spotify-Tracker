import React from "react";
import {logout } from "@/components/SpotifyAuth";

const Dashboard = () => {
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <button className="text-[14px] text-black" onClick={handleLogout}>Logout</button>
      <div>Testing</div>
    </div>
  );
};

export default Dashboard;
