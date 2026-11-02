import React, {useEffect, useMemo, useRef} from "react";
import {SimplexValues, TerrainData, TerrainRequest} from "../../util/types";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {drawGradient} from "../../util/misc-functions";
import {GRADIENT_STOPS, ROTATION_SPEED_SCALE} from "../../util/constants";

import heightVertexShader from "../../shaders/heightVertexShader";
import heightFragmentShader from "../../shaders/heightFragmentShader";
import {sRGBEncoding} from "three";

interface GeneratedTerrainProps {
    terrainData: TerrainData;
    simplexValues: SimplexValues;
    seed: number;
    rotationSpeed: number;
    gradient: string[];
}

const GeneratedTerrain: React.FC<GeneratedTerrainProps> = ({
                                                               terrainData,
                                                               simplexValues,
                                                               seed,
                                                               rotationSpeed,
                                                               gradient,
                                                           }) => {
    const terrainRef = useRef<any>();
    const gradientMap = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 4;
        canvas.height = 256;
        const texture = new THREE.CanvasTexture(canvas);
        texture.encoding = sRGBEncoding;
        return texture;
    }, []);

    const uniforms = useMemo(() => {
        return {
            u_gradient: {
                type: "t",
                value: gradientMap,
            },
            u_boundsY: {
                type: "f",
                //yMax - yMin(floorset)
                value: 0,
            },
            u_colorOffset: {
                type: "f",
                //yMax - yMin(floorset)
                //TODO make customizable
                value: 1.2,
            },
            u_time: {
                value: 0.0,
            },
        };
    }, [gradientMap]);

    useEffect(() => {
        drawGradient(gradientMap.image, gradient, GRADIENT_STOPS);
        gradientMap.needsUpdate = true;
    }, [gradient, gradientMap]);

    useEffect(() => {
        const {height, sampleSize} = terrainData;
        const worker = new Worker(
            new URL("../../util/terrain.worker.ts", import.meta.url)
        );
        worker.onmessage = ({data}: MessageEvent<Float32Array>) => {
            const geometry = terrainRef.current.geometry;
            geometry.dispose();
            geometry.deleteAttribute("normal");
            geometry.setAttribute("position", new THREE.BufferAttribute(data, 3));
            geometry.computeVertexNormals();
            geometry.computeBoundingSphere();
            let yMax = Math.floor(height / (2 * sampleSize));
            uniforms.u_boundsY.value = yMax * sampleSize - simplexValues.floorOffset;
            worker.terminate();
        };
        const request: TerrainRequest = {terrainData, simplexValues, seed};
        worker.postMessage(request);
        return () => worker.terminate();
    }, [terrainData, simplexValues, seed, uniforms]);

    useFrame(({clock}, delta) => {
        if (terrainRef.current && terrainRef.current.material) {
            terrainRef.current.material.uniforms.u_time.value =
                clock.getElapsedTime();
            terrainRef.current.rotation.y +=
                delta * rotationSpeed * ROTATION_SPEED_SCALE;
        }
    });

    return (
        <mesh ref={terrainRef}>
            <bufferGeometry attach="geometry"/>
            <shaderMaterial
                vertexShader={heightVertexShader}
                fragmentShader={heightFragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};
export default GeneratedTerrain;
