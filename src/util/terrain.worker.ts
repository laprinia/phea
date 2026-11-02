import SimplexNoise from "simplex-noise";
import { ISO_LEVEL } from "./constants";
import { setHeightValues } from "./height-functions";
import { getMarchedResult } from "./marching-functions";
import { TerrainRequest } from "./types";

onmessage = ({ data }: MessageEvent<TerrainRequest>) => {
  const { terrainData, simplexValues, seed } = data;
  const { width, height, depth, sampleSize } = terrainData;
  let xMax = Math.floor(width / (2 * sampleSize));
  let yMax = Math.floor(height / (2 * sampleSize));
  let zMax = Math.floor(depth / (2 * sampleSize));
  let fieldBuffer = new Float32Array(
    (xMax * 2 + 1) * (yMax * 2 + 1) * (zMax * 2 + 1)
  );
  const getFieldIndex = (arr2: number[], i: number, j: number, k: number) => {
    return (i * (arr2[2] + 1) + k) * (arr2[1] + 1) + j;
  };
  const setField = (
    arr2: number[],
    i: number,
    j: number,
    k: number,
    amt: number
  ) => {
    fieldBuffer[getFieldIndex(arr2, i, j, k)] = amt;
  };
  const getField = (arr2: number[], i: number, j: number, k: number) => {
    return fieldBuffer[getFieldIndex(arr2, i, j, k)];
  };
  let simplex = new SimplexNoise(seed);
  setHeightValues(
    [xMax, yMax, zMax],
    sampleSize,
    simplex,
    simplexValues,
    setField
  );
  const { terrainVertices, counterIndex } = getMarchedResult(
    [xMax, yMax, zMax],
    ISO_LEVEL,
    sampleSize,
    getField
  );
  const vertices = terrainVertices.slice(0, counterIndex);
  postMessage(vertices, { transfer: [vertices.buffer] });
};

export {};
