import React, { useEffect, useRef, useState } from "react";
import { TerrainData } from "../../util/types";
import * as THREE from "three";
import SimplexNoise from "simplex-noise";
import { useFrame } from "@react-three/fiber";
import { setHeightValues } from "../../util/height-functions";
import { getMarchedResult } from "../../util/marching-functions";
import { ISO_LEVEL } from "../../util/constants";

interface GeneratedTerrainProps {
  terrainData: TerrainData;
}
const GeneratedTerrain: React.FC<GeneratedTerrainProps> = (props) => {
  const { width, height, depth, sampleSize } = props.terrainData;
  let fieldBuffer = new Float32Array();
  const [terrainVertices, setTerrainVertices] = useState(new Float32Array());
  const [vertexIndex, setVertexIndex] = useState(0);
  const [requiresUpdate, setRequiresUpdate] = useState(false);
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

  const terrainRef = useRef<THREE.Mesh>();

  useFrame(() => {
    if (terrainRef.current && requiresUpdate) {
      setRequiresUpdate(false);
      terrainRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(terrainVertices.slice(0, vertexIndex), 3)
      );
      terrainRef.current.geometry.computeVertexNormals();

      terrainRef.current.geometry.attributes.position.needsUpdate = true;
      terrainRef.current.geometry.attributes.normal.needsUpdate = true;
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
      <meshPhongMaterial
        attach="material"
        color="#ede0bb"
        flatShading={true}
        shininess={66}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
export default GeneratedTerrain;
