import Head from "next/head";
import { Login } from "@/components/Login";
import {getAccessToken, logout} from "@/components/SpotifyAuth";
import Dashboard from "@/components/Dashboard";
export default function Home() {
  const token = getAccessToken();

  return (
    <>
      <Head>
        <title>Spot my Stats</title>
        <meta name="description" content="Spotify Stat Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="h-[100vh]">
          {token ? (
            <div>
              <Dashboard/>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </main>
    </>
  );
}
