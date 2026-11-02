import React, {useState} from "react";
import {Card} from "@mantine/core";
import Viewport from "./Viewport";
import SideSection from "./SideSection";
import {
    DEFAULT_GRADIENT,
    DEFAULT_ROTATION_SPEED,
    DEFAULT_SIMPLEX,
    DEFAULT_TERRAIN,
} from "../../util/constants";

function CardSection() {
    const [gradient, setGradient] = useState(DEFAULT_GRADIENT);
    const [terrainData, setTerrainData] = useState(DEFAULT_TERRAIN);
    const [simplexValues, setSimplexValues] = useState(DEFAULT_SIMPLEX);
    const [rotationSpeed, setRotationSpeed] = useState(DEFAULT_ROTATION_SPEED);
    const [seed, setSeed] = useState(Math.random);

    return (
        <Card
            shadow="sm"
            p="lg"
            radius="xs"
            withBorder
            sx={{background: "#292935", width: "98vw", height: "70vh"}}
        >
            <Card.Section withBorder sx={{width: "78vw", height: "70vh"}}>
                <Viewport
                    terrainData={terrainData}
                    simplexValues={simplexValues}
                    seed={seed}
                    rotationSpeed={rotationSpeed}
                    gradient={gradient}
                />
            </Card.Section>
            <SideSection
                terrainData={terrainData}
                simplexValues={simplexValues}
                rotationSpeed={rotationSpeed}
                gradient={gradient}
                onTerrainChange={(values) =>
                    setTerrainData((current) => ({...current, ...values}))
                }
                onSimplexChange={(values) =>
                    setSimplexValues((current) => ({...current, ...values}))
                }
                onRotationSpeedChange={setRotationSpeed}
                onGradientChange={(index, color) =>
                    setGradient((current) =>
                        current.map((value, i) => (i === index ? color : value))
                    )
                }
                onRegenerate={() => setSeed(Math.random())}
            />
        </Card>
    );
}

export default CardSection;
