import type { NextPage } from "next";
import Head from "next/head";
import { HeaderMenu } from "../components/HeaderMenu";
import { HeroSection } from "../components/HeroSection";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import redirect from "nextjs-redirect";
import { Loader } from "@mantine/core";
import Loading from "../components/Loading";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(undefined);

  const Redirect = redirect("/");
  const supabase = useSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, [supabase]);

  if (loading) {
    return <Loading />
  } else {
    if (user == null) {
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
          <div>hi</div>
        </>
      );
    }
  }
};

export default Home;
