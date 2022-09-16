import { Group, MantineSize } from "@mantine/core";
import Image from "next/image";

interface Props {
  mt?: MantineSize | number;
  mb?: MantineSize | number;
}
export function Logo(props: Props) {
  return (
    <Group
      position="center"
      mb={props.mb}
      mt={props.mt}
    >
      <Image
        src="/logo.png"
        alt=""
        width={121.33 / 1.25}
        height={53.166 / 1.25}
        style={{
          opacity: 0.3,
          WebkitFilter: "grayscale(80%)",
          filter: "grayscale(80%)",
        }}
      />
    </Group>
  );
}
