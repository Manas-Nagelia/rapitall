import { Text, MantineTheme, createStyles, Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { NextPage } from "next";
import { Logo } from "./Logo";

const useStyles = createStyles((theme: MantineTheme) => ({
  tagline: {
    letterSpacing: "2px",
  },
  border: {
    maxWidth: "40em",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  secondBorder: {
    maxWidth: "20em",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
}));
const N3: NextPage = () => {
  const { classes } = useStyles();
  const tabletMatch = useMediaQuery("(max-width: 900px)");
  const mobileMatch = useMediaQuery("(max-width: 565px)");

  return (
    <>
      <Divider my="lg" mt={!mobileMatch ? 5 : -5} className={classes.border} />
      <Text
        align="center"
        mt="sm"
        size="xs"
        transform="uppercase"
        weight="bolder"
        color="gray"
        className={classes.tagline}
      >
        Join highly productive teams including N3
      </Text>
      <Logo mt={18} />
      <Divider my="xl" mt="md" className={classes.secondBorder} />
    </>
  );
};

export default N3;
