import { edgeTable, triangulationTable } from "./util/table-data";

export class MarchingCubes {
  private xMax: number;
  private yMax: number;
  private zMax: number;
  private sampleSize: number;
  private vertices: Float32Array;
  private edges: Float32Array[];

  constructor(
    xMax: number,
    yMax: number,
    zMax: number,
    sampleSize: number = 1
  ) {
    this.xMax = xMax;
    this.yMax = yMax;
    this.zMax = zMax;
    this.sampleSize = sampleSize;

    this.vertices = new Float32Array(
      this.xMax * this.yMax * this.zMax * 8 * 12 * 3
    );

    this.edges = [];
    for (let i = 0; i < 12; i++) {
      this.edges.push(new Float32Array(3));
    }
  }
  generateMesh(geometry: any, surfaceLevel: number, terrain: any) {
    let fI, fJ, fK;
    let x, y, z;

    let vIdx = 0;

    for (let i = -this.xMax; i < this.xMax; i++) {
      fI = i + this.xMax;
      x = i * this.sampleSize;
      for (let j = -this.yMax + 1; j < this.yMax - 1; j++) {
        fJ = j + this.yMax;
        y = j * this.sampleSize;
        for (let k = -this.zMax; k < this.zMax; k++) {
          fK = k + this.zMax;
          z = k * this.sampleSize;

          const v0 = terrain.getField(fI, fJ, fK);
          const v1 = terrain.getField(fI + 1, fJ, fK);
          const v2 = terrain.getField(fI + 1, fJ, fK + 1);
          const v3 = terrain.getField(fI, fJ, fK + 1);
          const v4 = terrain.getField(fI, fJ + 1, fK);
          const v5 = terrain.getField(fI + 1, fJ + 1, fK);
          const v6 = terrain.getField(fI + 1, fJ + 1, fK + 1);
          const v7 = terrain.getField(fI, fJ + 1, fK + 1);

          let cubeIndex = this.getCubeIndex(
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
          let pointToConnect = this.sampleSize / 2;
          if (edgeIndex & 1) {
            pointToConnect = (surfaceLevel - v0) / (v1 - v0);
            this.setFloatArray(
              this.edges[0],
              this.lerp(x, x + this.sampleSize, pointToConnect),
              y,
              z
            );
          }
          if (edgeIndex & 2) {
            pointToConnect = (surfaceLevel - v1) / (v2 - v1);
            this.setFloatArray(
              this.edges[1],
              x + this.sampleSize,
              y,
              this.lerp(z, z + this.sampleSize, pointToConnect)
            );
          }
          if (edgeIndex & 4) {
            pointToConnect = (surfaceLevel - v3) / (v2 - v3);
            this.setFloatArray(
              this.edges[2],
              this.lerp(x, x + this.sampleSize, pointToConnect),
              y,
              z + this.sampleSize
            );
          }
          if (edgeIndex & 8) {
            pointToConnect = (surfaceLevel - v0) / (v3 - v0);
            this.setFloatArray(
              this.edges[3],
              x,
              y,
              this.lerp(z, z + this.sampleSize, pointToConnect)
            );
          }
          if (edgeIndex & 16) {
            pointToConnect = (surfaceLevel - v4) / (v5 - v4);
            this.setFloatArray(
              this.edges[4],
              this.lerp(x, x + this.sampleSize, pointToConnect),
              y + this.sampleSize,
              z
            );
          }
          if (edgeIndex & 32) {
            pointToConnect = (surfaceLevel - v5) / (v6 - v5);
            this.setFloatArray(
              this.edges[5],
              x + this.sampleSize,
              y + this.sampleSize,
              this.lerp(z, z + this.sampleSize, pointToConnect)
            );
          }
          if (edgeIndex & 64) {
            pointToConnect = (surfaceLevel - v7) / (v6 - v7);
            this.setFloatArray(
              this.edges[6],
              this.lerp(x, x + this.sampleSize, pointToConnect),
              y + this.sampleSize,
              z + this.sampleSize
            );
          }
          if (edgeIndex & 128) {
            pointToConnect = (surfaceLevel - v4) / (v7 - v4);
            this.setFloatArray(
              this.edges[7],
              x,
              y + this.sampleSize,
              this.lerp(z, z + this.sampleSize, pointToConnect)
            );
          }
          if (edgeIndex & 256) {
            pointToConnect = (surfaceLevel - v0) / (v4 - v0);
            this.setFloatArray(
              this.edges[8],
              x,
              this.lerp(y, y + this.sampleSize, pointToConnect),
              z
            );
          }
          if (edgeIndex & 512) {
            pointToConnect = (surfaceLevel - v1) / (v5 - v1);
            this.setFloatArray(
              this.edges[9],
              x + this.sampleSize,
              this.lerp(y, y + this.sampleSize, pointToConnect),
              z
            );
          }
          if (edgeIndex & 1024) {
            pointToConnect = (surfaceLevel - v2) / (v6 - v2);
            this.setFloatArray(
              this.edges[10],
              x + this.sampleSize,
              this.lerp(y, y + this.sampleSize, pointToConnect),
              z + this.sampleSize
            );
          }
          if (edgeIndex & 2048) {
            pointToConnect = (surfaceLevel - v3) / (v7 - v3);
            this.setFloatArray(
              this.edges[11],
              x,
              this.lerp(y, y + this.sampleSize, pointToConnect),
              z + this.sampleSize
            );
          }

          const triLen = triangulationTable[cubeIndex];
          for (let i = 0; i < triLen.length; i++) {
            if (triLen[i] === -1) {
              break;
            }
            const e = this.edges[triLen[i]];
            this.vertices[vIdx] = e[0];
            this.vertices[vIdx + 1] = e[1];
            this.vertices[vIdx + 2] = e[2];
            vIdx += 3;
          }
        }
      }
    }
    //geometry.setAttribute('position', new THREE.BufferAttribute(this.vertices.slice(0, vIdx), 3));
    geometry.computeVertexNormals();

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.normal.needsUpdate = true;
  }
  private getCubeIndex(
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
  private setFloatArray(array: any, a: any, b: any, c: any) {
    array[0] = a;
    array[1] = b;
    array[2] = c;
  }
  private lerp(start: number, end: number, value: number) {
    return (1 - value) * start + value * end;
  }
}
