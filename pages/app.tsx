import { NextPage } from "next";
import { useMediaQuery } from "@mantine/hooks";
import { AppShell, useMantineTheme } from "@mantine/core";
import Head from "next/head";
import { NavbarSimple } from "../components/Dashboard/Navbar";
import SimpleHeader from "../components/Dashboard/Header";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../utils/supabaseClient";
import { Users } from "../components/Dashboard/Users";
const Home = dynamic(() => import("../components/Dashboard/Home"), {
  ssr: false,
});

const App: NextPage = () => {
  const desktopMatch = !useMediaQuery("(max-width: 1085px)");
  const tabletMatch = useMediaQuery("(max-width: 900px)");
  const mobileMatch = useMediaQuery("(max-width: 565px)");
  const [active, setActive] = useState("Home");
  const [opened, setOpened] = useState(false);

  const userMockData = [
    {
      avatar:
        "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Robert Wolfkisser",
      job: "Engineer",
      email: "rob_wolf@gmail.com",
      role: "Collaborator",
      active: Math.random() < 0.5,
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Jill Jailbreaker",
      job: "Engineer",
      email: "jj@breaker.com",
      role: "Collaborator",
      active: Math.random() < 0.5,
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Henry Silkeater",
      job: "Designer",
      email: "henry@silkeater.io",
      role: "Contractor",
      active: Math.random() < 0.5,
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Bill Horsefighter",
      job: "Designer",
      email: "bhorsefighter@gmail.com",
      role: "Contractor",
      active: Math.random() < 0.5,
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Jeremy Footviewer",
      job: "Manager",
      email: "jeremy@foot.dev",
      role: "Manager",
      active: Math.random() < 0.5,
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <>
        <AppShell
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <NavbarSimple
              opened={opened}
              active={active}
              setActive={setActive}
              setOpened={() => setOpened((o: boolean) => !o)}
            />
          }
          header={
            <SimpleHeader
              opened={opened}
              setOpened={() => setOpened((o: boolean) => !o)}
            />
          }
          padding={0}
        >
          {active == "Home" && <Home />}
          {active == "User Management" && <Users data={userMockData} />}
        </AppShell>
      </>
    </>
  );
};

export default App;
