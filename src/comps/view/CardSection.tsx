import React from "react";
import { Card, Text, Stack, Space, Divider, ScrollArea } from "@mantine/core";
import Viewport from "./Viewport";

function CardSection() {
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      sx={{ position: "relative", width: "98vw", height: "70vh" }}
    >
      <Card.Section withBorder sx={{ width: "78vw", height: "70vh" }}>
        <Viewport />
      </Card.Section>
      <Divider
        sx={{
          position: "absolute",
          top: 0,
          left: "78.2vw",
          width: "17vw",
        }}
        orientation="vertical"
      />
      <Stack
        align="start"
        sx={{
          position: "absolute",
          top: 0,
          left: "79vw",
          width: "17.7vw",
        }}
      >
        <Space h={1} />
        <Text weight={500}>Adjustments</Text>
        <ScrollArea style={{ height: "61.5vh" }}>
          <Text>Sample</Text>
        </ScrollArea>
      </Stack>
    </Card>
  );
}
export default CardSection;
