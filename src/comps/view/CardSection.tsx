import React from "react";
import { Card } from "@mantine/core";
import Viewport from "./Viewport";
import SideSection from "./SideSection";

function CardSection() {
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="xs"
      withBorder
      sx={{ position: "relative", width: "98vw", height: "70vh" }}
    >
      <Card.Section withBorder sx={{ width: "78vw", height: "70vh" }}>
        <Viewport />
      </Card.Section>
      <SideSection />
    </Card>
  );
}
export default CardSection;
