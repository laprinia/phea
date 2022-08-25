import { edgeTable, triangulationTable } from "./table-data";
import { lerp, set3DArray } from "./misc-functions";
import { MarchingResult } from "./types";

export const getMarchedResult = (
  maxArray: number[],
  isoLevel: number,
  sampleSize: number,
  getField: Function
): MarchingResult => {
  let terrainVertices = new Float32Array(
    maxArray[0] * maxArray[1] * maxArray[2] * 8 * 12 * 3
  );
  let edges = [];
  for (let i = 0; i < 12; i++) {
    edges.push(new Float32Array(3));
  }
  let fI, fJ, fK;
  let x, y, z;

  let counterIndex = 0;

  for (let i = -maxArray[0]; i < maxArray[0]; i++) {
    fI = i + maxArray[0];
    x = i * sampleSize;
    for (let j = -maxArray[1] + 1; j < maxArray[1] - 1; j++) {
      fJ = j + maxArray[1];
      y = j * sampleSize;
      for (let k = -maxArray[2]; k < maxArray[2]; k++) {
        fK = k + maxArray[2];
        z = k * sampleSize;
        const v0 = getField(
          [maxArray[0] * 2, maxArray[1] * 2, maxArray[2] * 2],
          fI,
          fJ,
          fK
        );
        const v1 = getField(
          [maxArray[0] * 2, maxArray[1] * 2, maxArray[2] * 2],
          fI + 1,
          fJ,
          fK
        );
        const v2 = getField(
          [maxArray[0] * 2, maxArray[1] * 2, maxArray[2] * 2],
          fI + 1,
          fJ,
          fK + 1
        );
        const v3 = getField(
          [maxArray[0] * 2, maxArray[1] * 2, maxArray[2] * 2],
          fI,
          fJ,
          fK + 1
        );
        const v4 = getField(
          [maxArray[0] * 2, maxArray[1] * 2, maxArray[2] * 2],
          fI,
          fJ + 1,
          fK
        );
        const v5 = getField(
          [maxArray[0] * 2, maxArray[1] * 2, maxArray[2] * 2],
          fI + 1,
          fJ + 1,
          fK
        );
        const v6 = getField(
          [maxArray[0] * 2, maxArray[1] * 2, maxArray[2] * 2],
          fI + 1,
          fJ + 1,
          fK + 1
        );
        const v7 = getField(
          [maxArray[0] * 2, maxArray[1] * 2, maxArray[2] * 2],
          fI,
          fJ + 1,
          fK + 1
        );
        let cubeIndex = getCubeIndex(
          [v0, v1, v2, v3, v4, v5, v6, v7],
          isoLevel
        );
        let edgeIndex = edgeTable[cubeIndex];
        if (edgeIndex == 0) {
          continue;
        }
        let mu = sampleSize / 2;
        if (edgeIndex & 1) {
          mu = (isoLevel - v0) / (v1 - v0);
          set3DArray(edges[0], lerp(x, x + sampleSize, mu), y, z);
        }
        if (edgeIndex & 2) {
          mu = (isoLevel - v1) / (v2 - v1);
          set3DArray(edges[1], x + sampleSize, y, lerp(z, z + sampleSize, mu));
        }
        if (edgeIndex & 4) {
          mu = (isoLevel - v3) / (v2 - v3);
          set3DArray(edges[2], lerp(x, x + sampleSize, mu), y, z + sampleSize);
        }
        if (edgeIndex & 8) {
          mu = (isoLevel - v0) / (v3 - v0);
          set3DArray(edges[3], x, y, lerp(z, z + sampleSize, mu));
        }
        if (edgeIndex & 16) {
          mu = (isoLevel - v4) / (v5 - v4);
          set3DArray(edges[4], lerp(x, x + sampleSize, mu), y + sampleSize, z);
        }
        if (edgeIndex & 32) {
          mu = (isoLevel - v5) / (v6 - v5);
          set3DArray(
            edges[5],
            x + sampleSize,
            y + sampleSize,
            lerp(z, z + sampleSize, mu)
          );
        }
        if (edgeIndex & 64) {
          mu = (isoLevel - v7) / (v6 - v7);
          set3DArray(
            edges[6],
            lerp(x, x + sampleSize, mu),
            y + sampleSize,
            z + sampleSize
          );
        }
        if (edgeIndex & 128) {
          mu = (isoLevel - v4) / (v7 - v4);
          set3DArray(edges[7], x, y + sampleSize, lerp(z, z + sampleSize, mu));
        }
        if (edgeIndex & 256) {
          mu = (isoLevel - v0) / (v4 - v0);
          set3DArray(edges[8], x, lerp(y, y + sampleSize, mu), z);
        }
        if (edgeIndex & 512) {
          mu = (isoLevel - v1) / (v5 - v1);
          set3DArray(edges[9], x + sampleSize, lerp(y, y + sampleSize, mu), z);
        }
        if (edgeIndex & 1024) {
          mu = (isoLevel - v2) / (v6 - v2);
          set3DArray(
            edges[10],
            x + sampleSize,
            lerp(y, y + sampleSize, mu),
            z + sampleSize
          );
        }
        if (edgeIndex & 2048) {
          mu = (isoLevel - v3) / (v7 - v3);
          set3DArray(edges[11], x, lerp(y, y + sampleSize, mu), z + sampleSize);
        }

        const triLen = triangulationTable[cubeIndex];
        for (let i = 0; i < triLen.length; i++) {
          if (triLen[i] === -1) {
            break;
          }
          const e = edges[triLen[i]];
          terrainVertices[counterIndex] = e[0];
          terrainVertices[counterIndex + 1] = e[1];
          terrainVertices[counterIndex + 2] = e[2];
          counterIndex += 3;
        }
      }
    }
  }
  return { terrainVertices, counterIndex };
};
const getCubeIndex = (vArray: number[], isoLevel: number): number => {
  let cubeIndex = 0;

  if (vArray[0] < isoLevel) cubeIndex |= 1;
  if (vArray[1] < isoLevel) cubeIndex |= 2;
  if (vArray[2] < isoLevel) cubeIndex |= 4;
  if (vArray[3] < isoLevel) cubeIndex |= 8;
  if (vArray[4] < isoLevel) cubeIndex |= 16;
  if (vArray[5] < isoLevel) cubeIndex |= 32;
  if (vArray[6] < isoLevel) cubeIndex |= 64;
  if (vArray[7] < isoLevel) cubeIndex |= 128;
  return cubeIndex;
};
