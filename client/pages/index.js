import Head from "next/head";
import { Login } from "@/components/Login";
import { getAccessToken, logout } from "@/components/SpotifyAuth";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
export default function Home() {
  const token = getAccessToken();

  return (
    <>
      <Head>
        <title>Spot my Stats</title>
        <meta name="description" content="Spotify Stat Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <div className="w-full min-h-[100vh] overflow-hidden bg-[#121212]">
          <Sidebar/>
          {token ? (
            <div className="w-full overflow-hidden bg-[#121212]">
              <Dashboard token={token} />
            </div>
          ) : (
            <Login />
          )}
        </div>
      </main>
    </>
  );
}
