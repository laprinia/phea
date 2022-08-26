import { Divider, Group, Space, Stack, Text } from "@mantine/core";
import React, { PropsWithChildren } from "react";
interface Props {
  title: string;
}

const ScrollSection: React.FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  return <Stack spacing="xl">{children}</Stack>;
};
export default ScrollSection;
