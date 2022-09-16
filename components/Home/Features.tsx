import { Group, Container, createStyles, MantineTheme, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconDeviceAnalytics, IconBallBasketball, IconAlertCircle, IconChartDots3 } from "@tabler/icons";
import { NextPage } from "next";
import FeatureTemplate from "./FeatureTemplate";
import Dashboard from "./Dashboard.svg";
import API from "./API.svg";
import Bugs from "./Bugs.svg";
import Key from "./Key.svg";
import Image from "next/image";

const useStyles = createStyles((theme: MantineTheme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 5,
    paddingBottom: theme.spacing.xl * 4,
    marginTop: theme.spacing.xl * -5,
    [theme.fn.smallerThan("xs")]: {
      paddingBottom: theme.spacing.md,
    }
  },
  content: {
    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  img: {
    position: "relative",
    top: "11vh",
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

const Features: NextPage = () => {
  const { classes } = useStyles();
  const desktopMatch = !useMediaQuery("(max-width: 1085px)");
  const tabletMatch = useMediaQuery("(max-width: 900px)");
  const mobileMatch = useMediaQuery("(max-width: 565px)");
  const theme = useMantineTheme();

  return (
    <>
      <div className={classes.inner}>
        <div className={classes.content}>
          <FeatureTemplate
            icon={<IconBallBasketball size={40} />}
            title="NBA API"
            color="orange"
            callToAction="Explore our NBA API"
            link="https://n3.notaku.site/"
            openInNewTab={true}
            desc="Use our NBA API built with ease and simplicity in mind to retrieve the latest and most up-to-date NBA gamelog data. Then, convert the data either to a JSON, CSV, or a Pandas DataFrame to utilize the data in your application.
        "
          />
        </div>
        {!tabletMatch && (
          <div className={classes.img} style={{ width: "79em", top: "0vh"}}>
            <Image src={API} alt="An illustration of a NBA player and game log data being pulled in by an API" />
          </div>
        )}
      </div>
      <div className={classes.inner}>
        <div className={classes.content}>
          <FeatureTemplate
            icon={<IconDeviceAnalytics size={38} />}
            title="Dashboard"
            callToAction="Go to your dashboard"
            link="/login"
            color="violet"
            desc="Use our dashboard to be in control of the data. Do everything from change auto-update settings, pin-point errors, and to receive key analytics on your data. 
        "
          />
        </div>
        {!tabletMatch && (
          <div className={classes.img} style={{ left: "2em"}}>
            <Image src={Dashboard} alt="An illustration of a dashboard" />
          </div>
        )}
      </div>
      <div className={classes.inner}>
        <div className={classes.content}>
          <FeatureTemplate
            icon={<IconAlertCircle size={40} />}
            title="Error Reporting"
            callToAction="See current issues and errors"
            link="/login"
            color="red"
            desc="Use the dashboard to quickly view the status and errors of the current autoupdate. Then, track and pin-point when and where errors will occur using our analytics.
        "
          />
        </div>
        {!tabletMatch && (
          <div className={classes.img} style={{ top: "6vh"}}>
            <Image src={Bugs} alt="An illustration of an engineer fixing b" />
          </div>
        )}
      </div>
      <div className={classes.inner}>
        <div className={classes.content}>
          <FeatureTemplate
            icon={<IconChartDots3 size={35} />}
            title="Key Insights"
            callToAction="See key insights about your data"
            link="/login"
            color="green"
            desc="Retrieve key insights about your data, so you can protect and understand your data. Spot new insights and inefficiencies with your data using our key insights tool. 
        "
          />
        </div>
        {!tabletMatch && (
          <div className={classes.img} style={{ top: "7vh", right: "5%"}}>
            <Image src={Key} alt="An illustration of a data analytics" />
          </div>
        )}
      </div>
    </>
  );
};

export default Features;
