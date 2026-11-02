import {ColorInput, Grid} from "@mantine/core";
import ScrollSection from "./ScrollSection";
import React from "react";

const HEX_COLOR = /^#([0-9a-f]{3}){1,2}$/i;

interface GradientSectionProps {
    gradient: string[];
    onChange: (index: number, color: string) => void;
}

function GradientSection({gradient, onChange}: GradientSectionProps) {
    return (
        <ScrollSection title={"Gradient"} spaceBetween={5}>
            <Grid gutter="xs">
                {gradient.map((color, index) => (
                    <Grid.Col span={6} key={index}>
                        <ColorInput
                            defaultValue={color}
                            size={"xs"}
                            onChange={(value) => {
                                //the input also reports half typed colors
                                if (HEX_COLOR.test(value)) onChange(index, value);
                            }}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </ScrollSection>
    );
}

export default GradientSection;
