import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  createStyles,
} from "@mantine/core";
import { Features } from "./Features";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginTop: theme.spacing.xl - 4,
    paddingTop: 180,
    paddingBottom: 130,
    backgroundImage:
      "url(https://images.unsplash.com/photo-1511883040705-6011fad9edfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60)",
    backgroundSize: "cover",
    backgroundPosition: "center",

    "@media (max-width: 520px)": {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "center",
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "center",

    "@media (max-width: 520px)": {
      fontSize: theme.fontSizes.md,
      textAlign: "center",
    },
  },

  controls: {
    marginTop: theme.spacing.xl,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: "rgba(255, 255, 255, .4)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .45) !important",
    },
  },
}));

export function HeroSection() {
  const { classes, cx } = useStyles();

  return (
    <div>
      <div className={classes.wrapper}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Find and {" "}
            <Text component="span" inherit className={classes.highlight}>
              analyze
            </Text>{" "}
            stocks with ease.
          </Title>

          <Container size={640}>
            <Text size="lg" className={classes.description}>
              Make successful decisions and make money in the financial markets
              with our stock tool. You can find any stock based on your trading
              style and risk tolerance, and we will analyze them for you.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button className={classes.control} variant="white" size="lg" component="a" href="/signup">
              Get started
            </Button>
          </div>
        </div>
      </div>
      <Features description="Our 3 step process for picking stocks is fast, easy, and deliver results." />
    </div>
  );
}
