import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { createStyles, Navbar } from "@mantine/core";
import {
  IconSettings,
  IconDatabaseImport,
  IconX,
  IconLogout,
  IconHome,
  IconApiApp,
  IconUsers,
  IconCheck,
} from "@tabler/icons";
import { supabase } from "../../utils/supabaseClient";
import Link from "next/link";
import { showNotification } from "@mantine/notifications";
import { deleteCookie } from "cookies-next";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon: any = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  { link: "", label: "Home", icon: IconHome },
  { link: "https://n3.notaku.site/", label: "API", icon: IconApiApp },
  { link: "", label: "User Management", icon: IconUsers },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Settings", icon: IconSettings },
];

interface Props {
  opened: boolean;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  setOpened: Dispatch<SetStateAction<boolean>>;
}
export function NavbarSimple(props: Props) {
  const { classes, cx } = useStyles();
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data.user) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    };

    checkIfLoggedIn();
  }, []);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === props.active,
      })}
      href={item.link}
      target="__blank"
      key={item.label}
      onClick={(event) => {
        if (!item.link) {
          event.preventDefault();
          props.setActive(item.label);
          props.setOpened(false);
        }
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  if (loggedIn === true) {
    return (
      <Navbar
        width={{ sm: 300 }}
        p="md"
        hiddenBreakpoint="sm"
        hidden={!props.opened}
      >
        <Navbar.Section grow>{links}</Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <Link className={classes.link} href="/">
            <a
              className={classes.link}
              onClick={async (event) => {
                const { error } = await supabase.auth.signOut();
                if (!error) {
                  console.log("hi");
                  deleteCookie("mantine-color-scheme");
                  showNotification({
                    title: "Successfully logged out",
                    message: "Redirecting to home page...",
                    color: "green",
                    icon: <IconCheck size="18" />,
                    autoClose: 1500,
                  });
                  setLoggedIn(false);
                } else {
                  console.log(error);
                  showNotification({
                    title: "Logging out failed",
                    message:
                      "An unexpected error happened while logging out. The error was posted into the browser's console, and please contact the site's owner on how to debug this issue.",
                    color: "red",
                    icon: <IconX size="18" />,
                    autoClose: 2500,
                  });
                }
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Link>
        </Navbar.Section>
      </Navbar>
    );
  } else {
    return <></>;
  }
}
