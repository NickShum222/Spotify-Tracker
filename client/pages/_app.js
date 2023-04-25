import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '@/styles/globals.css'
import Sidebar from "@/components/Sidebar";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const isLoginPage = router.pathname === '/login';
  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) {
      router.push("/login");
    }
    else{
      setToken(token);
    }
  }, []);


  return (
    <div>
      {!isLoginPage && <Sidebar />}
      <Component {...pageProps} />
    </div>
  );
}

