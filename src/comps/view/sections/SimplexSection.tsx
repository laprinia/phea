import { Group, Slider, Text } from "@mantine/core";
import ScrollSection from "./ScrollSection";
import React from "react";

function SimplexSection() {
  return (
    <ScrollSection title={"Simplex Noise"}>
      <Group spacing={1}>
        <Text size={"xs"}>octaves</Text>
        <Slider
          defaultValue={6}
          min={2}
          max={8}
          sx={{ width: "97%", boxSizing: "border-box" }}
          size="xs"
          radius="xs"
          showLabelOnHover={true}
          color="blueGray"
          marks={[
            { value: 2, label: "2" },
            { value: 5, label: "5" },
            { value: 8, label: "8" },
          ]}
        />
      </Group>
      <Group spacing={1}>
        <Text size={"xs"}>octave persistence</Text>
        <Slider
          defaultValue={0.5}
          min={0}
          max={1}
          step={0.1}
          sx={{ width: "97%", boxSizing: "border-box" }}
          size="xs"
          radius="xs"
          showLabelOnHover={true}
          color="blueGray"
          marks={[
            { value: 0, label: "0" },
            { value: 0.5, label: "0.5" },
            { value: 1, label: "1" },
          ]}
        />
      </Group>
      <Group spacing={1}>
        <Text size={"xs"}>octave detail</Text>
        <Slider
          defaultValue={2}
          min={1}
          max={5}
          step={0.1}
          sx={{ width: "97%" }}
          size="xs"
          radius="xs"
          showLabelOnHover={true}
          color="blueGray"
          marks={[
            { value: 1, label: "1" },
            { value: 5, label: "5" },
          ]}
        />
      </Group>
      <Group spacing={1}>
        <Text size={"xs"}>noise weight</Text>
        <Slider
          defaultValue={9.1}
          min={6}
          max={14}
          step={0.1}
          sx={{ width: "97%" }}
          size="xs"
          radius="xs"
          showLabelOnHover={true}
          color="blueGray"
          marks={[
            { value: 6, label: "6" },
            { value: 8, label: "8" },
            { value: 10, label: "10" },
              { value: 12, label: "12" },
              { value: 14, label: "14" },
          ]}
        />
      </Group>
      <Group spacing={1}>
        <Text size={"xs"}>weight multiplier</Text>
        <Slider
          defaultValue={1.8}
          min={1}
          max={5}

          step={0.1}
          sx={{ width: "97%" }}
          size="xs"
          radius="xs"
          showLabelOnHover={true}
          color="blueGray"
          marks={[
            { value: 1, label: "1" },
            { value: 3, label: "3" },
            { value: 5, label: "5" },
          ]}
        />
      </Group>
    </ScrollSection>
  );
}
export default SimplexSection;
