import { Divider, Group, Space, Stack, Text } from "@mantine/core";
import React, { PropsWithChildren } from "react";
interface Props {
  title: string;
}

const ScrollSection: React.FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  return <Stack spacing={1}><Text size={"sm"}>{title}</Text><Stack spacing="xl">{children}</Stack></Stack>;
};
export default ScrollSection;
