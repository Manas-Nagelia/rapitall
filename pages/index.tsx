import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { HeaderMenu } from "../components/HeaderMenu";
import { HeroSection } from "../components/HeroSection";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
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
};

export default Home;
