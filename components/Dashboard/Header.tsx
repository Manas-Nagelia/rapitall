import {
  Header,
  Group,
  ActionIcon,
  useMantineColorScheme,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { NextPage } from "next";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { MouseEventHandler, useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { supabase } from "../../utils/supabaseClient";
import Loading from "../Loading";

interface Props {
  opened: boolean;
  setOpened: MouseEventHandler<HTMLButtonElement> | undefined;
}
const SimpleHeader: NextPage<Props> = (props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null);
  const mobileMatch = useMediaQuery("(max-width: 565px)");

  const dark = colorScheme === "dark";
  const theme = useMantineTheme();

  useEffect(() => {
    const toggleDefaultTheme = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        setLoggedIn(true);
        const email = data.user?.email;
        const { data: themeData, error: themeError } = await supabase
          .from("Admins")
          .select()
          .eq("email", email);
        const prefTheme = themeData![0].darkTheme;
        if (prefTheme) {
          toggleColorScheme("dark");
        } else {
          toggleColorScheme("light");
        }
      } else {
        setLoggedIn(false);
      }
    };

    toggleDefaultTheme();
  }, []);

  if (loggedIn === true) {
    return (
      <Header height={60} p="md" px="lg">
        <Group position="apart">
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={props.opened}
              onClick={props.setOpened}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>

          <MantineLogo size={28} />
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={async () => {
              toggleColorScheme();
              const { data: userData, error: userError } =
                await supabase.auth.getUser();
              const email = userData.user?.email;
              let darkThemeValue: boolean;
              theme.colorScheme == "light"
                ? (darkThemeValue = true)
                : (darkThemeValue = false);
              const { data, error } = await supabase
                .from("Admins")
                .update({ darkTheme: darkThemeValue })
                .match({ email: email });
            }}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Group>
      </Header>
    );
  } else {
    return <></>;
  }
};

export default SimpleHeader;
