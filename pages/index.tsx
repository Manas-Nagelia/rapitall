import { Session } from "@supabase/supabase-js";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { HeroSection } from "../components/Home/HeroSection";
import { HeaderMenu } from "../components/Navbar/HeaderMenu";
import { supabase } from "../utils/supabaseClient";
import redirect from "nextjs-redirect";
import Loading from "../components/Loading";
import { deleteCookie } from "cookies-next";
import { useMantineColorScheme } from "@mantine/core";

const Home: NextPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const Redirect = redirect("/app");

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session);
        }

        setIsLoading(false);
      }
    }

    getInitialSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
      }
    });

    return () => {
      mounted = false;

      data.subscription.unsubscribe();
    };
  }, [session]);

  return (
    <>
      <Head>
        <title>Admin Center Home</title>
      </Head>
      {isLoading && <Loading />}
      {!isLoading && (!session ? (
        <>
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
      ) : (
        <Redirect>
          <Loading />
        </Redirect>
      ))}
    </>
  );
};

export default Home;
