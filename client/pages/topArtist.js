import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const TopArtists = () => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const { token } = router.query;
    if (token) {
      setToken(token);
    }
  }, [router.query]);

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
    <div>
      <h1>Top Artists</h1>
      <p>Token: {token}</p>
    </div>
    </>
  );
};

export default TopArtists;
