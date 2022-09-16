import {
  Paper,
  ThemeIcon,
  Title,
  Text,
  Center,
  DefaultMantineColor,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { NextPage } from "next";

interface Props {
  icon: any;
  color: DefaultMantineColor;
  title: string;
  desc: string;
  width?: number;
  callToAction?: string;
  link?: string;
  openInNewTab?: boolean;
}
const FeatureTemplate: NextPage<Props> = ({
  icon,
  color,
  title,
  desc,
  callToAction,
  link,
  openInNewTab
}) => {
  const matches = useMediaQuery("(max-width: 900px)");
  const mobileMatch = useMediaQuery("(max-width: 565px)");

  return (
    <Paper p="lg" py={50}>
      {mobileMatch ? (
        <Center>
          <ThemeIcon size={50} color={color} radius="md" mb="sm">
            {icon}
          </ThemeIcon>
        </Center>
      ) : (
        <ThemeIcon size={50} color={color} radius="md" mb="sm">
          {icon}
        </ThemeIcon>
      )}
      <Title order={1} weight="800" align={mobileMatch ? "center" : undefined}>
        {title}
      </Title>
      <Text
        color="dimmed"
        mt="md"
        align={mobileMatch ? "center" : undefined}
        style={{ maxWidth: !matches ? "75%" : undefined }}
      >
        {desc}
      </Text>
      {callToAction && (mobileMatch ? <Center><Button mt="xl" radius="xl" component="a" target={openInNewTab ? "__blank" : undefined} href={link}>{callToAction}</Button></Center> : <Button mt="xl" radius="xl" component="a" target={openInNewTab ? "__blank" : undefined} href={link}>{callToAction}</Button>)}
    </Paper>
  );
};

export default FeatureTemplate;
