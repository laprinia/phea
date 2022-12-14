import {Group, Slider, Text} from "@mantine/core";
import ScrollSection from "./ScrollSection";
import React from "react";

function TerrainSection() {
    return (
        <ScrollSection title={"Terrain"} spaceBetween={1}>
            <Group spacing={1}>
                <Text size={"xs"}>size</Text>
                <Slider
                    defaultValue={100}
                    min={100}
                    max={600}
                    sx={{width: "97%", boxSizing: "border-box"}}
                    size="xs"
                    radius="xs"
                    showLabelOnHover={true}
                    color="blueGray"
                    marks={[
                        {value: 100, label: "10"},
                        {value: 300, label: "30"},
                        {value: 600, label: "60"},
                    ]}
                />
            </Group>
            <Group spacing={1}>
                <Text size={"xs"}>sample size</Text>
                <Slider
                    defaultValue={1}
                    min={1}
                    max={5}
                    step={0.1}
                    sx={{width: "97%", boxSizing: "border-box"}}
                    size="xs"
                    radius="xs"
                    showLabelOnHover={true}
                    color="blueGray"
                    marks={[
                        {value: 1, label: "1"},
                        {value: 2.5, label: "2.5"},
                        {value: 5, label: "5"},
                    ]}
                />
            </Group>
            <Group spacing={1}>
                <Text size={"xs"}>rotation speed</Text>
                <Slider
                    defaultValue={3}
                    min={1}
                    max={10}
                    step={0.1}
                    sx={{width: "97%"}}
                    size="xs"
                    radius="xs"
                    showLabelOnHover={true}
                    color="blueGray"
                    marks={[
                        {value: 1, label: "1"},
                        {value: 5, label: "5"},
                        {value: 10, label: "10"},
                    ]}
                />
            </Group>
        </ScrollSection>
    );
}

export default TerrainSection;
