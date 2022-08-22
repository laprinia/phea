import * as THREE from "three";
import SimplexNoise from "./src/util/simplex";
import MarchingCubes from "./src/MarchingCubes";

const ISO_LEVEL = 0;
export class Terrain {
  private xMax: number;
  private yMax: number;
  private zMax: number;
  private xMax2: number;
  private yMax2: number;
  private zMax2: number;
  private sampleSize: number;
  private fieldBuffer: Float32Array;
  private octaves: number;
  private detailPerOctave: number;
  private persistencePerOctave: number;
  private noiseScale: number;
  private noiseWeight: number;
  private floorOffset: number;
  private weightMultiplier: number;
  private simplex: any;
  private geometry: THREE.BufferGeometry;
  private material: THREE.MeshStandardMaterial;
  private mesh: THREE.Mesh;
  private marchingCubes: MarchingCubes;

  constructor(
    width: number,
    height: number,
    depth: number,
    sampleSize: number
  ) {
    this.xMax = Math.floor(width / (2 * sampleSize));
    this.yMax = Math.floor(height / (2 * sampleSize));
    this.zMax = Math.floor(depth / (2 * sampleSize));
    this.sampleSize = sampleSize;

    this.xMax2 = 2 * this.xMax;
    this.yMax2 = 2 * this.yMax;
    this.zMax2 = 2 * this.zMax;
    this.fieldBuffer = new Float32Array(
      (this.xMax + 1) * (this.yMax + 1) * (this.zMax + 1) * 8
    );
    this.octaves = 4;
    this.detailPerOctave = 2;
    this.persistencePerOctave = 0.5;
    this.noiseScale = 2;
    this.noiseWeight = 7;
    this.floorOffset = 5;
    this.weightMultiplier = 3.6;
    this.simplex = new SimplexNoise();

    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.marchingCubes = new MarchingCubes(
      this.xMax,
      this.yMax,
      this.zMax,
      sampleSize
    );

    this.generateHeight();
    this.marchingCubes.generateMesh(this.geometry, ISO_LEVEL, this);
  }
  generateHeight() {
    for (let i = -this.xMax; i < this.xMax + 1; i++) {
      let x = i * this.sampleSize;
      for (let j = -this.yMax; j < this.yMax + 1; j++) {
        let y = j * this.sampleSize;
        for (let k = -this.zMax; k < this.zMax + 1; k++) {
          let z = k * this.sampleSize;
          this.setField(
            i + this.xMax,
            j + this.yMax,
            k + this.zMax,
            this.computeHeightValue(x, y, z)
          );
        }
      }
    }
  }
  setField(i: number, j: number, k: number, amt: number) {
    this.fieldBuffer[i * this.xMax2 * this.zMax2 + k * this.zMax2 + j] = amt;
  }

  computeHeightValue(x: number, y: number, z: number) {
    let offsetNoise = 1;
    let noise = 0;

    let frequency = this.noiseScale / 100;
    let amplitude = 1;
    let weight = 1;
    for (var j = 0; j < this.octaves; j++) {
      let n = this.simplex.noise3D(
        (x + offsetNoise) * frequency,
        (y + offsetNoise) * frequency,
        (z + offsetNoise) * frequency
      );
      let v = 1 - Math.abs(n);
      v = v * v * weight;
      weight = Math.max(Math.min(v * this.weightMultiplier, 1), 0);
      noise += v * amplitude;
      amplitude *= this.persistencePerOctave;
      frequency *= this.detailPerOctave;
    }

    let finalVal = -(y + this.floorOffset) + noise * this.noiseWeight;

    return -finalVal;
  }
}
