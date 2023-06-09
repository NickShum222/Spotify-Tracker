import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '@/styles/globals.css'
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const isLoginPage = router.pathname === '/login';
  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    const timeoutId = setTimeout(() => {
      if (!token) {
        router.push("/login");
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [token, router]);

  


  return (
    <div>
      {!isLoginPage && <Sidebar /> }
      <Component {...pageProps} />
      {!isLoginPage && <Footer /> }
    </div>
  );
}

