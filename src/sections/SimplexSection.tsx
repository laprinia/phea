import { Group, Slider, Text } from "@mantine/core";
import ScrollSection from "./ScrollSection";
import React from "react";

function SimplexSection() {
  return (
    <ScrollSection title={"Simplex Noise"}>
      <Group spacing={1}>
        <Text size={"sm"}>octaves</Text>
        <Slider
          defaultValue={2}
          min={2}
          max={8}
          sx={{ width: "99%", boxSizing: "border-box" }}
          size="sm"
          radius="sm"
          showLabelOnHover={true}
          color="pistachio"
          marks={[
            { value: 2, label: "2" },
            { value: 5, label: "5" },
            { value: 8, label: "8" },
          ]}
        />
      </Group>
      <Group spacing={1}>
        <Text size={"sm"}>octave persistence</Text>
        <Slider
          defaultValue={1}
          min={0}
          max={1}
          step={0.1}
          sx={{ width: "99%", boxSizing: "border-box" }}
          size="sm"
          radius="sm"
          showLabelOnHover={true}
          color="pistachio"
          marks={[
            { value: 0, label: "0" },
            { value: 0.5, label: "0.5" },
            { value: 1, label: "1" },
          ]}
        />
      </Group>
      <Group spacing={1}>
        <Text size={"sm"}>octave detail</Text>
        <Slider
          defaultValue={1}
          min={1}
          max={10}
          sx={{ width: "99%" }}
          size="sm"
          radius="sm"
          showLabelOnHover={true}
          color="pistachio"
          marks={[
            { value: 1, label: "1" },
            { value: 5, label: "5" },
            { value: 10, label: "10" },
          ]}
        />
      </Group>
      <Group spacing={1}>
        <Text size={"sm"}>noise weight</Text>
        <Slider
          defaultValue={1}
          min={4}
          max={20}
          sx={{ width: "99%" }}
          size="sm"
          radius="sm"
          showLabelOnHover={true}
          color="pistachio"
          marks={[
            { value: 4, label: "4" },
            { value: 12, label: "12" },
            { value: 20, label: "20" },
          ]}
        />
      </Group>
      <Group spacing={1}>
        <Text size={"sm"}>weight multiplier</Text>
        <Slider
          defaultValue={1}
          min={1}
          max={10}
          sx={{ width: "99%" }}
          size="sm"
          radius="sm"
          showLabelOnHover={true}
          color="pistachio"
          marks={[
            { value: 1, label: "1" },
            { value: 5, label: "5" },
            { value: 10, label: "10" },
          ]}
        />
      </Group>
    </ScrollSection>
  );
}
export default SimplexSection;
