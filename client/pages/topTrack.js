import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import SEO from "@/components/SEO";

const TopTrack = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const catchErrors = (fn) => {
    return function (...args) {
      return fn(...args).catch((err) => {
        console.error(err);
      });
    };
  };
  useEffect(() => {
    const { token } = router.query;
    if (token) {
      setToken(token);
    }
  }, [router.query]);

  return (
    <>
      <SEO />
      <section className={` w-full min-h-[100vh] overflow-hidden bg-[#121212] xl:pl-[370px] xl:pr-[120px] lg:pl-[350px] lg:pr-[100px] md:pl-36 md:pr-[80px] pl-6 pr-6 py-24 z-[5] flex flex-col justify-start items-start `}>
        <h1>TopTrack</h1>
        <p>Token: {token}</p>
      </section >
    </>
  );
};

export default TopTrack;
