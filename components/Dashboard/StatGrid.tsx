import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons";
import CountUp from "react-countup";

const useStyles = createStyles((theme) => ({

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface StatsGridIconsProps {
  data: { title: string; value: string; diff: number }[];
}

export function StatGrid({ data }: StatsGridIconsProps) {
  const reverse = ["Errors", "Time (in hours)", "Records Skipped"];
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Text weight={700} size="xl">
              <CountUp
                start={0}
                end={parseInt(stat.value.replaceAll(",", ""))}
                separator=","
                duration={1.1}
              />
            </Text>
          </div>
          {!reverse.includes(stat.title) ? (
            <ThemeIcon
              color="gray"
              variant="light"
              sx={(theme) => ({
                color:
                  stat.diff > 0 ? theme.colors.teal[theme.fn.primaryShade()] : theme.colors.red[theme.fn.primaryShade()],
              })}
              size={38}
              radius="md"
            >
              <DiffIcon size={28} stroke={1.5} />
            </ThemeIcon>
          ) : (
            <ThemeIcon
              color="gray"
              variant="light"
              sx={(theme) => ({
                color:
                  stat.diff > 0 ? theme.colors.red[theme.fn.primaryShade()] : theme.colors.teal[theme.fn.primaryShade()],
              })}
              size={38}
              radius="md"
            >
              <DiffIcon size={28} stroke={1.5} />
            </ThemeIcon>
          )}
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={!reverse.includes(stat.title) ? (stat.diff > 0 ? "teal" : "red") : (stat.diff > 0 ? "red" : "teal")}
            weight={700}
          >
            <CountUp start={0} end={stat.diff} duration={1} />%
          </Text>{" "}
          {stat.diff > 0 ? "increase" : "decrease"} compared to last week
        </Text>
      </Paper>
    );
  });

  return (
    <Paper p="md">
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </Paper>
  );
}
