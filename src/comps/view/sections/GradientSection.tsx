import {ColorInput, Grid} from "@mantine/core";
import ScrollSection from "./ScrollSection";
import React from "react";

function GradientSection() {
    return (
        <ScrollSection title={"Gradient"} spaceBetween={5}>
            <Grid gutter="xs">
                <Grid.Col span={6}><ColorInput defaultValue="#F4490F" size={"xs"}/></Grid.Col>
                <Grid.Col span={6}><ColorInput defaultValue="#9FAFBC" size={"xs"}/></Grid.Col>
                <Grid.Col span={6}><ColorInput defaultValue="#2D5871" size={"xs"}/></Grid.Col>
                <Grid.Col span={6}><ColorInput defaultValue="#255B46" size={"xs"}/></Grid.Col>
                <Grid.Col span={6}><ColorInput defaultValue="#0D130F" size={"xs"}/></Grid.Col>
                <Grid.Col span={6}><ColorInput defaultValue="#0F1C17" size={"xs"}/></Grid.Col>
                <Grid.Col span={6}><ColorInput defaultValue="#0A0A0A" size={"xs"}/></Grid.Col>
            </Grid>
        </ScrollSection>
    );
}

export default GradientSection;
