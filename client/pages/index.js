import Head from "next/head";
import { Login } from "@/components/Login";
import { getAccessToken, logout } from "@/components/SpotifyAuth";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import SEO from "@/components/SEO";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Home() {
  const token = getAccessToken();
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!token) {
        router.push("/login");
      }
    }, 50); 
    return () => clearTimeout(timeoutId); 
  }, [token, router]);
  

  return (
    <>
      <SEO />
      <main>
        <div className="w-full min-h-[100vh] overflow-hidden bg-[#121212]">
          {token ? (
            <div className="w-full overflow-hidden bg-[#121212]">
              <Dashboard token={token} />
            </div>
          ) : (
            null
          )}
        </div>
      </main>
    </>
  );
}
