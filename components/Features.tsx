import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  MantineProvider,
  Center,
  Paper,
  Button,
  Group,
} from "@mantine/core";
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
  TablerIcon,
  IconThumbUp,
  IconDeviceAnalytics,
  IconChartLine,
  IconChartPie,
} from "@tabler/icons";

export const MOCKDATA = [
  {
    icon: IconThumbUp,
    title: "Find Stocks",
    description:
      "Select your risk tolerance and trading style, and then we will recommend stocks for you.",
  },
  {
    icon: IconChartPie,
    title: "Analyze",
    description:
      "Easily analyze the stocks with our price targets and chart patterns. No need to waste hours analyzing stocks yourself.",
  },
  {
    icon: IconChartLine,
    title: "Monitor",
    description:
      "Monitor your current holdings with our automated technical analysis, so you know when to exit a position.",
  },
];

interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <Center>
        <ThemeIcon variant="light" size={50} radius={40}>
          <Icon size={25} stroke={1.5} />
        </ThemeIcon>
      </Center>
      <Text
        style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}
        align="center"
        size="lg"
      >
        {title}
      </Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }} align="center">
        {description}
      </Text>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 40,
      textAlign: "center",
    },
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      textAlign: "center",
    },
  },
}));

interface FeaturesGridProps {
  description: React.ReactNode;
  data?: FeatureProps[];
}

export function Features({ description, data = MOCKDATA }: FeaturesGridProps) {
  const { classes, theme } = useStyles();
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title} mt={-20} size={50}>
        Find, Analyze, Monitor
      </Title>

      <Container size={560} p={0}>
        <Text size={15} className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "xl" },
          { maxWidth: 755, cols: 1, spacing: "xl" },
        ]}
      >
        {features}
      </SimpleGrid>
      <Center>
        <Button
          mt={75}
          size="lg"
          variant="gradient"
          gradient={{ from: "cyan", to: "teal" }}
          component="a"
          href="/auth"
        >
          Do more with Bull Investments
        </Button>
      </Center>
    </Container>
  );
}
