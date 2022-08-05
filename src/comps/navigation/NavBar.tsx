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

function NavBar() {
  return (
    <Grid
      justify="space-around"
      sx={{ background: "#362B2B", width: "100.4vw" }}
    >
      <Grid.Col span={2}>
        <Space h={"xs"} />
        <Group spacing="xs" align="center" position="left">
          <Space w="xs" />
          <Image
            src="https://images.emojiterra.com/twitter/v14.0/512px/1fab7.png"
            height={30}
          />
          <Text size="xl" weight={900} color="champagnePink">
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
            variant="outline"
            radius="xs"
            color="portlandOrange"
            uppercase
          >
            Demo
          </Button>
          <Button
            variant="outline"
            radius="xs"
            color="portlandOrange"
            uppercase
          >
            About
          </Button>
          <Badge color="portlandOrange" size="lg">
            Dev
          </Badge>
          <Space w="xs" />
        </Group>
      </Grid.Col>
    </Grid>
  );
}

export default NavBar;
