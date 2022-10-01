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
import lotus from "../../public/lotus-alt.png";
function NavBar() {
  return (
    <Grid
      justify="space-around"
      sx={{ background: "#171825", width: "100.4vw" }}
    >
      <Grid.Col span={2}>
        <Space h={"xs"} />
        <Group spacing="xs" align="center" position="left">
          <Space w="xs" />
          <Image
            src="https://i.postimg.cc/P5Yz47gr/lotus-alt.png"
            height={30}
            withPlaceholder
          />
          <Text size="xl" weight={900} color="blueGray">
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
          <Button variant="outline" radius="xs" color="blueGray" uppercase>
            Demo
          </Button>
          <Button variant="outline" radius="xs" color="blueGray" uppercase>
            About
          </Button>
          <Badge color="blueGray" size="lg">
            Dev
          </Badge>
          <Space w="xs" />
        </Group>
      </Grid.Col>
    </Grid>
  );
}

export default NavBar;
