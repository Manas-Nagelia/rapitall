import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Center,
  MantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconCalendarEvent,
} from "@tabler/icons";
import CountUp from "react-countup";

const useStyles = createStyles((theme) => ({
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface StatsGridIconsProps {
  data: { days: number };
}

export function NextDate({ data }: StatsGridIconsProps) {
  const { classes } = useStyles();
  const mobileMatch = useMediaQuery("(max-width: 565px)");

  return (
    <Paper p="md">
      <SimpleGrid cols={1} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <Paper
          withBorder
          p="lg"
          radius="md"
          mx="md"
          mt="sm"
        >
          <Group position="apart">
            <div>
              <Text
                color="dimmed"
                transform="uppercase"
                weight={700}
                size="xs"
                className={classes.label}
              >
                Days until next autoupdate
              </Text>
              <Text weight={700} size="xl">
                <CountUp
                  start={0}
                  end={data.days}
                  separator=","
                  duration={1.1}
                />
              </Text>
            </div>
            <ThemeIcon
              color="gray"
              variant="light"
              size={38}
              sx={(theme) => ({
                color: theme.colors.blue[theme.fn.primaryShade()],
              })}
              radius="md"
            >
              <IconCalendarEvent size={28} stroke={1.5} />
            </ThemeIcon>
          </Group>
          {data.days > 1 ? <Text color="dimmed" size="sm" mt="md">
            <Text component="span" color="teal" weight={700}>
              <CountUp start={0} end={data.days} duration={1} />
            </Text>{" "}
            more days to go!
          </Text> : data.days == 1 ? <Text color="dimmed" size="sm" mt="md">
            Only <Text component="span" color="teal" weight={700}>
              <CountUp start={0} end={data.days} duration={1} />
            </Text>{" "}
            more day to go!
          </Text> : <Text color="dimmed" size="sm" mt="md">
            Autoupdate is currently in progress! See the database for real time changes.
          </Text>}
          
        </Paper>
      </SimpleGrid>
    </Paper>
  );
}
