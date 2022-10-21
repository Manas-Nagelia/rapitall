import type { NextPage } from "next";
import Head from "next/head";
import { HeaderMenu } from "../components/HeaderMenu";
import { HeroSection } from "../components/HeroSection";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const Home: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  if (!session) {
    return (
      <>
        <Head>
          <title>Bull Investments</title>
        </Head>
        <HeaderMenu
          links={[
            {
              link: "/login",
              label: "Login",
            },
          ]}
        />{" "}
        <HeroSection />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Bull Investments</title>
        </Head>
        <div>
          hi
        </div>
      </>
    )
  }
};

export default Home;
