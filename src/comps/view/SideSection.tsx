import {
  ActionIcon,
  Divider,
  Grid,
  HoverCard,
  ScrollArea,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { SymbolIcon } from "@radix-ui/react-icons";
import SimplexSection from "../../sections/SimplexSection";
import React from "react";
import HeaderSection from "../../sections/HeaderSection";

function SideSection() {
  return (
    <Stack
      align="start"
      spacing={1}
      sx={{
        position: "absolute",
        top: 0,
        left: "78.3vw",
        width: "19.5vw",
      }}
    >
      <Space h={1} />
      <HeaderSection />
      <ScrollArea style={{ height: "59.5vh", width: "19.1vw" }}>
        <SimplexSection />
      </ScrollArea>
    </Stack>
  );
}
export default SideSection;
