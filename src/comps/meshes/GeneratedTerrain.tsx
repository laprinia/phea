import React, { useEffect, useMemo, useRef, useState } from "react";
import { TerrainData } from "../../util/types";
import * as THREE from "three";
import SimplexNoise from "simplex-noise";
import { useFrame } from "@react-three/fiber";
import { setHeightValues } from "../../util/height-functions";
import { getMarchedResult } from "../../util/marching-functions";
import { ISO_LEVEL } from "../../util/constants";

import heightVertexShader from "../../shaders/heightVertexShader";
import heightFragmentShader from "../../shaders/heightFragmentShader";
import { useTexture } from "@react-three/drei";
import grad from "./gradient.png";
import { sRGBEncoding } from "three";
interface GeneratedTerrainProps {
  terrainData: TerrainData;
}
const GeneratedTerrain: React.FC<GeneratedTerrainProps> = (props) => {
  const { width, height, depth, sampleSize } = props.terrainData;
  let fieldBuffer = new Float32Array();
  let rotationSpeed = 0.2;
  const [terrainVertices, setTerrainVertices] = useState(new Float32Array());
  const [vertexIndex, setVertexIndex] = useState(0);
  const [requiresUpdate, setRequiresUpdate] = useState(false);
  const gradientMap = useTexture(grad);
  gradientMap.encoding = sRGBEncoding;
  const setField = (
    arr2: number[],
    i: number,
    j: number,
    k: number,
    amt: number
  ) => {
    fieldBuffer[i * arr2[0] * arr2[2] + k * arr2[2] + j] = amt;
  };
  const getField = (arr2: number[], i: number, j: number, k: number) => {
    return fieldBuffer[i * arr2[0] * arr2[2] + k * arr2[2] + j];
  };

  const uniforms = useMemo(() => {
    //console.log(terrainVertices);
    return {
      u_gradient: {
        type: "t",
        value: gradientMap,
      },
      u_boundsY: {
        type: "f",
        //yMax - yMin(floorset)
        //TODO check for changes on rerender
        value: Math.floor(height / (2 * sampleSize)) - 3.92,
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
    let xMax = Math.floor(width / (2 * sampleSize));
    let yMax = Math.floor(height / (2 * sampleSize));
    let zMax = Math.floor(depth / (2 * sampleSize));
    fieldBuffer = new Float32Array((xMax + 1) * (yMax + 1) * (zMax + 1) * 8);
    let octaves = 6;
    let detailPerOctave = 2;
    let persistencePerOctave = 0.5;
    let noiseScale = 0.94;
    let noiseWeight = 9.19;
    let floorOffset = 3.92;
    let weightMultiplier = 1.89;
    let terracingLevel = 2;
    let simplex = new SimplexNoise();
    setHeightValues(
      [xMax, yMax, zMax],
      sampleSize,
      simplex,
      {
        noiseScale,
        octaves,
        weightMultiplier,
        persistencePerOctave,
        detailPerOctave,
        floorOffset,
        noiseWeight,
        terracingLevel,
      },
      setField
    );
    const { terrainVertices, counterIndex } = getMarchedResult(
      [xMax, yMax, zMax],
      ISO_LEVEL,
      sampleSize,
      getField
    );
    setVertexIndex(counterIndex);
    setTerrainVertices(terrainVertices);
    setRequiresUpdate(true);
  }, []);

  const terrainRef = useRef<any>();

  useFrame(({ clock }) => {
    if (terrainRef.current && terrainRef.current.material) {
      terrainRef.current.material.uniforms.u_time.value =
        clock.getElapsedTime();
      terrainRef.current.rotation.y=clock.getElapsedTime() * rotationSpeed;
      if (requiresUpdate) {
        setRequiresUpdate(false);
        terrainRef.current.geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(terrainVertices.slice(0, vertexIndex), 3)
        );
        terrainRef.current.geometry.computeVertexNormals();

        terrainRef.current.geometry.attributes.position.needsUpdate = true;
        terrainRef.current.geometry.attributes.normal.needsUpdate = true;
      }
    }
  });

  return (
    <mesh ref={terrainRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={terrainVertices}
          count={terrainVertices.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={heightVertexShader}
        fragmentShader={heightFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
export default GeneratedTerrain;
