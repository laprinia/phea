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
import {SimplexValues, TerrainData} from "../../util/types";

interface SideSectionProps {
    terrainData: TerrainData;
    simplexValues: SimplexValues;
    rotationSpeed: number;
    gradient: string[];
    onTerrainChange: (values: Partial<TerrainData>) => void;
    onSimplexChange: (values: Partial<SimplexValues>) => void;
    onRotationSpeedChange: (value: number) => void;
    onGradientChange: (index: number, color: string) => void;
    onRegenerate: () => void;
}

function SideSection({
                         terrainData,
                         simplexValues,
                         rotationSpeed,
                         gradient,
                         onTerrainChange,
                         onSimplexChange,
                         onRotationSpeedChange,
                         onGradientChange,
                         onRegenerate,
                     }: SideSectionProps) {
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
            <HeaderSection onRegenerate={onRegenerate}/>
            <ScrollArea style={{height: "60.5vh", width: "100%"}} type={"scroll"}>
                <GradientSection gradient={gradient} onChange={onGradientChange}/>
                <Space h={10}/>
                <TerrainSection
                    terrainData={terrainData}
                    rotationSpeed={rotationSpeed}
                    onChange={onTerrainChange}
                    onRotationSpeedChange={onRotationSpeedChange}
                />
                <Space h={35}/>
                <SimplexSection values={simplexValues} onChange={onSimplexChange}/>
            </ScrollArea>
        </Stack>
    );
}

export default SideSection;
