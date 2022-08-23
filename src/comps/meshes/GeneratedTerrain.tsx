import React, { useEffect, useState } from "react";
import { TerrainData } from "../../util/terrain-types";
import * as THREE from "three";
import { generateHeight } from "../../util/terrain-functions";
import { generateMesh } from "../../util/marching-functions";
import { ISO_LEVEL } from "../../util/constants";
import SimplexNoise from "simplex-noise";
interface GeneratedTerrainProps {
  terrainData: TerrainData;
}
const GeneratedTerrain: React.FC<GeneratedTerrainProps> = (props) => {
  const { width, height, depth, sampleSize } = props.terrainData;
  const [fieldBuffer, setFieldBuffer] = useState(new Float32Array());

  const setField = (
    arr2: number[],
    i: number,
    j: number,
    k: number,
    amt: number
  ) => {
    fieldBuffer[i * arr2[0] * arr2[1] + k * arr2[2] + j] = amt;
  };
  const getField = (arr2: number[], i: number, j: number, k: number) => {
    return fieldBuffer[i * arr2[0] * arr2[1] + k * arr2[1] + j];
  };
  useEffect(() => {
    let xMax = Math.floor(width / (2 * sampleSize));
    let yMax = Math.floor(height / (2 * sampleSize));
    let zMax = Math.floor(depth / (2 * sampleSize));
    setFieldBuffer(new Float32Array((xMax + 1) * (yMax + 1) * (zMax + 1) * 8));
    let octaves = 4;
    let detailPerOctave = 2;
    let persistencePerOctave = 0.5;
    let noiseScale = 2;
    let noiseWeight = 7;
    let floorOffset = 5;
    let weightMultiplier = 3.6;
    let simplex = new SimplexNoise();

    // let geometry = new THREE.BufferGeometry();
    // let material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    // let mesh = new THREE.Mesh(geometry, material);
    // let marchingCubes = new MarchingCubes(xMax, yMax, zMax, sampleSize);

    const hValues = {
      sampleSize,
      maxArray: [xMax, yMax, zMax],
    };
    const cValues = {
      noiseScale,
      octaves,
      simplex,
      weightMultiplier,
      persistencePerOctave,
      detailPerOctave,
      floorOffset,
      noiseWeight,
    };

    generateHeight(hValues, cValues, setField);
    let vertices = new Float32Array(xMax * yMax * zMax * 8 * 12 * 3);

    let edges = [];
    for (let i = 0; i < 12; i++) {
      edges.push(new Float32Array(3));
    }
    generateMesh(
      vertices,
      edges,
      [xMax, yMax, zMax],
      new THREE.BufferGeometry(),
      ISO_LEVEL,
      1,
      getField
    );
  });
  return <mesh></mesh>;
};
export default GeneratedTerrain;
