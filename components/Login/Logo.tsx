import { Group, GroupProps, MantineSize } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";

interface Props {
  mb?: MantineSize;
}
export function Logo(props: Props) {
  return (
    <Group position="center" style={{ position: "relative", left: "20px" }} mb={props.mb}>
      <Link href="/">
        <a>
          <Image src="/logo.png" alt="" width={121.33} height={53.166} />
        </a>
      </Link>
    </Group>
  );
}
