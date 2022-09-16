import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import image from "./image.svg";
import { useMediaQuery } from "@mantine/hooks";
import N3 from "./N3";
import Features from "./Features";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 5,
    paddingBottom: theme.spacing.xl * 4,
    [theme.fn.smallerThan("xs")]: {
      paddingTop: theme.spacing.md * 5.5,
      paddingBottom: theme.spacing.sm * 4,
    },
  },

  content: {
    maxWidth: 380,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 40,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    marginLeft: 100,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: "#7274f1",
    color: "#f1f1f1",
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export function HeroSection() {
  const { classes } = useStyles();
  const matches = useMediaQuery("(max-width: 900px)");
  const mobileMatch = useMediaQuery("(max-width: 565px)");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    toggleColorScheme("light");
  }, [toggleColorScheme]);

  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            {!matches ? (
              <Title className={classes.title}>
                A <span className={classes.highlight}>simple</span> NBA <br />{" "}
                API
              </Title>
            ) : (
              <Title
                className={classes.title}
                align={mobileMatch ? "center" : undefined}
              >
                A <span className={classes.highlight}>simple</span> NBA API
              </Title>
            )}
            <Text
              color="dimmed"
              mt="md"
              align={mobileMatch ? "center" : undefined}
            >
              Build fully functional data based applications faster than ever.
              Our simple API allows you to build your own data-driven web
              applications in minutes. Then, customize it to your needs with our
              admin tools.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Python based</b> – build data driven applications faster than
                ever.
              </List.Item>
              <List.Item>
                <b>Admin Center</b> – customize the API to your needs in an
                admin center.
              </List.Item>
              <List.Item>
                <b>Pandas</b> – all of the data can be easily converted to a CSV
                or a pandas dataframe.
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                component="a"
                radius="xl"
                size="md"
                className={classes.control}
                href="/login"
              >
                Admin Center
              </Button>
              <Button
                component="a"
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
                href="https://n3.notaku.site/"
                target="_blank"
              >
                Documentation
              </Button>
            </Group>
          </div>
          <Image
            src={image.src}
            className={classes.image}
            width="110%"
            alt="A person coding on her laptop"
          />
        </div>
        <N3 />
        <Features />
      </Container>
    </div>
  );
}
