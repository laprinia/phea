import { edgeTable, triangulationTable } from "./table-data";
import * as THREE from "three";
import { func } from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

export function generateMesh(
  vertices: Float32Array,
  edges: Float32Array[],
  maxArray: number[],
  geometry: any,
  surfaceLevel: number,
  sampleSize: number,
  getField: Function
) {
  let fI, fJ, fK;
  let x, y, z;

  let vIdx = 0;

  for (let i = -maxArray[0]; i < maxArray[0]; i++) {
    fI = i + maxArray[0];
    x = i * sampleSize;
    for (let j = -maxArray[1] + 1; j < maxArray[1] - 1; j++) {
      fJ = j + maxArray[1];
      y = j * sampleSize;
      for (let k = -maxArray[2]; k < maxArray[2]; k++) {
        fK = k + maxArray[2];
        z = k * sampleSize;

        const v0 = getField([2 * maxArray[0], 2 * maxArray[1]], fI, fJ, fK);
        const v1 = getField([2 * maxArray[0], 2 * maxArray[1]], fI + 1, fJ, fK);
        const v2 = getField(
          [2 * maxArray[0], 2 * maxArray[1]],
          fI + 1,
          fJ,
          fK + 1
        );
        const v3 = getField([2 * maxArray[0], 2 * maxArray[1]], fI, fJ, fK + 1);
        const v4 = getField([2 * maxArray[0], 2 * maxArray[1]], fI, fJ + 1, fK);
        const v5 = getField(
          [2 * maxArray[0], 2 * maxArray[1]],
          fI + 1,
          fJ + 1,
          fK
        );
        const v6 = getField(
          [2 * maxArray[0], 2 * maxArray[1]],
          fI + 1,
          fJ + 1,
          fK + 1
        );
        const v7 = getField(
          [2 * maxArray[0], 2 * maxArray[1]],
          fI,
          fJ + 1,
          fK + 1
        );

        let cubeIndex = getCubeIndex(
          surfaceLevel,
          v0,
          v1,
          v2,
          v3,
          v4,
          v5,
          v6,
          v7
        );
        let edgeIndex = edgeTable[cubeIndex];
        if (edgeIndex == 0) {
          continue;
        }
        let pointToConnect = sampleSize / 2;
        if (edgeIndex & 1) {
          pointToConnect = (surfaceLevel - v0) / (v1 - v0);
          setFloatArray(
            edges[0],
            lerp(x, x + sampleSize, pointToConnect),
            y,
            z
          );
        }
        if (edgeIndex & 2) {
          pointToConnect = (surfaceLevel - v1) / (v2 - v1);
          setFloatArray(
            edges[1],
            x + sampleSize,
            y,
            lerp(z, z + sampleSize, pointToConnect)
          );
        }
        if (edgeIndex & 4) {
          pointToConnect = (surfaceLevel - v3) / (v2 - v3);
          setFloatArray(
            edges[2],
            lerp(x, x + sampleSize, pointToConnect),
            y,
            z + sampleSize
          );
        }
        if (edgeIndex & 8) {
          pointToConnect = (surfaceLevel - v0) / (v3 - v0);
          setFloatArray(
            edges[3],
            x,
            y,
            lerp(z, z + sampleSize, pointToConnect)
          );
        }
        if (edgeIndex & 16) {
          pointToConnect = (surfaceLevel - v4) / (v5 - v4);
          setFloatArray(
            edges[4],
            lerp(x, x + sampleSize, pointToConnect),
            y + sampleSize,
            z
          );
        }
        if (edgeIndex & 32) {
          pointToConnect = (surfaceLevel - v5) / (v6 - v5);
          setFloatArray(
            edges[5],
            x + sampleSize,
            y + sampleSize,
            lerp(z, z + sampleSize, pointToConnect)
          );
        }
        if (edgeIndex & 64) {
          pointToConnect = (surfaceLevel - v7) / (v6 - v7);
          setFloatArray(
            edges[6],
            lerp(x, x + sampleSize, pointToConnect),
            y + sampleSize,
            z + sampleSize
          );
        }
        if (edgeIndex & 128) {
          pointToConnect = (surfaceLevel - v4) / (v7 - v4);
          setFloatArray(
            edges[7],
            x,
            y + sampleSize,
            lerp(z, z + sampleSize, pointToConnect)
          );
        }
        if (edgeIndex & 256) {
          pointToConnect = (surfaceLevel - v0) / (v4 - v0);
          setFloatArray(
            edges[8],
            x,
            lerp(y, y + sampleSize, pointToConnect),
            z
          );
        }
        if (edgeIndex & 512) {
          pointToConnect = (surfaceLevel - v1) / (v5 - v1);
          setFloatArray(
            edges[9],
            x + sampleSize,
            lerp(y, y + sampleSize, pointToConnect),
            z
          );
        }
        if (edgeIndex & 1024) {
          pointToConnect = (surfaceLevel - v2) / (v6 - v2);
          setFloatArray(
            edges[10],
            x + sampleSize,
            lerp(y, y + sampleSize, pointToConnect),
            z + sampleSize
          );
        }
        if (edgeIndex & 2048) {
          pointToConnect = (surfaceLevel - v3) / (v7 - v3);
          setFloatArray(
            edges[11],
            x,
            lerp(y, y + sampleSize, pointToConnect),
            z + sampleSize
          );
        }

        const triLen = triangulationTable[cubeIndex];
        for (let i = 0; i < triLen.length; i++) {
          if (triLen[i] === -1) {
            break;
          }
          const e = edges[triLen[i]];
          vertices[vIdx] = e[0];
          vertices[vIdx + 1] = e[1];
          vertices[vIdx + 2] = e[2];
          vIdx += 3;
        }
      }
    }
  }
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertices.slice(0, vIdx), 3)
  );
  geometry.computeVertexNormals();

  geometry.attributes.position.needsUpdate = true;
  geometry.attributes.normal.needsUpdate = true;
}

function getCubeIndex(
  isoLevel: number,
  v0: number,
  v1: number,
  v2: number,
  v3: number,
  v4: number,
  v5: number,
  v6: number,
  v7: number
) {
  let cubeIndex = 0;

  if (v0 < isoLevel) cubeIndex |= 1;
  if (v1 < isoLevel) cubeIndex |= 2;
  if (v2 < isoLevel) cubeIndex |= 4;
  if (v3 < isoLevel) cubeIndex |= 8;
  if (v4 < isoLevel) cubeIndex |= 16;
  if (v5 < isoLevel) cubeIndex |= 32;
  if (v6 < isoLevel) cubeIndex |= 64;
  if (v7 < isoLevel) cubeIndex |= 128;

  return cubeIndex;
}
function setFloatArray(array: any, a: any, b: any, c: any) {
  array[0] = a;
  array[1] = b;
  array[2] = c;
}
function lerp(start: number, end: number, value: number) {
  return (1 - value) * start + value * end;
}
