import {
    ScrollArea,
    Space,
    Stack,
} from "@mantine/core";
import SimplexSection from "./sections/SimplexSection";
import React from "react";
import HeaderSection from "./sections/HeaderSection";
import TerrainSection from "./sections/TerrainSection";
import GradientSection from "./sections/GradientSection";

function SideSection() {
    return (
        <Stack
            align="start"
            spacing={1}
            sx={{
                margin: "10px",
                position: "absolute",
                top: 0,
                left: "78.3vw",
                width: "16.5vw",
                height: "65vh",
                boxSizing: "border-box",
            }}
        >
            <Space h={1}/>
            <HeaderSection/>
            <ScrollArea style={{height: "60.5vh", width: "100%"}} type={"scroll"}>
                <GradientSection/>
                <Space h={10}/>
                <TerrainSection/>
                <Space h={35}/>
                <SimplexSection/>
            </ScrollArea>
        </Stack>
    );
}

export default SideSection;
