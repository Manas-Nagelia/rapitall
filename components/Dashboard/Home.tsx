import { NextPage } from "next";
import Head from "next/head";
import { StatGrid } from "./StatGrid";
import { Group, Paper, Stack, Title, useMantineTheme, Center } from "@mantine/core";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  Area,
  Bar,
  Legend,
  ResponsiveContainer,
  AreaChart,
} from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Loading from "../Loading";
import redirect from "nextjs-redirect";
import { NextDate } from "./NextDate";

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const desktopMatch = !useMediaQuery("(max-width: 1181px)");
  const tabletMatch = useMediaQuery("(max-width: 1030px)");
  const mobileMatch = useMediaQuery("(max-width: 565px)");
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null);
  const [done, setDone] = useState(false);

  const statsData = [
    {
      title: "Errors",
      icon: "user",
      value: "188",
      diff: -30,
    },
    {
      title: "Records Skipped",
      icon: "receipt",
      value: "13,456",
      diff: 34,
    },
    {
      title: "Time (in hours)",
      icon: "coin",
      value: "4,145",
      diff: -13,
    },
  ];

  const nextAuto = {
    "days": 0
  }

  const errorsAndSkippedData = [
    { date: "Jan 2022", Errors: 8, Skipped: 5 },
    { date: "Feb 2022", Errors: 5, Skipped: 3 },
    { date: "March 2022", Errors: 4, Skipped: 2 },
    { date: "April 2022", Errors: 9, Skipped: 6 },
    { date: "May 2022", Errors: 1, Skipped: 1 },
  ];

  const timeData = [
    { date: "Jan 2022", Hours: 8 },
    { date: "Feb 2022", Hours: 5 },
    { date: "March 2022", Hours: 4 },
    { date: "April 2022", Hours: 9 },
    { date: "May 2022", Hours: 1 },
  ];

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data.user) {
        setLoggedIn(false);
        setDone(true);
      } else {
        setLoggedIn(true);
        setDone(true);
      }
    };

    checkIfLoggedIn();
  }, []);

  const Redirect = redirect("/");

  if (loggedIn === true && done == true) {
    return (
      <>
        <Head>
          <title>Dashboard - Home</title>
        </Head>
        <Title
          order={4}
          mx={!mobileMatch ? "md" : undefined}
          mb={-3}
          align={mobileMatch ? "center" : undefined}
        >
          Performance Overview
        </Title>
        <StatGrid data={statsData} />
        {!mobileMatch ? (
          <Group
            position={!desktopMatch ? "center" : "apart"}
            mx={desktopMatch ? "md" : undefined}
            mt="xl"
          >
            <Paper>
              <Title order={4} mx="sm" mb={7}>
                Time (in hours)
              </Title>
              <AreaChart
                width={desktopMatch ? 500 : !tabletMatch ? 400 : 325}
                height={desktopMatch ? 300 : 300}
                data={timeData}
                margin={{ top: 7.5, right: 20, bottom: 5, left: -25 }}
              >
                <defs>
                  <linearGradient id="timeColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={"#7274F1"} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={"#7274F1"} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="darkTimeColor"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={"#5b5dc1"} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={"#5b5dc1"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="Hours"
                  stroke={theme.colorScheme == "dark" ? "#5e60f8" : "#7274F1"}
                  fill={
                    theme.colorScheme == "dark"
                      ? "url(#darkTimeColor"
                      : "url(#timeColor)"
                  }
                  fillOpacity={1}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
              </AreaChart>
            </Paper>
            <Paper>
              <Title order={4} mx="sm" mb={7}>
                Errors and Rows Skipped
              </Title>
              <ComposedChart
                width={desktopMatch ? 500 : !tabletMatch ? 400 : 325}
                height={desktopMatch ? 300 : 300}
                data={errorsAndSkippedData}
                margin={{ top: 7.5, right: 20, bottom: 5, left: -25 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={
                        theme.colors.red[theme.colorScheme == "dark" ? 8 : 6]
                      }
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={
                        theme.colors.red[theme.colorScheme == "dark" ? 8 : 6]
                      }
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Skipped"
                  barSize={20}
                  fill={theme.colors.teal[theme.colorScheme == "dark" ? 8 : 6]}
                  opacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="Errors"
                  stroke={theme.colors.red[theme.colorScheme == "dark" ? 8 : 6]}
                  fill="url(#colorUv)"
                  fillOpacity={1}
                />
              </ComposedChart>
            </Paper>
          </Group>
        ) : (
          <Stack align="center" mt="xl" mx={0}>
            <Paper>
              <Title order={4} mb={7} align="center">
                Errors and Rows Skipped
              </Title>
              <ComposedChart
                width={375}
                height={300}
                data={errorsAndSkippedData}
                margin={{ top: 7.5, right: 20, bottom: 5, left: -25 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={
                        theme.colors.red[theme.colorScheme == "dark" ? 8 : 6]
                      }
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={
                        theme.colors.red[theme.colorScheme == "dark" ? 8 : 6]
                      }
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Skipped"
                  barSize={20}
                  fill={theme.colors.teal[theme.colorScheme == "dark" ? 8 : 6]}
                  opacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="Errors"
                  stroke={theme.colors.red[theme.colorScheme == "dark" ? 8 : 6]}
                  fill="url(#colorUv)"
                  fillOpacity={1}
                />
              </ComposedChart>
            </Paper>
            <Paper>
              <Title order={4} mb={7} align="center">
                Time (in hours)
              </Title>
              <AreaChart
                width={375}
                height={300}
                data={timeData}
                margin={{ top: 7.5, right: 20, bottom: 5, left: -25 }}
              >
                <defs>
                  <linearGradient id="timeColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={"#7274F1"} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={"#7274F1"} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="darkTimeColor"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={"#5b5dc1"} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={"#5b5dc1"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="Hours"
                  stroke={theme.colorScheme == "dark" ? "#5e60f8" : "#7274F1"}
                  fill={
                    theme.colorScheme == "dark"
                      ? "url(#darkTimeColor"
                      : "url(#timeColor)"
                  }
                  fillOpacity={1}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
              </AreaChart>
            </Paper>
          </Stack>
        )}
        <NextDate data={nextAuto} />
      </>
    );
  } else {
    if (loggedIn == false) {
      return (
        <Redirect><Loading /></Redirect>
      );
    } else {
      return <Loading />
    }
  }
};

export default Home;
