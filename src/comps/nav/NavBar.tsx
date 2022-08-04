import React from "react";
import {
  Image,
  Text,
  Grid,
  Badge,
  Group,
  Space,
  Button,
  Divider,
} from "@mantine/core";
import { ThreeDCubeSphere, InfoCircle } from "tabler-icons-react";

function NavBar() {
  return (
    <Grid align="start" justify="space-around" sx={{ background: "#27282c" }}>
      <Grid.Col span={2}>
        <Space h={"xs"} />
        <Group spacing="xs" align="center" position="left">
          <Space w="xs" />
          <Image
            src="https://images.emojiterra.com/twitter/v14.0/512px/1fab7.png"
            height={30}
          />
          <Text size="md" weight={700}>
            phea
          </Text>
          <Divider
            sx={{ height: "24px", alignSelf: "center" }}
            orientation="vertical"
          />
        </Group>
      </Grid.Col>
      <Grid.Col span={10}>
        <Space h={"xs"} />
        <Group position="right" align="center">
          <Divider
            sx={{ height: "24px", alignSelf: "center" }}
            orientation="vertical"
          />
          <Button
            variant="subtle"
            color="green"
            leftIcon={<ThreeDCubeSphere />}
          >
            Demo
          </Button>
          <Button variant="subtle" color="green" leftIcon={<InfoCircle />}>
            About
          </Button>
          <Badge color="green" size="lg">
            Dev
          </Badge>
          <Space w="xs" />
        </Group>
      </Grid.Col>
    </Grid>
  );
}

export default NavBar;
