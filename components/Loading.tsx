import { Loader, Center } from "@mantine/core";
import { NextPage } from "next";

const Loading: NextPage = () => {
  return (
    <Center>
      <div
        style={{
          margin: 0,
          position: "absolute",
          top: "50%",
          msTransform: "translateY(-50%)",
          transform: "translateY(-50%)",
        }}
      >
        <Loader variant="dots" size="lg" />
      </div>
    </Center>
  );
};

export default Loading;
