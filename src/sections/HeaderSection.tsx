import {
  ActionIcon,
  Divider,
  Grid,
  Group,
  HoverCard,
  Space,
  Text,
} from "@mantine/core";
import { SymbolIcon } from "@radix-ui/react-icons";
import React from "react";

function HeaderSection() {
  return (

    <Group
      spacing={6}
      sx={{
        paddingTop: "2px",
        paddingRight: "15px",
        position: "sticky",
        width: "18.1vw",
        zIndex: 1,
        justifyContent:"space-between"
      }}
    >
        <Text size="md" weight={500}>
          All Properties
        </Text>
      <HoverCard width={100} shadow="md">
        <HoverCard.Target>
          <ActionIcon variant="subtle" color="blueGray" size="xl">
            <SymbolIcon />
          </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm" align="center">
            Regenerate terrain
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
export default HeaderSection;
